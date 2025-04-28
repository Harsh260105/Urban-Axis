from flask import Flask, request, jsonify
import json
import cohere
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows frontend requests

# Load dataset
try:
    with open(r"D:\SGP\Urban-Axis\chatbot\backend\financial_chatbot_data.json", "r", encoding="utf-8") as file:
        dataset = json.load(file)
    financial_data = {entry["query"]: entry["response"] for entry in dataset}
    print("Dataset loaded successfully:", financial_data)  # Debugging Line
except Exception as e:
    financial_data = {}
    print("Error loading dataset:", e)


# Set Cohere API key
COHERE_API_KEY = "qfhMIPqUCPJCXmCmmCn9U2kG9Vc3vgrXH0P8rmtX"
co = cohere.Client(COHERE_API_KEY)

def get_financial_advice(user_query):
    if user_query in financial_data:
        return financial_data[user_query]

    try:
        response = co.generate(
            model="command-light",
            prompt=f"You are a financial assistant helping users with budget management and investments.\nUser: {user_query}\nAssistant:",
            max_tokens=300,
            temperature=0.7,
        )
        return response.generations[0].text.strip()
    except Exception as e:
        print("Cohere API Error:", e)
        return "Sorry, I'm having trouble generating a response right now."

@app.route("/get_advice", methods=["POST"])
def get_advice():
    if request.content_type != "application/json":
        return jsonify({"error": "Content-Type must be application/json"}), 415  

    data = request.get_json()
    if not data or "query" not in data:
        return jsonify({"error": "Query cannot be empty"}), 400

    user_query = data["query"]
    response = get_financial_advice(user_query)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
