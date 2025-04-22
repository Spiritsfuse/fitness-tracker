import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import WorkoutCard from "../components/WorkoutCard";

// Calendar component for selecting workout dates
function Calendar({ selectedDate, onSelect, workoutDates }) {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  // Calculate days in current month and first day of week
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  // Handlers for navigating months
  const handlePrev = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };
  const handleNext = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  // Build days array for calendar grid
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  // Set of date strings with workouts for highlighting
  const workoutSet = new Set(
    workoutDates.map(
      (d) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
    )
  );

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="modern-btn" onClick={handlePrev}>
          &larr;
        </button>
        <span className="font-bold">
          {new Date(year, month).toLocaleString("default", { month: "long" })}{" "}
          {year}
        </span>
        <button className="modern-btn" onClick={handleNext}>
          &rarr;
        </button>
      </div>
      <div className="calendar-days">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>
      <div className="calendar-dates">
        {days.map((d, i) => {
          // Highlight selected and workout days
          const isSelected =
            d &&
            selectedDate.getDate() === d &&
            selectedDate.getMonth() === month &&
            selectedDate.getFullYear() === year;
          const hasWorkout = d && workoutSet.has(`${year}-${month + 1}-${d}`);
          return (
            <button
              key={i}
              className={`calendar-date${isSelected ? " selected" : ""}${
                hasWorkout ? " has-workout" : ""
              }`}
              onClick={() => d && onSelect(new Date(year, month, d))}
              disabled={!d}
              aria-label={d ? `Select ${d}` : undefined}
            >
              {d || ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Helper to get date key for localStorage
function getDateKey(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

const Workouts = () => {
  const { currentUser } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch workouts for the selected date from localStorage
  useEffect(() => {
    if (!currentUser) return;
    setLoading(true);
    const email = currentUser.email;
    const dateKey = getDateKey(selectedDate);
    const key = `workouts_${email}_${dateKey}`;
    const data = JSON.parse(localStorage.getItem(key)) || [];
    setWorkouts(data);
    setLoading(false);
  }, [currentUser, selectedDate]);

  // Gather all workout dates for this user (for calendar highlights)
  const workoutDates = [];
  if (currentUser) {
    const email = currentUser.email;
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k.startsWith(`workouts_${email}_`)) {
        const parts = k.split("_");
        const dateStr = parts.slice(2).join("_");
        const [y, m, d] = dateStr.split("-").map(Number);
        if (y && m && d) {
          workoutDates.push(new Date(y, m - 1, d));
        }
      }
    }
  }

  // Show loading spinner while fetching
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen main-content">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="main-content flex flex-col md:flex-row gap-8">
      {/* Calendar for selecting workout date */}
      <Calendar
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
        workoutDates={workoutDates}
      />
      <div className="flex-1">
        <h1 className="dashboard-header" style={{ textAlign: "left" }}>
          Workouts for {selectedDate.toLocaleDateString()}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workouts.length === 0 ? (
            <div className="col-span-2 text-center text-gray-500">
              No workouts for this day.
            </div>
          ) : (
            workouts.map((workout, index) => (
              <WorkoutCard key={index} workout={workout} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Workouts;
