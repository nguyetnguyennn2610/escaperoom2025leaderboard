// src/Tips.jsx
import React, { useEffect, useState } from "react";
import { database, ref, onValue } from "./firebase"; 
import "./tips.css";

function Tips() {
  const tips = [
    "Think Simple: Easy over clever.",
    "Search Thoroughly: Check everywhere.",
    "Organize Items: Keep clues together.",
    "Work Backward: Start from the lock.",
    "Assign Roles: Divide and conquer.",
    "Know Locks: Understand the types.",
    "Spot Codes: Morse, Pigpen, Braille.",
    "Look for Patterns: Colors, numbers, shapes.",
    "Ask the GM: Hints keep you moving.",
    "One Use Rule: Items rarely repeat."
  ];

  const [teamOfTheDay, setTeamOfTheDay] = useState({
  name: "Tips from winning teams",
  img: "", // start empty
});

  useEffect(() => {
  const winningTipsRef = ref(database, "winningTips");

  const unsubscribe = onValue(winningTipsRef, (snapshot) => {
    const imgUrl = snapshot.val();
    if (imgUrl) {
      setTeamOfTheDay({
        name: "Tips from winning teams",
        img: imgUrl, // <-- image straight from Firebase
      });
    }
  });

  return () => unsubscribe();
}, []);

  return (
    <div className="newspaper-wrap">
      {/* Header */}
      <div className="newspaper-header-top">
        <div className="left-header">Special Edition</div>
        <div className="newspaper-name">The iZone Post</div>
        <div className="right-header">Escape Guide</div>
      </div>

      {/* Masthead */}
      <header className="masthead">
        <h1>10 Proven Escape Room Tips</h1>
        <div className="masthead-sub">
          <span>Based on Mark Rober</span> · 
          <span>Quick Survival Guide</span> · 
          <span>2025</span>
        </div>
      </header>

      {/* Team of the Day image (live from Firebase) */}
      <div className="team-of-day">
  {teamOfTheDay.img && (
    <img src={teamOfTheDay.img} alt={teamOfTheDay.name} />
  )}
  <p><strong>{teamOfTheDay.name}</strong></p>
</div>

      {/* Two-column tips layout */}
      <section className="paper-columns">
        <div className="paper-left">
          <h2>Top Strategies</h2>
          <ol>
            {tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ol>
        </div>

        <div className="paper-right">
          <h2>Quick Summary</h2>
          <div className="stat-block">
            <div className="stat-label">Mindset</div>
            <div className="stat-value">Keep it Simple</div>
          </div>
          <div className="stat-block">
            <div className="stat-label">Skill</div>
            <div className="stat-value">Teamwork</div>
          </div>
          <div className="stat-block">
            <div className="stat-label">Mistake</div>
            <div className="stat-value">Reusing Items</div>
          </div>
          <div className="stat-block">
            <div className="stat-label">Weapon</div>
            <div className="stat-value">Ask GM</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="sponsor-line">
        Inspired by Mark Rober’s video: <em>“Beat Any Escape Room — 10 proven tricks and tips.”</em>
      </div>
    </div>
  );
}

export default Tips;
