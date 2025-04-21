// Dashboard page that displays today's workouts, charts, and motivational quotes.
// Integrates with localStorage for workout data and uses Chart.js for visualizations.
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import AddWorkout from "../components/AddWorkout";
import WorkoutCard from "../components/WorkoutCard";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Helper function to get today's date key
function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function getUserEmail() {
  // Get current user email from Firebase Auth
  const user = JSON.parse(localStorage.getItem("firebase:authUser:")) || {};
  return user.email || "";
}

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState("");

  // Get user email
  const userEmail = currentUser?.email;

  // Fetch today's workouts from localStorage
  useEffect(() => {
    if (!userEmail) return;
    setLoading(true);
    const todayKey = getTodayKey();
    const data =
      JSON.parse(localStorage.getItem(`workouts_${userEmail}_${todayKey}`)) ||
      [];
    setWorkouts(data);
    setLoading(false);
  }, [userEmail]);

  // Fetch random quote from ZenQuotes API (with CORS proxy fallback)
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        // Use a public CORS proxy
        const res = await fetch(
          "https://api.allorigins.win/get?url=" +
            encodeURIComponent("https://zenquotes.io/api/random")
        );
        const data = await res.json();
        const parsed = JSON.parse(data.contents);
        setQuote(parsed[0]?.q || "Stay motivated!");
      } catch {
        setQuote("Stay motivated!");
      }
    };
    fetchQuote();
  }, []);

  // Add new workout to localStorage
  const addNewWorkout = (workout) => {
    const todayKey = getTodayKey();
    const key = `workouts_${userEmail}_${todayKey}`;
    const prev = JSON.parse(localStorage.getItem(key)) || [];
    const newArr = [workout, ...prev];
    localStorage.setItem(key, JSON.stringify(newArr));
    setWorkouts(newArr);
    return Promise.resolve(); // for modal close
  };

  // Chart Data (all workouts for this user, all dates)
  const [allWorkouts, setAllWorkouts] = useState([]);
  useEffect(() => {
    if (!userEmail) return;
    // Gather all workouts for this user from localStorage
    const all = [];
    Object.keys(localStorage).forEach((k) => {
      if (k.startsWith(`workouts_${userEmail}_`)) {
        const arr = JSON.parse(localStorage.getItem(k)) || [];
        all.push(...arr);
      }
    });
    setAllWorkouts(all);
  }, [userEmail, workouts]);

  // Chart: Calories per session
  const chartData = {
    labels: allWorkouts.map((w, i) => w.workoutName || `Workout ${i + 1}`),
    datasets: [
      {
        label: "Calories Burned",
        data: allWorkouts.map(
          (w) => (w.weight || 0) * (w.sets || 0) * (w.reps || 0) * 0.1
        ),
        backgroundColor: "rgba(245, 158, 11, 0.7)",
        borderColor: "#F59E0B",
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  // Pie: Category breakdown
  const categoryCounts = allWorkouts.reduce((acc, w) => {
    const category = w.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  const pieData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        data: Object.values(categoryCounts),
        backgroundColor: [
          "#6366f1",
          "#10b981",
          "#f59e0b",
          "#f43f5e",
          "#a21caf",
          "#0ea5e9",
          "#fbbf24",
        ],
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen main-content">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="main-content grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: Today's Workouts + AddWorkout */}
      <div className="flex flex-col gap-6">
        <div className="card">
          <h2 className="text-xl font-bold text-primary mb-4">
            Today's Workouts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workouts.length === 0 && (
              <p className="text-gray-500">No workouts yet. Add one below!</p>
            )}
            {workouts.map((workout, index) => (
              <WorkoutCard key={index} workout={workout} />
            ))}
          </div>
        </div>
        <AddWorkout addNewWorkout={addNewWorkout} />
      </div>
      {/* Right: Charts + Quote */}
      <div className="flex flex-col gap-6">
        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div style={{ height: 220 }}>
              <h3 className="text-lg font-semibold text-primary mb-2">
                Calories Burned
              </h3>
              <Bar
                data={chartData}
                options={{
                  plugins: { legend: { display: false } },
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                height={180}
              />
            </div>
            <br/>
            <br/>
            <div style={{ height: 220 }}>
              <h3 className="text-lg font-semibold text-primary mb-2">
                Workout Categories
              </h3>
              <Doughnut
                data={pieData}
                options={{
                  plugins: { legend: { position: "bottom" } },
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                height={180}
              />
            </div>
          </div>
        </div>
        <div className="card bg-gradient-to-r from-secondary to-accent text-white text-center p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Motivational Quote</h3>
          <p className="text-xl font-bold">{quote}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
