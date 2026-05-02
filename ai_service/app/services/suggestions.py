def generate_suggestions(text, keyword_data):
    suggestions = []

    word_count = len(text.split())

    if word_count < 300:
        suggestions.append("Your resume is too short. Add more projects and experience.")

    if keyword_data["missing"]:
        suggestions.append(
            "Include important keywords: " + ", ".join(keyword_data["missing"][:5])
        )

    if "responsible for" in text.lower():
        suggestions.append("Replace 'responsible for' with strong action verbs like 'developed', 'led', 'implemented'.")

    if "i worked" in text.lower():
        suggestions.append("Avoid using 'I'. Use professional bullet points.")

    if "project" not in text.lower():
        suggestions.append("Add a projects section to strengthen your profile.")

    return suggestions