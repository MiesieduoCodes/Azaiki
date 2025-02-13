"use client";
import { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import dynamic from "next/dynamic";
import { FaUser, FaEnvelope, FaCommentDots, FaDonate, FaCalendarAlt, FaClock, FaUsers } from "react-icons/fa";
import gsap from "gsap";

const MapComponent = dynamic(() => import("@/app/components/MapComponent"), { ssr: false });

const ContactPage = () => {
  const [selectedContactType, setSelectedContactType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    donationAmount: "",
    visitDate: "",
    visitTime: "",
    numberOfVisitors: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleContactTypeChange = (e) => {
    setSelectedContactType(e.target.value);
  };

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    gsap.from(".contact-form", { opacity: 0, y: 50, scale: 0.95, duration: 1.5, ease: "power3.out" });
    gsap.from(".form-field", { opacity: 0, y: 30, duration: 1, stagger: 0.2, ease: "power3.out" });
  }, []);

  return (
    <div className="flex pt-12  flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-500 text-gray-900 dark:text-white font-sans">
      <div className="container mx-auto p-6 lg:p-10 max-w-4xl bg-white dark:bg-black shadow-2xl rounded-lg contact-form">
        <h1 className="text-3xl lg:text-4xl font-bold text-center text-blue-500 dark:text-yellow-400 mb-6">Contact Us</h1>
        {successMessage && <div className="text-green-600 text-center mb-4">{successMessage}</div>}
        {errorMessage && <div className="text-red-600 text-center mb-4">{errorMessage}</div>}
        <form className="space-y-6">
          <div className="form-field">
            <label className="block font-semibold mb-2">Contact Type</label>
            <select value={selectedContactType} onChange={handleContactTypeChange} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Select a contact type</option>
              <option value="donation">Donation</option>
              <option value="visit">Visit</option>
              <option value="inquiry">Inquiry</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-field flex items-center">
            <FaUser className="text-blue-500 dark:text-yellow-400 mr-3" />
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleFormDataChange} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
          </div>

          <div className="form-field flex items-center">
            <FaEnvelope className="text-blue-500 dark:text-yellow-400 mr-3" />
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleFormDataChange} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
          </div>

          <div className="form-field flex items-start">
            <FaCommentDots className="text-blue-500 dark:text-yellow-400 mt-3 mr-3" />
            <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleFormDataChange} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" rows="4" required />
          </div>

          <button type="submit" className="w-full bg-blue-500 dark:bg-yellow-400 text-white dark:text-gray-900 py-3 rounded-lg font-bold hover:bg-blue-600 dark:hover:bg-yellow-500 transition">Submit</button>
        </form>
      </div>

      <div className="mt-10 w-full max-w-4xl h-80 rounded-lg overflow-hidden shadow-lg">
        <MapComponent />
      </div>
    </div>
  );
};

export default ContactPage;