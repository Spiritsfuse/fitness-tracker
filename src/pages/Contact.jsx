import React, { useState } from "react";

// Contact page: simple feedback form with validation and success message
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  // Handle form submit with basic validation
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required.");
      return;
    }
    setError("");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="main-content">
      <form onSubmit={handleSubmit} className="contact-form">
        <h2 className="text-2xl font-bold text-primary mb-4">Contact Us</h2>
        {/* Show error or success messages */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {sent && (
          <p className="text-green-600 mb-4 animate-fadeIn">
            Message sent successfully!
          </p>
        )}
        {/* Name input */}
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {/* Message textarea */}
        <textarea
          placeholder="Message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        />
        {/* Submit button */}
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
