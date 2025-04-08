from flask import Flask, jsonify
import requests

app = Flask(__name__)

@app.route('/users')
def get_users():
    try:
        # Call the external API to generate users
        response = requests.get("https://randomuser.me/api/?results=75&nat=us,es,mx,br,fr,ca,gb")
        data = response.json()

        users = []

        for item in data["results"]:
            user = {
                "first_name": item["name"]["first"],
                "last_name": item["name"]["last"],
                "country": item["location"]["country"],
                "photo": item["picture"]["medium"]
            }
            users.append(user)

        return jsonify(users)

    except Exception as e:
        return jsonify({"error": "Could not fetch users", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
