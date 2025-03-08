"use client";
import { useState, useEffect, useRef } from "react";
import emailjs from "emailjs-com";
import dynamic from "next/dynamic";
import { FaUser, FaEnvelope, FaCommentDots, FaDonate, FaCalendarAlt, FaClock, FaUsers, FaSpinner } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MapComponent = dynamic(() => import("@/app/components/MapComponent"), { 
  ssr: false,
  loading: () => <div className="h-[450px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl" />
});

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
  const [status, setStatus] = useState({ loading: false, success: "", error: "" });
  const formRef = useRef(null);
  const mapRef = useRef(null);

  // Form handlers
  const handleContactTypeChange = (e) => {
    setSelectedContactType(e.target.value);
  };

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Form animations
    gsap.from(".contact-form", {
      opacity: 0,
      y: 50,
      scale: 0.95,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    gsap.from(".form-field", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    });

    // Map animation
    if (mapRef.current) {
      gsap.from(mapRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mapRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: "", error: "" });

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      );

      setStatus({ loading: false, success: "Message sent successfully!", error: "" });
      setFormData({
        name: "",
        email: "",
        message: "",
        donationAmount: "",
        visitDate: "",
        visitTime: "",
        numberOfVisitors: "",
      });
      setSelectedContactType("");
    } catch (error) {
      setStatus({ loading: false, success: "", error: "Failed to send message. Please try again." });
    }
  };

  const renderAdditionalFields = () => {
    switch (selectedContactType) {
      case "donation":
        return (
          <div className="form-field flex items-center">
            <FaDonate className="text-blue-500 dark:text-yellow-400 mr-3" />
            <input
              type="number"
              name="donationAmount"
              placeholder="Donation Amount ($)"
              value={formData.donationAmount}
              onChange={handleFormDataChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        );
      case "visit":
        return (
          <>
            <div className="form-field flex items-center">
              <FaCalendarAlt className="text-blue-500 dark:text-yellow-400 mr-3" />
              <input
                type="date"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleFormDataChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-field flex items-center">
                <FaClock className="text-blue-500 dark:text-yellow-400 mr-3" />
                <input
                  type="time"
                  name="visitTime"
                  value={formData.visitTime}
                  onChange={handleFormDataChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="form-field flex items-center">
                <FaUsers className="text-blue-500 dark:text-yellow-400 mr-3" />
                <input
                  type="number"
                  name="numberOfVisitors"
                  placeholder="Number of Visitors"
                  value={formData.numberOfVisitors}
                  onChange={handleFormDataChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex pt-12 flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <div className="container mx-auto p-6 lg:p-10 max-w-4xl bg-white dark:bg-gray-800 shadow-2xl rounded-2xl contact-form transition-colors duration-300">
        <h1 className="text-3xl lg:text-4xl font-bold text-center text-blue-600 dark:text-yellow-400 mb-8 animate-gradient bg-gradient-to-r from-blue-600 to-purple-600 dark:from-yellow-400 dark:to-orange-400 bg-clip-text text-transparent">
          Contact Us
        </h1>
        
        {status.success && (
          <div className="text-center mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg transition-all">
            {status.success}
          </div>
        )}
        {status.error && (
          <div className="text-center mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg transition-all">
            {status.error}
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="form-field">
            <label className="block font-semibold mb-2">Contact Type</label>
            <select
              value={selectedContactType}
              onChange={handleContactTypeChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
            >
              <option value="">Select a contact type</option>
              <option value="donation">Donation</option>
              <option value="visit">Visit</option>
              <option value="inquiry">Inquiry</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-field flex items-center">
            <FaUser className="text-blue-500 dark:text-yellow-400 mr-3 flex-shrink-0" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleFormDataChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
              required
            />
          </div>

          <div className="form-field flex items-center">
            <FaEnvelope className="text-blue-500 dark:text-yellow-400 mr-3 flex-shrink-0" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleFormDataChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
              required
            />
          </div>

          {renderAdditionalFields()}

          <div className="form-field flex items-start">
            <FaCommentDots className="text-blue-500 dark:text-yellow-400 mt-3 mr-3 flex-shrink-0" />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleFormDataChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="w-full bg-blue-600 dark:bg-yellow-400 text-white dark:text-gray-900 py-3 rounded-lg font-bold hover:bg-blue-700 dark:hover:bg-yellow-500 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {status.loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Sending...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>

      <div ref={mapRef} className="mt-16 w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:shadow-3xl">
        <MapComponent />
      </div>
    </div>
  );
};

export default ContactPage;