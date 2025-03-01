"use client";
import { useEffect, useState } from "react";
import { database } from "@/app/firebase";
import { ref, onValue, push, update, remove } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {    
    const [data, setData] = useState({}); // 
    const [loading, setLoading] = useState(true); // Loading state
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const [selectedItem, setSelectedItem] = useState(null); // Selected item for editing
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(true); // Login modal state
    const [email, setEmail] = useState(""); // Email for login
    const [password, setPassword] = useState(""); // Password for login
    const [user, setUser] = useState(null); // Authenticated user
    const [activeCategory, setActiveCategory] = useState("testimonials"); // Active sidebar category

  const auth = getAuth();

  // Fetch data from Firebase
  const fetchData = () => {
    const categories = [
      "testimonials",
      "artist",
      "nigerdelta",
      "generalarts",
      "contemporary",
      "sculptures",
      "africanartists",
      "digitalarts",
    ];

    const dataRefs = categories.map((category) => ref(database, category));

    dataRefs.forEach((ref, index) => {
      onValue(ref, (snapshot) => {
        const categoryData = snapshot.val();
        setData((prev) => ({
          ...prev,
          [categories[index]]: categoryData
            ? Object.keys(categoryData).map((key) => ({
                id: key,
                ...categoryData[key],
              }))
            : [],
        }));
      });
    });
    setLoading(false);
  };

   // Handle login
   const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setIsLoginModalOpen(false);
      fetchData(); // Fetch data after successful login
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Login failed: " + error.message);
    }
  };

  // Handle save (add/edit)
  const handleSave = async (e, category) => {
    e.preventDefault();
    const itemData = { ...selectedItem };
    delete itemData.id; // Remove ID for Firebase push/update

    try {
      if (selectedItem.id) {
        // Update existing item
        const itemRef = ref(database, `${category}/${selectedItem.id}`);
        await update(itemRef, itemData);
        toast.success("Item updated successfully!");
      } else {
        // Add new item
        const itemsRef = ref(database, category);
        await push(itemsRef, itemData);
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
        const itemRef = ref(database, `${category}/${id}`);
        await remove(itemRef);
        toast.success("Item deleted successfully!");
      } catch (error) {
        toast.error("Error deleting data: " + error.message);
      }
    }
  };

  // Open modal for adding/editing
  const openModal = (item = null, category) => {
    setSelectedItem(item || { name: "", description: "", image: "" });
    setIsModalOpen(category);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Render login modal
  if (isLoginModalOpen) {
    return (
      <div className="p-24 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-500 text-black p-2 rounded w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    );
  }

  // Render main dashboard
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
            <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 dark:bg-black text-white p-10">
        <h2 className="text-xl font-bold mb-6">Azaiki Art Gallery Dashboard</h2>
        <ul>
          {Object.keys(data).map((category) => (
            <li
              key={category}
              className={`mb-2 p-2 rounded cursor-pointer ${
                activeCategory === category ? "bg-blue-500" : "hover:bg-gray-700"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 dark:bg-gray-800 bg-white p-10">

        {/* Active Category Section */}
        <section className="mb-8">
          <h2 className="text-4xl text-black dark:text-white font-bold mb-4 capitalize">{activeCategory}</h2>
          <button
            onClick={() => openModal(null, activeCategory)}
            className="bg-green-500 text-white p-2 rounded mb-4"
          >
            Add New {activeCategory}
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data[activeCategory]?.map((item) => (
              <div key={item.id} className="bg-white  p-4 rounded shadow-md">
                <h3 className="text-xl text-black font-semibold">{item.name || item.title}</h3>
                <p>{item.description || item.bio}</p>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name || item.title}
                    className="w-full h-48 object-cover rounded mt-2"
                  />
                )}
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => openModal(item, activeCategory)}
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, activeCategory)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Add/Edit Modal */}
        {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-96">
      <h2 className="text-2xl font-bold mb-4">
        {selectedItem.id ? "Edit Item" : "Add Item"}
      </h2>
      <form onSubmit={(e) => handleSave(e, isModalOpen)}>
        {/* Testimonials */}
        {isModalOpen === "testimonials" && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={selectedItem.name || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, name: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Role</label>
              <input
                type="text"
                value={selectedItem.role || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, role: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Quote</label>
              <textarea
                value={selectedItem.quote || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, quote: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <input
                type="text"
                value={selectedItem.image || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, image: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>
          </>
        )}

        {/* Artist */}
        {isModalOpen === "artist" && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={selectedItem.name || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, name: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea
                value={selectedItem.bio || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, bio: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Profile Image URL</label>
              <input
                type="text"
                value={selectedItem.profileImage || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, profileImage: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Cover Image URL</label>
              <input
                type="text"
                value={selectedItem.coverimage || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, coverimage: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Occupation</label>
              <input
                type="text"
                value={selectedItem.occupation || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, occupation: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>
          </>
        )}

        {/* Niger Delta */}
        {isModalOpen === "nigerdelta" && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={selectedItem.name || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, name: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea
                value={selectedItem.bio || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, bio: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Artwork Title</label>
              <input
                type="text"
                value={selectedItem.title || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, title: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Artwork Description</label>
              <textarea
                value={selectedItem.description || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, description: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Artwork Image URL</label>
              <input
                type="text"
                value={selectedItem.image || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, image: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>
          </>
        )}

        {/* General Arts */}
        {isModalOpen === "generalarts" && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={selectedItem.title || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, title: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={selectedItem.description || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, description: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <input
                type="text"
                value={selectedItem.image || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, image: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>
          </>
        )}

        {/* Contemporary */}
        {isModalOpen === "contemporary" && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={selectedItem.name || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, name: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={selectedItem.description || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, description: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <input
                type="text"
                value={selectedItem.image || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, image: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>
          </>
        )}

        {/* Sculptures */}
        {isModalOpen === "sculptures" && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={selectedItem.title || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, title: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={selectedItem.description || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, description: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <input
                type="text"
                value={selectedItem.image || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, image: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>
          </>
        )}

        {/* African Artists */}
        {isModalOpen === "africanartists" && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={selectedItem.name || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, name: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={selectedItem.description || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, description: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <input
                type="text"
                value={selectedItem.image || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, image: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>
          </>
        )}

        {/* Digital Arts */}
        {isModalOpen === "digitalarts" && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={selectedItem.name || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, name: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea
                value={selectedItem.bio || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, bio: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <input
                type="text"
                value={selectedItem.image || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, image: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Portfolio (Comma Separated URLs)</label>
              <textarea
                value={selectedItem.portfolio ? Object.values(selectedItem.portfolio).join(", ") : ""}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    portfolio: e.target.value.split(", ").reduce((acc, url, index) => {
                      acc[`portfolio_${index + 1}`] = url;
                      return acc;
                    }, {}),
                  })
                }
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>
          </>
        )}

        {/* Save and Cancel Buttons */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-500 text-white p-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-yellow-500 text-black p-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default AdminDashboard;