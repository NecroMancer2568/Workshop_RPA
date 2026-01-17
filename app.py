from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import google.genai as genai
import os
from dotenv import load_dotenv
import re
API_KEY=os.getenv("GOOGLE_API_KEY")
client = genai.Client(api_key=API_KEY)
# Load environment variables
load_dotenv()

app = Flask(__name__)
conversation_history=[]
# Enhanced CORS configuration
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Initialize Gemini API with API key from environment


def clean_gemini_output(text):
    """Clean Markdown, code fences, extra spaces"""
    # Remove code fences ```python or ```
    text = re.sub(r"```[a-z]*", "", text)
    text = re.sub(r"```", "", text)

    # Remove Markdown headers (#, ##, ###)
    text = re.sub(r"^#+\s*", "", text, flags=re.MULTILINE)

    # Strip extra newlines
    text = re.sub(r"\n{2,}", "\n", text)

    return text.strip()


def chat_with_gemini(prompt):
    conversation_history.append({"role": "user", "content": prompt})

    full_input = ""
    for turn in conversation_history:
        full_input += f"{turn['role']}: {turn['content']}\n"

    interaction = client.interactions.create(
        model="gemini-3-flash-preview",
        input=full_input
    )
    reply = interaction.outputs[-1].text
    reply = clean_gemini_output(reply)

    conversation_history.append({"role": "assistant", "content": reply})
    return reply

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "message": "Flask server is running"})


@app.route("/test", methods=["GET", "POST"])
def test():
    """Test endpoint to verify server is working"""
    return jsonify({
        "status": "ok",
        "message": "Server is responding",
        "method": request.method,
        "data": request.get_json() if request.is_json else None
    })


@app.before_request
def log_request_info():
    """Log all incoming requests for debugging"""
    print(f"\n{'=' * 50}")
    print(f"Request: {request.method} {request.path}")
    print(f"Headers: {dict(request.headers)}")
    if request.is_json:
        print(f"JSON Body: {request.get_json()}")
    print(f"{'=' * 50}\n")


@app.route("/chat", methods=["POST", "OPTIONS"])
def chat():
    # Handle CORS preflight
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200

    try:
        print(f"Received request: {request.method} {request.path}")

        data = request.get_json()
        print(f"Request data: {data}")

        if not data:
            print("No data received in request")
            return jsonify({"error": "No data received"}), 400

        user_message = data.get("message", "")
        print(f"User message: {user_message}")

        if not user_message.strip():
            return jsonify({"reply": "Please type something."})

        print("Calling chat_with_gemini...")
        gemini_reply = chat_with_gemini(user_message)
        print(f"Got reply from Gemini: {gemini_reply[:100]}...")

        return jsonify({"reply": gemini_reply})

    except Exception as e:
        import traceback
        print(f"Error in /chat endpoint: {str(e)}")
        print(f"Traceback: {traceback.format_exc()}")
        error_message = str(e)

        # Provide user-friendly error messages
        if "API key" in error_message or "authentication" in error_message.lower():
            return jsonify({"error": "API authentication failed. Please check your API key."}), 500
        elif "quota" in error_message.lower() or "rate limit" in error_message.lower():
            return jsonify({"error": "API quota exceeded. Please try again later."}), 500
        else:
            return jsonify({"error": f"An error occurred: {error_message}"}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5001)
