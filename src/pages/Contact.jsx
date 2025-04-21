import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

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
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {sent && (
          <p className="text-green-600 mb-4 animate-fadeIn">
            Message sent successfully!
          </p>
        )}
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <textarea
          placeholder="Message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
