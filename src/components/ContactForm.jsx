// ContactForm component for collecting user feedback or inquiries.
// Includes form validation for name, email, and message fields.
import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  // Function to validate form fields
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.message) newErrors.message = "Message is required";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    alert("Feedback submitted successfully!");
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-primary dark:text-indigo-400 mb-4">
        Contact Us
      </h2>
      {/* Name input field */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-gray-100"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      {/* Email input field */}
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-gray-100"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      {/* Message textarea */}
      <div className="mb-4">
        <textarea
          placeholder="Message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-gray-100"
          rows="4"
        />
        {errors.message && (
          <p className="text-red-500 text-sm">{errors.message}</p>
        )}
      </div>
      {/* Submit button */}
      <button
        type="submit"
        className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
