import React from "react";
import { FaDumbbell, FaClock } from "react-icons/fa";

// Card component to display a single workout's details
const WorkoutCard = ({ workout }) => {
  return (
    <div className="workout-card">
      {/* Workout category badge */}
      <span className="category">#{workout.category}</span>
      {/* Workout name */}
      <h3>{workout.workoutName}</h3>
      {/* Sets and reps info */}
      <p className="details">
        {workout.sets} sets x {workout.reps} reps
      </p>
      {/* Meta info: weight and duration */}
      <div className="meta">
        <span>
          <FaDumbbell /> {workout.weight} kg
        </span>
        <span>
          <FaClock /> {workout.duration} min
        </span>
      </div>
    </div>
  );
};

export default WorkoutCard;
