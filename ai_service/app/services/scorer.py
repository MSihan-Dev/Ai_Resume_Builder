def calculate_score(text, skills, keyword_data):
    score = 0

    # 🔹 Skills (max 40)
    score += min(len(skills) * 6, 40)

    # 🔹 Keywords (max 40)
    total = len(keyword_data["matched"]) + len(keyword_data["missing"])
    if total > 0:
        score += (len(keyword_data["matched"]) / total) * 40

    # 🔹 Length (max 20)
    words = len(text.split())
    if 400 <= words <= 1200:
        score += 20
    elif 200 <= words < 400:
        score += 10

    return round(score, 2)