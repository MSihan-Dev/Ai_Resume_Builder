import re

def clean_text(text):
    return re.findall(r'\b\w+\b', text.lower())

def match_keywords(resume_text, job_description):
    resume_words = set(clean_text(resume_text))
    job_words = set(clean_text(job_description))

    matched = list(resume_words & job_words)
    missing = list(job_words - resume_words)

    return {
        "matched": matched[:20],   # limit noise
        "missing": missing[:20]
    }