import React, { useContext, useState } from "react";
import { QuizContext } from "../context/QuizContext";
import axios from "axios";

function Home() {
  const { setStep, setUserName } = useContext(QuizContext);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleStart = async () => {
    if (name.trim() === "") return;

    try {
      const res = await axios.get("https://quiz-backend-ncn9.onrender.com/submissions");
      const alreadyPlayed = res.data.some((entry) => entry.name === name);

      if (alreadyPlayed) {
        setError("❌ You have already played the quiz.");
        return;
      }

      setUserName(name);
      localStorage.setItem("username", name);
      setStep(2);
    } catch (err) {
      console.error("Error checking submissions:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="home">
      <h1>Welcome to <strong>EduTech Quiz</strong></h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError("");
        }}
      />
      <button onClick={handleStart}>Start Quiz</button>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}

export default Home;
