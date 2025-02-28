"use client";
import { useEffect, useState } from "react";
import { database } from "@/app/firebase";
import { ref, onValue, update, remove, push } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const [artist, setArtist] = useState([]);
  const [contemporary, setContemporary] = useState([]);
  const [generalArts, setGeneralArts] = useState([]);
  const [nigerDelta, setNigerDelta] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState('success'); // 'success' or 'error'
  const [theme, setTheme] = useState('dark'); // 'light' or 'dark'

  const auth = getAuth();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const showAlert = (message, type = 'success') => {
    setAlertMessage(message);
    setAlertType(type);
    setIsAlertOpen(true);
    setTimeout(() => {
      setIsAlertOpen(false);
      setAlertMessage(null);
    }, 3000); // Hide the alert after 3 seconds
  };

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

  const loadData = () => {
    setLoading(true);
    const artistRef = ref(database, "artist");
    onValue(artistRef, (snapshot) => {
      const data = snapshot.val();
      const artistList = data
        ? Object.keys(data).map((key) => ({ ...data[key], id: key })) // Include `id`
        : []; // Fallback to empty array if data is null/undefined
      setArtist(artistList);
    });

    const contemporaryRef = ref(database, "contemporary");
    onValue(contemporaryRef, (snapshot) => {
      const data = snapshot.val();
      const contemporaryList = data
        ? Object.keys(data).map((key) => ({ ...data[key], id: key })) // Include `id`
        : []; // Fallback to empty array if data is null/undefined
      setContemporary(contemporaryList);
      setLoading(false);
    });

    const generalArtsRef = ref(database, "generalarts");
    onValue(generalArtsRef, (snapshot) => {
      const data = snapshot.val();
      const generalArtsList = data
        ? Object.keys(data).map((key) => ({ ...data[key], id: key })) // Include `id`
        : []; // Fallback to empty array if data is null/undefined
      setGeneralArts(generalArtsList);
    });

    const nigerDeltaRef = ref(database, "nigerdelta");
    onValue(nigerDeltaRef, (snapshot) => {
      const data = snapshot.val();
      const nigerDeltaList = data
        ? Object.keys(data).map((key) => ({ ...data[key], id: key })) // Include `id`
        : []; // Fallback to empty array if data is null/undefined
      setNigerDelta(nigerDeltaList);
    });

    const testimonialsRef = ref(database, "testimonials");
    onValue(testimonialsRef, (snapshot) => {
      const data = snapshot.val();
      const testimonialsList = data
        ? Object.keys(data).map((key) => ({ ...data[key], id: key })) // Include `id`
        : []; // Fallback to empty array if data is null/undefined
      setTestimonials(testimonialsList);
    });
  };

  const openModal = (data) => {
    setSelectedData({ ...data, id: data.id || data.key }); // Ensure `id` is set correctly
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

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedData = {
      ...selectedData,
    };
    const dataRef = ref(database, `artist/${selectedData.id}`); // Adjust the path based on the category
    update(dataRef, updatedData)
      .then(() => {
        showAlert('Data updated successfully!');
        closeModal();
      })
      .catch((error) => {
        showAlert('Failed to update data: ' + error.message, 'error');
      });
  };

  const handleDelete = (id, category) => {
    const dataRef = ref(database, `${category}/${id}`); // Ensure the path is correct
    remove(dataRef)
      .then(() => {
        showAlert('Data deleted successfully!');
      })
      .catch((error) => {
        showAlert('Failed to delete data: ' + error.message, 'error');
      });
  };

  const handleAdd = (e, category) => {
    e.preventDefault();
    const newItemRef = ref(database, category);
    push(newItemRef, newItem)
      .then(() => {
        showAlert('Data added successfully!');
        closeAddModal();
      })
      .catch((error) => {
        showAlert('Failed to add data: ' + error.message, 'error');
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        showAlert('Login successful!');
        setIsLoginModalOpen(false);
      })
      .catch((error) => {
        showAlert('Login failed: ' + error.message, 'error');
      });
  };

  return (
    <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 rounded-full bg-yellow-500 text-black"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      {/* Alert Component */}
      {isAlertOpen && (
        <div className="fixed top-4 right-16 z-50">
          <div className={`p-4 rounded shadow-lg ${alertType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
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
          <section className="mb-8 pt-[40px]">
            <h1 className="text-3xl font-bold mb-4">Artist List</h1>
            <button onClick={openAddModal} className="bg-green-500 text-white p-2 rounded mb-4">
              Add New Artist
            </button>
            <ul className="space-y-2">
              {(artist || []).map((user, index) => (
                <li key={index} className={`p-4 rounded shadow-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  {user.name}
                  <button
                    onClick={() => openModal(user)}
                    className="mt-4 bg-blue-500 text-white p-2 rounded ml-[4px]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id, "artist")}
                    className="mt-2 bg-red-500 text-white p-2 rounded ml-[4px]"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Contemporary Artists</h1>
            <button onClick={openAddModal} className="bg-green-500 text-white p-2 rounded mb-4">
              Add New Contemporary Artist
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(contemporary || []).map((cont, index) => (
                <div key={index} className={`p-4 rounded shadow-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h2 className="text-xl font-semibold">{cont.name}</h2>
                  <img src={cont.image} alt={cont.name} className="w-full h-48 object-cover rounded mb-2" />
                  <p>{cont.bio || "Biography not available."}</p>
                  <p>{cont.description}</p>
                  <h3 className="font-bold mt-2">Portfolio</h3>
                  <ul className="flex flex-wrap">
                    {(cont.portfolio || []).map((portfolioItem, portfolioIndex) => (
                      <li key={portfolioIndex} className="mr-2">
                        <img src={portfolioItem} alt={`Portfolio item ${portfolioIndex + 1}`} className="w-32 h-32 rounded" />
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => openModal(cont)}
                    className="mt-4 bg-blue-500 text-white p-2 rounded ml-[4px]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cont.id, "contemporary")}
                    className="mt-2 bg-red-500 text-white p-2 rounded ml-[4px]"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h1 className="text-3xl font-bold mb-4">General Arts</h1>
            <button onClick={openAddModal} className="bg-green-500 text-white p-2 rounded mb-4">
              Add New General Art
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(generalArts || []).map((art, index) => (
                <div key={index} className={`p-4 rounded shadow-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h2 className="text-xl font-semibold">{art.title}</h2>
                  <ul className="space-y-2">
                    {(art.items || []).map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <h3 className="font-semibold">{item.title}</h3>
                        <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded mb-2" />
                        <p>{item.description || "No description available."}</p>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => openModal(art)}
                    className="mt-4 bg-blue-500 text-white p-2 rounded ml-[4px]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(art.id, "generalarts")}
                    className="mt-2 bg-red-500 text-white p-2 rounded ml-[4px]"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Niger Delta Arts</h1>
            <button onClick={openAddModal} className="bg-green-500 text-white p-2 rounded mb-4">
              Add New Niger Delta Art
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(nigerDelta || []).map((artist, index) => (
                <div key={index} className={`p-4 rounded shadow-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h2 className="text-xl font-semibold">{artist.name}</h2>
                  <p>{artist.bio}</p>
                  <h3 className="font-bold mt-2">Artworks</h3>
                  <ul className="space-y-2">
                    {(artist.artworks || []).map((artwork, artworkIndex) => (
                      <li key={artworkIndex}>
                        <img src={artwork.image} alt={`Artwork ${artworkIndex + 1}`} className="w-full h-48 object-cover rounded mb-2" />
                        <p>{artwork.description || "No description available."}</p>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => openModal(artist)}
                    className="mt-4 bg-blue-500 text-white p-2 rounded ml-[4px]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(artist.id, "nigerdelta")}
                    className="mt-2 bg-red-500 text-white p-2 rounded ml-[4px]"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h1 className="text-3xl font-bold mb-4">Testimonials</h1>
            <button onClick={openAddModal} className="bg-green-500 text-white p-2 rounded mb-4">
              Add New Testimonial
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(testimonials || []).map((testimonial, index) => (
                <div key={index} className={`p-4 rounded shadow-md flex flex-col items-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mb-2" />
                  <h2 className="font-bold">{testimonial.name}</h2>
                  <p className="italic">{testimonial.role}</p>
                  <p className="mt-2 text-center">"{testimonial.quote}"</p>
                  <button
                    onClick={() => openModal(testimonial)}
                    className="mt-4 bg-blue-500 text-white p-2 rounded ml-[4px]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id, "testimonials")}
                    className="mt-2 bg-red-500 text-white p-2 rounded ml-[4px]"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </section>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className={`p-6 rounded shadow-lg max-w-md w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-2xl font-bold mb-4">Edit Data</h2>
                <form onSubmit={handleUpdate}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={selectedData?.name || ""}
                      onChange={(e) => setSelectedData({ ...selectedData, name: e.target.value })}
                      className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    <textarea
                      value={selectedData?.bio || ""}
                      onChange={(e) => setSelectedData({ ...selectedData, bio: e.target.value })}
                      className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Image URL</label>
                    <input
                      type="text"
                      value={selectedData?.image || ""}
                      onChange={(e) => setSelectedData({ ...selectedData, image: e.target.value })}
                      className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
                    />
                  </div>
                  <div className="flex justify-between">
                    <button type="button" onClick={closeModal} className="bg-red-500 text-white p-2 rounded ml-[4px]">
                      Cancel
                    </button>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded ml-[4px]">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {isAddModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className={`p-6 rounded shadow-lg max-w-md w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-2xl font-bold mb-4">Add New Item</h2>
                <form onSubmit={(e) => handleAdd(e, "artist")}> {/* Adjust the category as necessary */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={newItem.name || ""}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    <textarea
                      value={newItem.bio || ""}
                      onChange={(e) => setNewItem({ ...newItem, bio: e.target.value })}
                      className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Image URL</label>
                    <input
                      type="text"
                      value={newItem.image || ""}
                      onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                      className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
                    />
                  </div>
                  <div className="flex justify-between">
                    <button type="button" onClick={closeAddModal} className="bg-red-500 text-white p-2 rounded ml-[4px]">
                      Cancel
                    </button>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded ml-[4px]">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {isLoginModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className={`p-6 rounded shadow-lg max-w-md w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded ml-[4px]">
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
  );
};

export default Home;