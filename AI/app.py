import json

from flask import Flask, request
from llama_index.llms.ollama import Ollama

app = Flask(__name__)


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

    return json.loads(str('''{
  "description": "Arthur, a seasoned MI6 agent, and Camberra, a brilliant cryptanalyst, have been assigned to unravel the mystery behind the 'Venus Project'. Rumors suggest that this project possesses a powerful weapon capable of disrupting global communications and potentially leading to chaos. The duo must race against time to decipher the encrypted messages exchanged between the project's masterminds before it's too late.",
  "scenes": [
    {
      "characters": [
        "Arthur",
        "Camberra"
      ],
      "description": "Arthur and Camberra meet for the first time to exchange information and plan their approach. They are unaware that they are being watched closely by an enemy operative named Raven. As they discuss the details of the Venus Project, Arthur notices a suspicious man skulking around outside, but Camberra brushes it off as mere coincidence. They leave with a renewed sense of urgency and make their way to the rendezvous point.",
      "location": "A quaint, dimly lit café nestled in a quiet corner of the city.",
      "name": "The Encounter at the Café"
    },
    {
      "characters": [
        "Arthur",
        "Camberra",
        "Raven"
      ],
      "description": "Arthur and Camberra enter the decryption chamber, where they face a series of complex puzzles and ciphers designed to protect the Venus Project's secrets. They work tirelessly to unravel each layer of encryption until they finally reach the heart of the project: a doomsday device capable of causing untold damage. As they celebrate their success, they are ambushed by Raven and her team. A fierce battle ensues, testing Arthur and Camberra's skills and wits.",
      "location": "A hidden underground laboratory filled with state-of-the-art technology and encrypted messages.",
      "name": "The Decryption Chamber"
    },
    {
      "characters": [
        "Arthur",
        "Camberra"
      ],
      "description": "With Raven and her team hot on their heels, Arthur and Camberra must navigate a series of deadly traps and obstacles in order to escape. They manage to outwit their pursuers, but not before Arthur is gravely injured. As they make their way back to MI6 headquarters, they realize that the Venus Project's masterminds are more cunning and ruthless than they had anticipated.",
      "location": "A dark, damp tunnel leading out of the decryption chamber.",
      "name": "The Escape from the Laboratory"
    }
  ],
  "title": "The Cipher's Conundrum"
}'''))

    llm = Ollama(model="mistral", request_timeout=900.0)
    response = llm.complete(defaultPrompt)

    return json.loads(str(response))


if __name__ == "__main__":
    app.run(port=5000, debug=True)