from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory submission DB
submissions_db = []

# Correct answers list
correct_answers = [
    "Hyper Text Markup Language",        # Q1 - HTML
    "CSS",                               # Q2 - CSS
    "JavaScript",                        # Q3 - JavaScript
    "Python",                            # Q4 - JS Framework
    "Cascading style sheet",             # Q5 - CSS
    "PUT",                               # Q6 - API
    "Application Programming Interface", # Q7 - API
    "MongoDB",                           # Q8 - Database
    "Git",                               # Q9 - DevOps
    "npx create-react-app appname",      # Q10 - React
    "useState",                          # Q11 - React
    "app.get()",                         # Q12 - Express
    "JavaScript XML",                    # Q13 - React
    "mongoose",                          # Q14 - MongoDB
    "fetch() with method POST"           # Q15 - JavaScript
]

#  Question index to topic mapping
question_topics = {
    0: "HTML",
    1: "CSS",
    2: "JavaScript",
    3: "JavaScript",
    4: "CSS",
    5: "API",
    6: "API",
    7: "Database",
    8: "DevOps",
    9: "React",
    10: "React",
    11: "Express",
    12: "React",
    13: "MongoDB",
    14: "JavaScript"
}

#  Model for user submission
class Submission(BaseModel):
    name: str
    score: int
    answers: list[str]  # allow "Skipped"

#  Root endpoint (for testing if app is up)
@app.get("/")
def read_root():
    return {"message": "Backend is live and working!"}

#  POST endpoint for quiz submissions
@app.post("/submissions")
def submit_score(data: Submission):
    submissions_db.append(data.dict())

    weak_topics = []
    for idx in range(len(correct_answers)):
        try:
            user_answer = data.answers[idx]
        except IndexError:
            user_answer = "Skipped"

        correct = correct_answers[idx]
        topic = question_topics.get(idx)

        if not user_answer or user_answer.strip().lower() == "skipped" or user_answer.strip().lower() != correct.strip().lower():
            if topic and topic not in weak_topics:
                weak_topics.append(topic)

    return {
        "message": "Submission saved successfully.",
        "weak_topics": weak_topics
    }

#  GET endpoint for leaderboard
@app.get("/submissions")
def get_submissions():
    user_best_scores = {}
    for entry in submissions_db:
        name = entry["name"]
        score = entry["score"]
        if name not in user_best_scores or score > user_best_scores[name]["score"]:
            user_best_scores[name] = entry

    sorted_submissions = sorted(user_best_scores.values(), key=lambda x: x["score"], reverse=True)
    return sorted_submissions
