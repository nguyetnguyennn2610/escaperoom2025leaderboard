import React, { useEffect, useState } from "react";
import { database, ref, onValue } from "./firebase"; // adjust path if needed
import "./tips.css";

function Tips() {
  const tips = [
    "Think simple: easy over clever.",
    "Search thoroughly: check everywhere.",
    "Organize items: keep clues together.",
    "Work backward: start from the lock.",
    "Assign roles: divide and conquer.",
    "Know locks: understand the types.",
    "Spot codes: Morse, Pigpen, Braille.",
    "Look for patterns: colors, numbers, shapes.",
    "Ask the GM: hints keep you moving.",
    "One use rule: items rarely repeat."
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
      {/* ==== Newspaper header ==== */}
      <div className="newspaper-header-top">
        <div className="left-header">Breaking News</div>
        <div className="newspaper-name">The iZone Post</div>
        <div className="right-header">September 18-21, 2025</div>
      </div>

      {/* ==== Masthead ==== */}
      <header className="masthead">
        <h1>10 PROVEN ESCAPE ROOM TIPS</h1>
        <div className="masthead-sub">
          <span>Since 2023</span> · <span>A Meliora Weekend Experience</span> · <span>3rd edition</span>
        </div>
      </header>

      {/* ==== Team of the Day (centered under masthead) ==== */}
      <div className="team-of-day">
        <h2>Team of the Day</h2>
        {teamOfTheDay?.img ? (
          <img src={teamOfTheDay.img} alt="Team of the Day" />
        ) : (
          <img
            src="https://via.placeholder.com/600x400.png?text=Loading..."
            alt="Loading"
          />
        )}
        {teamOfTheDay?.name && <p>{teamOfTheDay.name}</p>}
      </div>

      {/* ==== Tips in two columns ==== */}
      <div className="tips-section">
        <h2>Top Strategies</h2>
        <ol className="two-columns">
          {tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ol>
      </div>

      {/* ==== Sponsor line ==== */}
      <div className="sponsor-line">
        Sponsored by IZone Escape Team – “Unlocking Creativity”
      </div>
    </div>
  );
}

export default Tips;
