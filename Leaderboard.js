import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = ({ goHome }) => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    axios.get("https://quiz-backend-ncn9.onrender.com/submissions")
      .then(res => setLeaders(res.data))
      .catch(err => console.error("Error fetching leaderboard", err));
  }, []);

  return (
    <div className="leaderboard">
      <h2>🏆 Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((entry, index) => (
            <tr key={entry.name}>
              <td>{index + 1}</td>
              <td>{entry.name}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={goHome}>Go Back</button>
    </div>
  );
};

export default Leaderboard;
