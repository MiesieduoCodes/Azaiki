"use client";
import { useEffect, useState } from "react";
import { database } from "@/app/firebase";
import { ref, onValue, push, update, remove } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CATEGORIES = [
  "testimonials",
  "artists",
  "nigerdelta",
  "generalarts",
  "contemporary",
  "sculptures",
  "africanartists",
  "digitalarts",
];

const AdminDashboard = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  const auth = getAuth();

  // Fetch data from Firebase
  useEffect(() => {
    if (!user) return;

    const unsubscribeFunctions = CATEGORIES.map((category) => {
      const categoryRef = ref(database, category);
      return onValue(
        categoryRef,
        (snapshot) => {
          const rawData = snapshot.val();
          console.log(`Fetched data for ${category}:`, rawData); // Debug log
          const formattedData = rawData
            ? Object.keys(rawData).map((key) => ({
                id: key,
                ...rawData[key],
              }))
            : [];
          
          setData((prev) => ({
            ...prev,
            [category]: formattedData,
          }));
        },
        (error) => {
          toast.error(`Error loading ${category}: ${error.message}`);
        }
      );
    });

    setLoading(false);
    return () => unsubscribeFunctions.forEach((unsub) => unsub());
  }, [user]);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      setUser(userCredential.user);
      setIsLoginModalOpen(false);
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Login failed: " + error.message);
    }
  };

  // Handle save
  const handleSave = async (e, category) => {
    e.preventDefault();
    const itemData = { ...selectedItem };
    delete itemData.id;

    try {
      if (selectedItem.id) {
        await update(ref(database, `${category}/${selectedItem.id}`), itemData);
        toast.success("Item updated successfully!");
      } else {
        await push(ref(database, category), itemData);
        toast.success("Item added successfully!");
      }
      setIsModalOpen(false);
      setSelectedItem(null);
    } catch (error) {
      toast.error("Error saving data: " + error.message);
    }
  };

  // Handle delete
  const handleDelete = async (id, category) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await remove(ref(database, `${category}/${id}`));
        toast.success("Item deleted successfully!");
      } catch (error) {
        toast.error("Error deleting data: " + error.message);
      }
    }
  };

  // Login modal
  if (isLoginModalOpen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg w-96">
          <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`w-full text-left p-3 rounded mb-2 ${
                activeCategory === category ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold capitalize">{activeCategory}</h1>
          <button
            onClick={() => {
              setSelectedItem({});
              setIsModalOpen(true);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add New
          </button>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data[activeCategory]?.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name || item.title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2">
                  {item.name || item.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {item.description || item.bio}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setIsModalOpen(true);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, activeCategory)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-6">
              {selectedItem.id ? "Edit Item" : "Create Item"}
            </h2>
            <form onSubmit={(e) => handleSave(e, activeCategory)}>
              <div className="mb-4">
                <label className="block mb-2">Title/Name</label>
                <input
                  type="text"
                  value={selectedItem.name || selectedItem.title || ""}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      [activeCategory === "testimonials" ? "name" : "title"]: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea
                  value={selectedItem.description || selectedItem.bio || ""}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      [activeCategory === "testimonials" ? "quote" : "description"]: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  rows="4"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Image URL</label>
                <input
                  type="text"
                  value={selectedItem.image || ""}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, image: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;