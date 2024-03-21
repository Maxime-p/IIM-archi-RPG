from flask import Flask, request, jsonify
from markupsafe import escape
import pandas as pd
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, ServiceContext
from llama_index.llms.ollama import Ollama
from llama_index.core.storage.storage_context import StorageContext
from llama_index.vector_stores.qdrant import QdrantVectorStore
from llama_index.core import Settings
import qdrant_client
import json

app = Flask(__name__)


@app.route('/')
def hello():
    return "Hello, World!"

@app.route('/article/<int:id>')
def article(id):
    file_path = f'IA/datasets/data-{id}.txt'
    data = pd.read_csv(file_path, sep='\t', engine='python')
    return data.to_html()


@app.route('/api')
def get_api():
    return {
        "name": "scénario",
        "description": "une description de scénario",
        "scenes": [
            {
                "name": "un nom de scène",
                "place": "une place",
                "context": "un contexte",
                "characters": "un joueur",
            },
        ],
    }

@app.route('/generate', methods=['POST'])
def generate():
  # Get the data from the request
  data = request.json
  characters = data.get('characters')
  customPrompt = data.get('prompt')

  defaultPrompt = "Vous êtes le maître de jeu d'un jeu de rôle. Générez-moi un scénario dans le monde de l'espionnage. Je veux le scénario au format JSON. Je veux un tableau, chaque élément représentant une scène. Une scène a les champs suivants : 'personnages', 'lieu', 'description' et 'nom'. Je veux uniquement une réponse au format JSON. Choisissez dans la liste suivante les personnages que vous souhaitez inclure dans le scénario : 1, 2, 3, 4. Prends en compte ceci en plus:" + customPrompt + "Et ces personnages : " + characters

  llm = Ollama(model="mistral", request_timeout=900.0)
  response = llm.complete(defaultPrompt)

  return json.loads(str(response))