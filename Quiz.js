import React, { useState, useContext, useEffect } from "react";
import { QuizContext } from "../context/QuizContext";
import Result from "./Result";

function Quiz() {
  const { questions, setUserAnswers, setScore } = useContext(QuizContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [localScore, setLocalScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes

  useEffect(() => {
    if (showResult) return;
    if (timeLeft === 0) {
      setUserAnswers([...answers, selectedOption || "Skipped"]);
      setScore(localScore);
      setShowResult(true);
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showResult, answers, selectedOption, localScore, setUserAnswers, setScore]);

  const handleOptionClick = (option) => setSelectedOption(option);

  const handleNext = () => {
    const correct = questions[currentQuestion].answer;
    const userAnswer = selectedOption || "Skipped";

    if (userAnswer === correct) {
      setLocalScore((prev) => prev + 1);
    }

    setAnswers((prev) => [...prev, userAnswer]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption("");
    } else {
      setUserAnswers([...answers, userAnswer]);
      setScore(userAnswer === correct ? localScore + 1 : localScore);
      setShowResult(true);
    }
  };

  const formatTime = (t) => {
    const m = Math.floor(t / 60).toString().padStart(1, "0");
    const s = (t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return showResult ? (
    <Result restartQuiz={() => window.location.reload()} />
  ) : (
    <div className="quiz">
      <div className="timer">⏰ Time Left: {formatTime(timeLeft)}</div>
      <h2>Question {currentQuestion + 1}</h2>
      <p>{questions[currentQuestion].question}</p>
      <div className="options">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className={selectedOption === option ? "selected" : ""}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <button onClick={handleNext}>
        {currentQuestion === questions.length - 1 ? "Submit" : "Next / Skip"}
      </button>
    </div>
  );
}

export default Quiz;
