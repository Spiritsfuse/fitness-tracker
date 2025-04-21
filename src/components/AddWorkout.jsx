import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

const categories = [
  "Chest",
  "Back",
  "Legs",
  "Arms",
  "Shoulders",
  "Core",
  "Cardio",
  "Other",
];

export default function AddWorkout({ addNewWorkout }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    category: "",
    workoutName: "",
    sets: "",
    reps: "",
    weight: "",
    duration: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (
      !form.category ||
      !form.workoutName ||
      !form.sets ||
      !form.reps ||
      !form.weight ||
      !form.duration
    ) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    await addNewWorkout({
      category: form.category,
      workoutName: form.workoutName,
      sets: parseInt(form.sets),
      reps: parseInt(form.reps),
      weight: parseInt(form.weight),
      duration: parseInt(form.duration),
    });
    setForm({
      category: "",
      workoutName: "",
      sets: "",
      reps: "",
      weight: "",
      duration: "",
    });
    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="add-workout-btn shadow-lg"
        aria-label="Add Workout"
        style={{
          background: "linear-gradient(90deg, #7c3aed, #10b981)",
          color: "#fff",
        }}
      >
        <FaPlus size={28} />
      </button>
      {open && (
        <div className="add-modal-bg">
          <form
            className="add-modal-card animate-pop"
            onSubmit={submit}
            style={{
              background: "linear-gradient(120deg, #f3f4f6 60%, #e0e7ff 100%)",
              border: "2px solid #7c3aed",
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-primary">
                Add New Workout
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-red-500"
                aria-label="Close Add Workout Modal"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="border border-primary rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-accent"
                required
                aria-label="Workout Category"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input
                name="workoutName"
                type="text"
                placeholder="Workout Name"
                value={form.workoutName}
                onChange={handleChange}
                className="border border-primary rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-accent"
                required
                aria-label="Workout Name"
              />
              <div className="flex gap-2">
                <input
                  name="sets"
                  type="number"
                  min="1"
                  placeholder="Sets"
                  value={form.sets}
                  onChange={handleChange}
                  className="border border-primary rounded-lg p-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                  aria-label="Sets"
                />
                <input
                  name="reps"
                  type="number"
                  min="1"
                  placeholder="Reps"
                  value={form.reps}
                  onChange={handleChange}
                  className="border border-primary rounded-lg p-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                  aria-label="Reps"
                />
              </div>
              <div className="flex gap-2">
                <input
                  name="weight"
                  type="number"
                  min="0"
                  placeholder="Weight (kg)"
                  value={form.weight}
                  onChange={handleChange}
                  className="border border-primary rounded-lg p-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                  aria-label="Weight"
                />
                <input
                  name="duration"
                  type="number"
                  min="1"
                  placeholder="Duration (min)"
                  value={form.duration}
                  onChange={handleChange}
                  className="border border-primary rounded-lg p-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                  aria-label="Duration"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-gradient-to-r from-primary to-secondary text-white py-2 rounded-lg font-bold hover:bg-accent transition"
              disabled={loading}
              aria-label="Add Workout"
            >
              {loading ? "Adding..." : "Add Workout"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
