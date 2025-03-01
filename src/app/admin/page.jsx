"use client";
import { useEffect, useState } from "react";
import { database } from "@/app/firebase";
import { ref, onValue, update, remove, push } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const Home = () => {
  // Data states
  const [artist, setArtist] = useState([]);
  const [contemporary, setContemporary] = useState([]);
  const [generalArts, setGeneralArts] = useState([]);
  const [nigerDelta, setNigerDelta] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  // UI states
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({});
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("success"); // "success" or "error"
  const [darkMode, setDarkMode] = useState(false);

  // Auth states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const auth = getAuth();

  // Alert function
  const showAlert = (message, type = "success") => {
    setAlertMessage(message);
    setAlertType(type);
    setIsAlertOpen(true);
    setTimeout(() => {
      setIsAlertOpen(false);
      setAlertMessage(null);
    }, 3000);
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoginModalOpen(false);
        loadData();
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  // Load data from Realtime Database
  const loadData = () => {
    setLoading(true);

    // Artists
    const artistRef = ref(database, "artist");
    onValue(artistRef, (snapshot) => {
      const data = snapshot.val();
      const artistList = data ? Object.keys(data).map((key) => ({ ...data[key], id: key })) : [];
      setArtist(artistList);
    });

    // Contemporary
    const contemporaryRef = ref(database, "contemporary");
    onValue(contemporaryRef, (snapshot) => {
      const data = snapshot.val();
      const contemporaryList = data ? Object.keys(data).map((key) => ({ ...data[key], id: key })) : [];
      setContemporary(contemporaryList);
      setLoading(false);
    });

    // General Arts
    const generalArtsRef = ref(database, "generalarts");
    onValue(generalArtsRef, (snapshot) => {
      const data = snapshot.val();
      const generalArtsList = data ? Object.keys(data).map((key) => ({ ...data[key], id: key })) : [];
      setGeneralArts(generalArtsList);
    });

    // Niger Delta
    const nigerDeltaRef = ref(database, "nigerdelta");
    onValue(nigerDeltaRef, (snapshot) => {
      const data = snapshot.val();
      const nigerDeltaList = data ? Object.keys(data).map((key) => ({ ...data[key], id: key })) : [];
      setNigerDelta(nigerDeltaList);
    });

    // Testimonials
    const testimonialsRef = ref(database, "testimonials");
    onValue(testimonialsRef, (snapshot) => {
      const data = snapshot.val();
      const testimonialsList = data ? Object.keys(data).map((key) => ({ ...data[key], id: key })) : [];
      setTestimonials(testimonialsList);
    });
  };

  // Modal control functions
  const openModal = (data) => {
    setSelectedData({ ...data, id: data.id || data.key });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewItem({});
  };

  // Data manipulation functions
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedData = { ...selectedData };
    // Example: updating the "artist" collection. Adjust path for other categories.
    const dataRef = ref(database, `artist/${selectedData.id}`);
    update(dataRef, updatedData)
      .then(() => {
        showAlert("Data updated successfully!");
        closeModal();
      })
      .catch((error) => {
        showAlert("Failed to update data: " + error.message, "error");
      });
  };

  const handleDelete = (id, category) => {
    const dataRef = ref(database, `${category}/${id}`);
    remove(dataRef)
      .then(() => {
        showAlert("Data deleted successfully!");
      })
      .catch((error) => {
        showAlert("Failed to delete data: " + error.message, "error");
      });
  };

  const handleAdd = (e, category) => {
    e.preventDefault();
    const newItemRef = ref(database, category);
    push(newItemRef, newItem)
      .then(() => {
        showAlert("Data added successfully!");
        closeAddModal();
      })
      .catch((error) => {
        showAlert("Failed to add data: " + error.message, "error");
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        showAlert("Login successful!");
        setIsLoginModalOpen(false);
      })
      .catch((error) => {
        showAlert("Login failed: " + error.message, "error");
      });
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    // Add the dark class based on state
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="p-6 bg-gray-800 text-white min-h-screen">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="bg-yellow-500 text-black p-2 rounded"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </header>

        {/* Alert */}
        {isAlertOpen && (
          <div className="fixed top-4 right-4 z-50">
            <div
              className={`p-4 rounded shadow-lg ${
                alertType === "success" ? "bg-green-500" : "bg-red-500"
              } text-white`}
            >
              {alertMessage}
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <h2 className="text-xl">Loading...</h2>
          </div>
        ) : (
          <>
            {/* Artist List */}
            <section className="mb-8 pt-10">
              <h1 className="text-3xl font-bold mb-4">Artist List</h1>
              <button
                onClick={openAddModal}
                className="bg-green-500 text-white p-2 rounded mb-4"
              >
                Add New Artist
              </button>
              <ul className="space-y-2">
                {(artist || []).map((user, index) => (
                  <li
                    key={index}
                    className="bg-gray-700 p-4 rounded shadow-md flex justify-between items-center"
                  >
                    <span>{user.name}</span>
                    <div>
                      <button
                        onClick={() => openModal(user)}
                        className="bg-blue-500 text-white p-2 rounded ml-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id, "artist")}
                        className="bg-red-500 text-white p-2 rounded ml-2"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Contemporary Artists */}
            <section className="mb-8">
              <h1 className="text-3xl font-bold mb-4">Contemporary Artists</h1>
              <button
                onClick={openAddModal}
                className="bg-green-500 text-white p-2 rounded mb-4"
              >
                Add New Contemporary Artist
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(contemporary || []).map((cont, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 p-4 rounded shadow-md flex flex-col"
                  >
                    <h2 className="text-xl font-semibold">{cont.name}</h2>
                    <img
                      src={cont.image}
                      alt={cont.name}
                      className="w-full h-48 object-cover rounded mb-2"
                    />
                    <p>{cont.bio || "Biography not available."}</p>
                    <p>{cont.description}</p>
                    <h3 className="font-bold mt-2">Portfolio</h3>
                    <ul className="flex flex-wrap">
                      {(cont.portfolio ? Object.values(cont.portfolio) : []).map(
                        (portfolioItem, portfolioIndex) => (
                          <li key={portfolioIndex} className="mr-2">
                            <img
                              src={portfolioItem}
                              alt={`Portfolio item ${portfolioIndex + 1}`}
                              className="w-32 h-32 rounded"
                            />
                          </li>
                        )
                      )}
                    </ul>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => openModal(cont)}
                        className="bg-blue-500 text-white p-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cont.id, "contemporary")}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* General Arts */}
            <section className="mb-8">
              <h1 className="text-3xl font-bold mb-4">General Arts</h1>
              <button
                onClick={openAddModal}
                className="bg-green-500 text-white p-2 rounded mb-4"
              >
                Add New General Art
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(generalArts || []).map((art, index) => (
                  <div
                    key={index}
                    className={`bg-gray-700 p-4 rounded shadow-md ${art.background || ""}`}
                  >
                    <h2 className="text-xl font-semibold">{art.title}</h2>
                    <ul className="space-y-2">
                      {(art.items ? Object.values(art.items) : []).map(
                        (item, itemIndex) => (
                          <li key={itemIndex}>
                            <h3 className="font-semibold">{item.title}</h3>
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-48 object-cover rounded mb-2"
                            />
                            <p>{item.description || "No description available."}</p>
                          </li>
                        )
                      )}
                    </ul>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => openModal(art)}
                        className="bg-blue-500 text-white p-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(art.id, "generalarts")}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Niger Delta Arts */}
            <section className="mb-8">
              <h1 className="text-3xl font-bold mb-4">Niger Delta Arts</h1>
              <button
                onClick={openAddModal}
                className="bg-green-500 text-white p-2 rounded mb-4"
              >
                Add New Niger Delta Art
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(nigerDelta || []).map((item, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded shadow-md">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p>{item.bio}</p>
                    <h3 className="font-bold mt-2">Artworks</h3>
                    <ul className="space-y-2">
                      {(item.artworks ? Object.values(item.artworks) : []).map(
                        (artwork, artworkIndex) => (
                          <li key={artworkIndex}>
                            <img
                              src={artwork.image}
                              alt={`Artwork ${artworkIndex + 1}`}
                              className="w-full h-48 object-cover rounded mb-2"
                            />
                            <p>{artwork.description || "No description available."}</p>
                          </li>
                        )
                      )}
                    </ul>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => openModal(item)}
                        className="bg-blue-500 text-white p-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, "nigerdelta")}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonials */}
            <section className="mb-8">
              <h1 className="text-3xl font-bold mb-4">Testimonials</h1>
              <button
                onClick={openAddModal}
                className="bg-green-500 text-white p-2 rounded mb-4"
              >
                Add New Testimonial
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(testimonials || []).map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 p-4 rounded shadow-md flex flex-col items-center"
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mb-2"
                    />
                    <h2 className="font-bold">{testimonial.name}</h2>
                    <p className="italic">{testimonial.role}</p>
                    <p className="mt-2 text-center">"{testimonial.quote}"</p>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => openModal(testimonial)}
                        className="bg-blue-500 text-white p-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial.id, "testimonials")}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Edit Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-gray-800 p-6 rounded shadow-lg max-w-md w-full">
                  <h2 className="text-2xl font-bold mb-4">Edit Data</h2>
                  <form onSubmit={handleUpdate}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        value={selectedData?.name || ""}
                        onChange={(e) =>
                          setSelectedData({ ...selectedData, name: e.target.value })
                        }
                        className="w-full p-2 rounded bg-gray-700"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Bio</label>
                      <textarea
                        value={selectedData?.bio || ""}
                        onChange={(e) =>
                          setSelectedData({ ...selectedData, bio: e.target.value })
                        }
                        className="w-full p-2 rounded bg-gray-700"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Image URL</label>
                      <input
                        type="text"
                        value={selectedData?.image || ""}
                        onChange={(e) =>
                          setSelectedData({ ...selectedData, image: e.target.value })
                        }
                        className="w-full p-2 rounded bg-gray-700"
                      />
                    </div>
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Add Modal */}
            {isAddModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-gray-800 p-6 rounded shadow-lg max-w-md w-full">
                  <h2 className="text-2xl font-bold mb-4">Add New Item</h2>
                  <form onSubmit={(e) => handleAdd(e, "artist")}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        value={newItem.name || ""}
                        onChange={(e) =>
                          setNewItem({ ...newItem, name: e.target.value })
                        }
                        className="w-full p-2 rounded bg-gray-700"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Bio</label>
                      <textarea
                        value={newItem.bio || ""}
                        onChange={(e) =>
                          setNewItem({ ...newItem, bio: e.target.value })
                        }
                        className="w-full p-2 rounded bg-gray-700"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Image URL</label>
                      <input
                        type="text"
                        value={newItem.image || ""}
                        onChange={(e) =>
                          setNewItem({ ...newItem, image: e.target.value })
                        }
                        className="w-full p-2 rounded bg-gray-700"
                      />
                    </div>
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={closeAddModal}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Login Modal */}
            {isLoginModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-gray-800 p-6 rounded shadow-lg max-w-md w-full">
                  <h2 className="text-2xl font-bold mb-4">Login</h2>
                  <form onSubmit={handleLogin}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700"
                        required
                      />
                    </div>
                    <div className="flex justify-end">
                      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
