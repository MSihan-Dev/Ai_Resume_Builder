from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer, util
from fastapi.middleware.cors import CORSMiddleware

from app.services.parser import extract_skills
from app.services.keyword_matcher import match_keywords
from app.services.scorer import calculate_score
from app.services.suggestions import generate_suggestions

app = FastAPI()

model = SentenceTransformer("all-MiniLM-L6-v2")


# =========================
# MODELS
# =========================
class AnalyzeRequest(BaseModel):
    text: str
    job_description: str = ""

class ChatRequest(BaseModel):
    text: str


# =========================
# MAIN AI ENDPOINT
# =========================
@app.post("/analyze")
def analyze_resume(data: AnalyzeRequest):

    text = data.text
    job = data.job_description

    # rule-based
    skills = extract_skills(text)
    keyword_data = match_keywords(text, job)
    rule_score = calculate_score(text, skills, keyword_data)
    suggestions = generate_suggestions(text, keyword_data)

    # AI similarity
    resume_emb = model.encode(text, convert_to_tensor=True)
    job_emb = model.encode(job, convert_to_tensor=True)

    similarity = util.pytorch_cos_sim(resume_emb, job_emb).item()

    ai_score = ((similarity + 1) / 2) * 100

    final_score = round((rule_score * 0.6) + (ai_score * 0.4), 2)

    return {
        "smartScore": final_score,
        "analysis": {
            "skills": skills,
            "matchedKeywords": keyword_data["matched"],
            "missingKeywords": keyword_data["missing"],
            "suggestions": suggestions,
            "readability": "Medium"
        }
    }



# =========================
# 🤖 AI IMPROVEMENT
# =========================

@app.post("/improve")
def improve(req: ChatRequest):
    user_text = req.text.lower()

    category = "general"

    if "skill" in user_text:
        category = "skills"
        reply = "You should improve your skills by adding real-world projects."

    elif "experience" in user_text:
        category = "experience"
        reply = "Add measurable achievements to your experience."

    elif "resume" in user_text:
        category = "resume"
        reply = "Use a structured format: Summary, Skills, Experience, Projects."

    elif "job" in user_text:
        category = "job"
        reply = "Match your resume keywords with job descriptions."

    else:
        reply = "Ask about skills, resume, experience, or jobs."

    return {
        "improved": reply,
        "category": category
    }


# =========================
# CORS
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)