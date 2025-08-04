import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "./firebase";
import React, { useEffect, useState } from "react";
import "./index.css";

const db = getDatabase(app);

function Leaderboard() {
  const [allTeams, setAllTeams] = useState([]);
  const [photoLinks, setPhotoLinks] = useState([]);

  useEffect(() => {
    const teamsRef = ref(db, "teams");
    onValue(teamsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allEntries = Object.values(data).filter(team => team.name && team.numPeople); // include all
        setAllTeams(allEntries);
      }
    });

    const highlightsRef = ref(db, "highlights");
    onValue(highlightsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const urls = Object.values(data).filter(
          (url) => typeof url === "string" && url.length > 10
        );
        setPhotoLinks(urls);
      }
    });
  }, []);

  const topTeams = [...allTeams]
    .filter(team => team.hints < 4)
    .sort((a, b) => a.ranking - b.ranking)
    .slice(0, 5);

  const isNewTeam = (timestamp) => {
    if (!timestamp) return false;
    const teamTime = new Date(timestamp);
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    return teamTime > oneHourAgo;
  };
  
  const totalGroups = allTeams.length;
  const totalPeople = allTeams.reduce((sum, team) => sum + (team.numPeople || 0), 0);
  const escapedGroups = allTeams.filter(team => team.rawTime < 3600).length;
  const percentEscaped = totalGroups > 0 ? ((escapedGroups / totalGroups) * 100).toFixed(1) : "0.0";

  const escapedTimes = allTeams
    .filter(team => team.rawTime < 3600)
    .map(team => team.rawTime);

  const avgEscapeTime =
    escapedTimes.length > 0
      ? `${Math.floor(escapedTimes.reduce((a, b) => a + b, 0) / escapedTimes.length / 60)}:${String(Math.floor(escapedTimes.reduce((a, b) => a + b, 0) / escapedTimes.length % 60)).padStart(2, "0")}`
      : "N/A";

  return (
    <div className="newspaper-wrap">
      <div className="newspaper-header-top">
        <div className="left-header">Breaking News</div>
        <div className="newspaper-name">The iZone Post</div>
        <div className="right-header">September 18-21, 2025</div>
      </div>

      <header className="masthead">
        <h1>CAVING GONE WRONG</h1>
        <div className="masthead-sub">
          <span>Since 2023</span> · <span>A Meliora Weekend Experience</span> · <span>3rd edition</span>
        </div>
      </header>

      <section className="paper-columns">
        <div className="paper-left">
          <h2>Escape logs: Fastest rescues from the underground collapse</h2>
          <table className="rank-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Crew</th>
                <th>Time</th>
                <th>Hints</th>
              </tr>
            </thead>
            <tbody>
              {topTeams.map((team) => (
                <tr key={team.name}>
                  <td>{team.ranking}</td>
                  <td>
                    {team.name}
                    {isNewTeam(team.timestamp) && (
                      <span className="new-badge">NEW</span>
                    )}
                  </td>
                  <td>{team.time}</td>
                  <td>{team.hints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="paper-right">
          <h2>Aftermath Overview</h2>
          <div className="stat-block">
            <div className="stat-label">Average Escape Time</div>
            <div className="stat-value">{avgEscapeTime}</div>
          </div>
          <div className="stat-block">
            <div className="stat-label">Successful Escapes</div>
            <div className="stat-value">{percentEscaped}%</div>
          </div>
          <div className="stat-block">
            <div className="stat-label">Number of Miners</div>
            <div className="stat-value">{totalPeople}</div>
          </div>
          <div className="stat-block">
            <div className="stat-label">Number of Crews</div>
            <div className="stat-value">{totalGroups}</div>
          </div>
        </div>
      </section>

      <section className="paper-bottom">
        <h2>Scenes from the Rescue</h2>
        <div className="gallery-container">
          <div className="gallery-track">
            {[...photoLinks, ...photoLinks].map((url, index) => (
              <img key={index} src={url} alt={`Team Highlight ${index + 1}`} />
            ))}
          </div>
        </div>

        <div className="sponsor-line">
          Sponsored by: RCL Library Staff · Building and Tech Services · Theater Department · Robbins Library · Studio X
        </div>

      </section>

    </div>
  );
}

export default Leaderboard;
