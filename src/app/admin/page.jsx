// "use client";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Toaster, toast } from "react-hot-toast";
// import { Card, CardContent } from "@/app/components/ui/card";
// import { Button } from "@/app/components/ui/button";
// import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/app/components/ui/table";
// import { db } from "@/app/firebase";
// import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";

// const images = [
//   "/images/IMG-20250207-WA0025.jpg",
//   "/images/IMG-20250207-WA0024.jpg",
//   "/images/IMG-20250207-WA0022.jpg",
// ];

// const ADMIN_PASSWORD = "AzaikiARTGallery";

// export default function AdminDashboard() {
//   const [artists, setArtists] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [password, setPassword] = useState("");
//   const [editingArtist, setEditingArtist] = useState(null);
//   const [showArtistForm, setShowArtistForm] = useState(false);
//   const [editingCategory, setEditingCategory] = useState(null);
//   const [showCategoryForm, setShowCategoryForm] = useState(false);

//   // Firestore collections
//   const artistsCollection = collection(db, "artists");
//   const categoriesCollection = collection(db, "categories");

//   useEffect(() => {
//     if (localStorage.getItem("admin_authenticated") === "true") {
//       setIsAuthenticated(true);
//     }

//     const unsubscribeArtists = onSnapshot(artistsCollection, (snapshot) => {
//       setArtists(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//     });

//     const unsubscribeCategories = onSnapshot(categoriesCollection, (snapshot) => {
//       setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//     });

//     return () => {
//       unsubscribeArtists();
//       unsubscribeCategories();
//     };
//   }, []);

//   const handleLogin = () => {
//     if (password === ADMIN_PASSWORD) {
//       toast.success("Login successful! Redirecting...", { duration: 3000 });
//       setIsAuthenticated(true);
//       localStorage.setItem("admin_authenticated", "true");
//     } else {
//       toast.error("Incorrect password. Try again!", { duration: 3000 });
//     }
//   };

//   const handleLogout = () => {
//     toast.success("Logged out successfully!");
//     setIsAuthenticated(false);
//     localStorage.removeItem("admin_authenticated");
//   };

//   const handleArtistSubmit = async (artistData) => {
//     try {
//       if (editingArtist) {
//         await updateDoc(doc(artistsCollection, editingArtist.id), artistData);
//         toast.success("Artist updated successfully");
//       } else {
//         await addDoc(artistsCollection, artistData);
//         toast.success("Artist added successfully");
//       }
//       setShowArtistForm(false);
//       setEditingArtist(null);
//     } catch (error) {
//       toast.error("Error saving artist");
//     }
//   };

//   const handleDeleteArtist = async (id) => {
//     try {
//       await deleteDoc(doc(artistsCollection, id));
//       toast.success("Artist deleted successfully");
//     } catch (error) {
//       toast.error("Error deleting artist");
//     }
//   };

//   const handleCategorySubmit = async (categoryData) => {
//     try {
//       if (editingCategory) {
//         await updateDoc(doc(categoriesCollection, editingCategory.id), categoryData);
//         toast.success("Category updated successfully");
//       } else {
//         await addDoc(categoriesCollection, categoryData);
//         toast.success("Category added successfully");
//       }
//       setShowCategoryForm(false);
//       setEditingCategory(null);
//     } catch (error) {
//       toast.error("Error saving category");
//     }
//   };

//   const handleDeleteCategory = async (id) => {
//     try {
//       await deleteDoc(doc(categoriesCollection, id));
//       toast.success("Category deleted successfully");
//     } catch (error) {
//       toast.error("Error deleting category");
//     }
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="relative flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
//         <Toaster position="top-right" reverseOrder={false} />
//         <div className="absolute inset-0 overflow-hidden">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentIndex}
//               className="absolute inset-0 bg-cover bg-center"
//               style={{ backgroundImage: `url(${images[currentIndex]})` }}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 2 }}
//             ></motion.div>
//           </AnimatePresence>
//         </div>
//         <div className="relative bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 w-96 backdrop-blur-md bg-opacity-90">
//           <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter Password"
//             className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <Button
//             onClick={handleLogin}
//             className="w-full bg-blue-500 text-white py-2 rounded shadow-md hover:bg-blue-600 transition"
//           >
//             Login
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-100 pt-10 dark:bg-gray-900">
//       <Toaster position="top-right" reverseOrder={false} />

