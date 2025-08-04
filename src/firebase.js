import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCETim_YAlyGHebbtWjyxgTyuRqDzltLE4",
  authDomain: "escape-room-2025-leaderboard.firebaseapp.com",
  databaseURL: "https://escape-room-2025-leaderboard-default-rtdb.firebaseio.com",
  projectId: "escape-room-2025-leaderboard",
  storageBucket: "escape-room-2025-leaderboard.appspot.com",
  messagingSenderId: "863678931011",
  appId: "1:863678931011:web:933b89ab2e325e1eb5f4f6",
  measurementId: "G-GKGDLQB4YK"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { app, analytics, database, ref, onValue }; 
