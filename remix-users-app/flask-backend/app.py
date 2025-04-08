from flask import Flask, jsonify
from flask_cors import CORS
import json
import random

app = Flask(__name__)
CORS(app)

def load_users():
    # Cambiar 'data/users-simple.json' por 'data/users.json' para usar el otro archivo de datos 
    with open('data/users.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
        return data["results"]

@app.route('/api/users')
def get_users():
    all_users = load_users()
    random_users = random.sample(all_users, 75)
    return jsonify({"results": random_users})

if __name__ == '__main__':
    app.run(debug=True)