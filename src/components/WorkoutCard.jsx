import React from "react";
import { FaDumbbell, FaClock } from "react-icons/fa";

const WorkoutCard = ({ workout }) => {
  return (
    <div className="workout-card">
      <span className="category">#{workout.category}</span>
      <h3>{workout.workoutName}</h3>
      <p className="details">
        {workout.sets} sets x {workout.reps} reps
      </p>
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
