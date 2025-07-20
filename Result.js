import React, { useEffect, useContext, useState } from "react";
import { QuizContext } from "../context/QuizContext";
import axios from "axios";

const Result = ({ restartQuiz }) => {
  const { score, userAnswers, questions, setStep } = useContext(QuizContext);
  const [weakTopics, setWeakTopics] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("username") || "Anonymous";
    axios.post("https://quiz-backend-ncn9.onrender.com/submissions", {
      name: username,
      score,
      answers: userAnswers,
    })
    .then((res) => {
      if (res.data.weak_topics?.length > 0) {
        setWeakTopics(res.data.weak_topics);
      }
    })
    .catch((err) => {
      console.error("Submission failed", err);
    });
  }, [score, userAnswers]);

  const handleDownloadCertificate = () => {
    const username = localStorage.getItem("username") || "Anonymous";
    const certHTML = `
      <html><head><style>
        body { text-align: center; font-family: Arial; background: #f0f8ff; padding: 50px; }
        .certificate { border: 5px solid #333; padding: 30px; background: #fffbe6; width: 80%; margin: auto; }
        h1 { font-size: 36px; } h2, h3 { margin: 0; }
      </style></head><body>
        <div class="certificate">
          <h1>Certificate of Completion</h1>
          <p>This certifies that</p>
          <h2>${username}</h2>
          <p>successfully completed the EduTech Quiz with a score of</p>
          <h3>${score} / ${questions.length}</h3>
          <p>Date: ${new Date().toLocaleDateString()}</p>
        </div>
      </body></html>
    `;
    const newWin = window.open("", "_blank");
    newWin.document.write(certHTML);
    newWin.document.close();
    newWin.print();
  };

  return (
    <div className="result-container">
      <h2>🎉 Quiz Completed!</h2>
      <p>Your Score: <strong>{score}</strong> / {questions.length}</p>

      <h3>📝 Question-wise Review:</h3>
      <ul className="question-results">
        {questions.map((q, idx) => (
          <li key={idx}>
            <strong>Q{idx + 1}: {q.question}</strong><br />
            <span style={{ color: userAnswers[idx] === q.answer ? "green" : "red" }}>
              Your Answer: {userAnswers[idx] || "Skipped"}<br />
              {userAnswers[idx] === q.answer
                ? "✅ Correct"
                : `❌ Correct: ${q.answer}`}
            </span>
          </li>
        ))}
      </ul>

      {weakTopics.length > 0 && (
        <div className="review-topics">
          <h3>📚 <strong>Topics to Review:</strong></h3>
          <ul className="review-list" style={{ paddingLeft: "25px", textAlign: "left" }}>
            {weakTopics.map((topic, i) => (
              <li key={i}>🔸 {topic.replace(" - ", "")}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="result-buttons">
        <button onClick={restartQuiz}>🔁 Restart</button>
        <button onClick={handleDownloadCertificate}>🎓 Download Certificate</button>
        <button onClick={() => setStep(4)}>🏆 View Leaderboard</button>
      </div>
    </div>
  );
};

export default Result;
