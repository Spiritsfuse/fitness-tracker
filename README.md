# 🏃‍♂️ TrackTonic

![React](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-4.4.0-yellow) ![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-orange) ![License](https://img.shields.io/badge/License-MIT-green)

> **Your 24/7 fitness sidekick—cheering you on, tracking every move, and helping you crush your goals.**

---

## 🎯 Table of Contents
1. [About](#about)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Screenshots](#screenshots)
5. [Getting Started](#getting-started)
6. [Folder Structure](#folder-structure)
7. [Customization](#customization)
8. [Contributing](#contributing)
9. [License](#license)
10. [Credits](#credits)

---

## 📖 About

TrackTonic is more than just a workout logger—it’s a supportive friend on your fitness journey. Log workouts in seconds, visualize your streaks with colorful charts and calendars, learn new moves with bite‑sized tutorials, and stay inspired by blogs and motivational quotes. Built with performance and privacy in mind, TrackTonic brings your health goals to life across any device.

---

## 🚀 Features

- 🌟 **Secure Authentication**: Sign up and log in seamlessly with Firebase Auth.
- 📊 **Dashboard at a Glance**: See today’s workouts, calories burned, and a daily dose of inspiration.
- 🏋️ **Workout Logging**: Quickly record, edit, and categorize your sessions (strength, cardio, yoga, and more).
- 📅 **Interactive Calendar**: Track your consistency—view your entire workout history and jump to any date.
- 📈 **Charts & Analytics**: Detailed breakdowns of calories, workout types, and progress powered by Chart.js.
- 🎥 **YouTube Tutorials**: Find and watch fitness videos in‑app without losing focus.
- 📝 **Fitness Blogs**: Fresh articles from Dev.to keep you in the know on the latest tips.
- 🌙 **Dark Mode**: Switch to night-friendly themes for late‑night planning or low‑light workouts.
- 🔄 **Responsive Design**: Pixel‑perfect experience on mobile, tablet, and desktop.
- 📬 **Contact Form**: Send feedback or questions directly from the app.

---

## 🛠️ Tech Stack

| Layer           | Tools & Libraries             |
|-----------------|-------------------------------|
| Frontend        | React 19, Vite, Tailwind CSS  |
| Charts & Icons  | Chart.js, React Icons         |
| Backend/Auth    | Firebase Auth & Firestore     |
| APIs            | YouTube Data API, Dev.to API, ZenQuotes API |
| State Management| React Context API             |
| Styling         | Tailwind CSS + Custom CSS     |

---

## 📸 Screenshots

<!-- Replace with actual screenshots in /assets -->
| Dashboard | Workout Log | Calendar View |
|:---------:|:-----------:|:-------------:|
| ![Dashboard](assets/dashboard.png) | ![Workouts](assets/workouts.png) | ![Calendar](assets/calendar.png) |

---

## 🚦 Getting Started

Follow these steps to run TrackTonic locally:

### Prerequisites

- Node.js v18+
- npm v9+
- YouTube Data API key
- Firebase project (Auth + Firestore)

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/Spiritsfuse/fitness-tracker.git
   cd fitness-tracker
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set up environment variables**
   Create a .env file in the root directory (see .env.example for structure):
   ```.env.example
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_YOUTUBE_API_KEY=your_youtube_api_key
   VITE_AI_RECOMMENDATION_KEY=your_ai_key
   ```
   - Fill in your Firebase and API keys

4. **Start the development server**
   ```bash
   npm run dev
   ```
5. **Open in browser**
   Navigate to `http://localhost:5173` and dive in!

---

## 🗂️ Folder Structure

```
src/
├── assets/           # Images, icons, and static files
├── components/       # Reusable UI elements (Navbar, WorkoutCard, etc.)
├── contexts/         # Auth and Theme context providers
├── pages/            # Main views (Dashboard, Workouts, Tutorials...)
├── firebase.js       # Firebase configuration
├── App.jsx           # Root component
├── main.jsx          # Entry point
└── index.css         # Global styles & Tailwind imports
```

---

## 🎨 Customization

- **Themes**: Tweak colors or extend light/dark variants in `index.css` and Tailwind config.
- **Workout Categories**: Add or rename categories in `AddWorkout.jsx` and sync Firestore rules.
- **APIs**: Swap in your own endpoints by updating environment variables and API service files.

---

## 🤝 Contributing

Your contributions make TrackTonic stronger!

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-new-idea`)
3. Commit your changes (`git commit -m 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/my-new-idea`)
5. Open a Pull Request

Feel free to open issues for bugs or feature requests.

---

## 📝 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## 🙏 Credits & Acknowledgments

- **Developed by Dhruv Sharma [[Spiritsfuse]](https://github.com/Spiritsfuse)**  
- Inspired by vibrant fitness communities and modern UX best practices.  
- API and design inspirations from Dev.to, ZenQuotes, and Chart.js.

---

*Made with ❤️ and ☕ in India*

