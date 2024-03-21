import json

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello():
    return "Hello, World!"


@app.route('/generate', methods=['POST'])
def generate():
    # Get the data from the request
    data = request.json
    characters = data.get('characters')
    customPrompt = data.get('prompt')

    concatenated_names = ', '.join([' '.join(name.split()) for name in characters])

    defaultPrompt = "You are the game master of a role-playing game. Generate a scenario for me in the world of espionage. The scenario should contain keys as 'title', 'description' and 'scenes' . I want the scenario in JSON format. In the scenario the scene key should be an array, each element representing a scene. A scene has the following fields: 'characters', 'location', 'description', and 'name'. I only want a JSON format response. Choose from the following list the characters you want to include in the scenario:" + concatenated_names + ". For the description of each scene, detail each it with at least 100 words. You should generate at least 3 scenes in the scenario. Take this into account as well:" + customPrompt

    llm = Ollama(model="mistral", request_timeout=900.0)
    response = llm.complete(defaultPrompt)

    return json.loads(str(response))


if __name__ == "__main__":
    app.run(port=5000, debug=True)