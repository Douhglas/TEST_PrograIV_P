from flask import Flask, jsonify
from flask_cors import CORS
import json
import random
import os

app = Flask(__name__)
CORS(app)

def load_users():
    with open('data/users.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
        return data["results"]

@app.route('/')
def home():
    return jsonify({"message": "La API está corriendo 🎉. Probá /api/users para obtener datos."})

@app.route('/api/users')
def get_users():
    all_users = load_users()
    random_users = random.sample(all_users, 75)
    return jsonify({"results": random_users})

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)