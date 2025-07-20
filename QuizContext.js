import React, { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const questions = [
    { question: "What does HTML stand for?", options: ["Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language", "Hyper Tool Markup Language"], answer: "Hyper Text Markup Language", topic: "HTML" },
    { question: "Which language is used for styling web pages?", options: ["HTML", "JQuery", "CSS", "XML"], answer: "CSS", topic: "CSS" },
    { question: "What does JS stand for?", options: ["JavaSuper", "JavaScript", "JustScript", "JScript"], answer: "JavaScript", topic: "JavaScript" },
    { question: "Which is not a JavaScript framework?", options: ["Python", "React", "Vue", "Angular"], answer: "Python", topic: "JavaScript" },
    { question: "What does CSS stand for?", options: ["Common style sheet", "Cascading style sheet", "Colour style sheet", "Computer style sheet"], answer: "Cascading style sheet", topic: "CSS" },
    { question: "Which HTTP method is used to update data?", options: ["GET", "POST", "PUT", "DELETE"], answer: "PUT", topic: "API" },
    { question: "What is the full form of API?", options: ["Application Programming Interface", "Application Process Integration", "Applied Programming Internet", "Application Program Index"], answer: "Application Programming Interface", topic: "API" },
    { question: "Which one is a NoSQL database?", options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"], answer: "MongoDB", topic: "Database" },
    { question: "Which tool is used for version control?", options: ["NPM", "Git", "Docker", "Webpack"], answer: "Git", topic: "DevOps" },
    { question: "Which command is used to create a React app?", options: ["create-react-app appname", "react-create appname", "npx create-react-app appname", "npm new react-app appname"], answer: "npx create-react-app appname", topic: "React" },
    { question: "Which hook is used to manage state in React?", options: ["useEffect", "useRef", "useState", "useMemo"], answer: "useState", topic: "React" },
    { question: "Which Express method defines a GET route?", options: ["app.get()", "app.route()", "app.use()", "app.listen()"], answer: "app.get()", topic: "Express" },
    { question: "What does JSX stand for?", options: ["JavaScript Extension", "Java Syntax XML", "JavaScript XML", "JSON Syntax Extension"], answer: "JavaScript XML", topic: "React" },
    { question: "Which is used to connect Node.js with MongoDB?", options: ["mongoose", "express", "sequelize", "axios"], answer: "mongoose", topic: "MongoDB" },
    { question: "Which function sends data to server using fetch?", options: ["fetch.get()", "fetch.post()", "fetch() with method POST", "fetch.send()"], answer: "fetch() with method POST", topic: "JavaScript" }
  ];

  const resetQuiz = () => {
    setStep(1);
    setUserName("");
    setScore(0);
    setUserAnswers([]);
  };

  return (
    <QuizContext.Provider
      value={{
        step,
        setStep,
        userName,
        setUserName,
        score,
        setScore,
        userAnswers,
        setUserAnswers,
        questions,
        resetQuiz
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
