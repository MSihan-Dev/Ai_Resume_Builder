import spacy

nlp = spacy.load("en_core_web_sm")

SKILL_DB = [
    "python", "java", "javascript", "react", "node", "mongodb",
    "machine learning", "data analysis", "docker", "aws",
    "express", "sql", "git", "rest api"
]

def extract_skills(text):
    text_lower = text.lower()
    doc = nlp(text_lower)

    found = set()

    # 🔹 Phrase match (important for multi-word skills)
    for skill in SKILL_DB:
        if skill in text_lower:
            found.add(skill)

    # 🔹 NLP-based noun detection (extra intelligence)
    for token in doc:
        if token.pos_ in ["NOUN", "PROPN"]:
            if token.text in SKILL_DB:
                found.add(token.text)

    return list(found)