//       <aside className="w-64 bg-white dark:bg-gray-800 p-4 shadow-lg">
//         <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
//         <nav>
//           <ul>
//             <li className="mb-2">
//               <Button onClick={() => setShowArtistForm(true)} variant="ghost">
//                 Add Artist
//               </Button>
//             </li>
//             <li className="mb-2">
//               <Button onClick={() => setShowCategoryForm(true)} variant="ghost">
//                 Manage Categories
//               </Button>
//             </li>
//             <li className="mb-2">
//               <Button variant="ghost">Testimonials</Button>
//             </li>
//             <li className="mb-2">
//               <Button variant="ghost">Navigation</Button>
//             </li>
//           </ul>
//         </nav>
//         <Button
//           onClick={handleLogout}
//           className="bg-red-500 text-white px-4 py-2 rounded mt-4"
//         >
//           Logout
//         </Button>
//       </aside>

//       <main className="flex-1 p-6">
//         {/* Artists Table */}
//         <h1 className="text-2xl font-bold mb-6">Manage Artists</h1>
//         <Card>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Occupation</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {artists.map((artist) => (
//                   <TableRow key={artist.id}>
//                     <TableCell>{artist.name}</TableCell>
//                     <TableCell>{artist.occupation}</TableCell>
//                     <TableCell>
//                       <Button
//                         variant="outline"
//                         className="mr-2"
//                         onClick={() => {
//                           setEditingArtist(artist);
//                           setShowArtistForm(true);
//                         }}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         variant="destructive"
//                         onClick={() => handleDeleteArtist(artist.id)}
//                       >
//                         Delete
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>

//         {/* Categories Table */}
//         <h1 className="text-2xl font-bold my-6">Manage Categories</h1>
//         <Card>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Title</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {categories.map((category) => (
//                   <TableRow key={category.id}>
//                     <TableCell>{category.title}</TableCell>
//                     <TableCell>
//                       <Button
//                         variant="outline"
//                         className="mr-2"
//                         onClick={() => {
//                           setEditingCategory(category);
//                           setShowCategoryForm(true);
//                         }}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         variant="destructive"
//                         onClick={() => handleDeleteCategory(category.id)}
//                       >
//                         Delete
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>

//         {/* Artist Form Modal */}
//         {showArtistForm && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded-lg w-96">
//               <h2 className="text-xl font-bold mb-4">
//                 {editingArtist ? "Edit Artist" : "Add Artist"}
//               </h2>
//               <ArtistForm
//                 initialData={editingArtist || {}}
//                 onSubmit={handleArtistSubmit}
//                 onCancel={() => {
//                   setShowArtistForm(false);
//                   setEditingArtist(null);
//                 }}
//               />
//             </div>
//           </div>
//         )}

//         {/* Category Form Modal */}
//         {showCategoryForm && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded-lg w-96">
//               <h2 className="text-xl font-bold mb-4">
//                 {editingCategory ? "Edit Category" : "Add Category"}
//               </h2>
//               <CategoryForm
//                 initialData={editingCategory || {}}
//                 onSubmit={handleCategorySubmit}
//                 onCancel={() => {
//                   setShowCategoryForm(false);
//                   setEditingCategory(null);
//                 }}
//               />
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// // Artist Form Component
// function ArtistForm({ initialData, onSubmit, onCancel }) {
//   const [formData, setFormData] = useState(initialData);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="space-y-4">
//         <input
//           placeholder="Name"
//           value={formData.name || ""}
//           onChange={(e) => setFormData({...formData, name: e.target.value})}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           placeholder="Occupation"
//           value={formData.occupation || ""}
//           onChange={(e) => setFormData({...formData, occupation: e.target.value})}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <textarea
//           placeholder="Bio"
//           value={formData.bio || ""}
//           onChange={(e) => setFormData({...formData, bio: e.target.value})}
//           className="w-full p-2 border rounded"
//           rows="4"
//         />
//         <div className="flex justify-end space-x-2">
//           <Button type="button" variant="outline" onClick={onCancel}>
//             Cancel
//           </Button>
//           <Button type="submit">
//             {initialData.id ? "Update" : "Create"}
//           </Button>
//         </div>
//       </div>
//     </form>
//   );
// }

// // Category Form Component
// function CategoryForm({ initialData, onSubmit, onCancel }) {
//   const [formData, setFormData] = useState(initialData);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="space-y-4">
//         <input
//           placeholder="Category Title"
//           value={formData.title || ""}
//           onChange={(e) => setFormData({...formData, title: e.target.value})}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <div className="flex justify-end space-x-2">
//           <Button type="button" variant="outline" onClick={onCancel}>
//             Cancel
//           </Button>
//           <Button type="submit">
//             {initialData.id ? "Update" : "Create"}
//           </Button>
//         </div>
//       </div>
//     </form>
//   );
// }
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page