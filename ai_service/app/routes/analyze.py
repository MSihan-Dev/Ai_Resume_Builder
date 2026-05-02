from fastapi import APIRouter, Request
from pydantic import BaseModel
from sentence_transformers import util

from app.services.parser import extract_skills
from app.services.keyword_matcher import match_keywords
from app.services.scorer import calculate_score
from app.services.suggestions import generate_suggestions

router = APIRouter()

class AnalyzeRequest(BaseModel):
    text: str
    job_description: str = ""

@router.post("/analyze")
def analyze_resume(data: AnalyzeRequest, request: Request):

    text = data.text
    job_desc = data.job_description

    model = request.app.state.model   # 👈 IMPORTANT FIX

    # rule-based
    skills = extract_skills(text)
    keyword_data = match_keywords(text, job_desc)
    rule_score = calculate_score(text, skills, keyword_data)
    suggestions = generate_suggestions(text, keyword_data)

    # AI similarity
    resume_embedding = model.encode(text, convert_to_tensor=True)
    job_embedding = model.encode(job_desc, convert_to_tensor=True)

    similarity = util.pytorch_cos_sim(resume_embedding, job_embedding).item()

    ai_score = round((similarity + 1) / 2 * 100, 2)

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