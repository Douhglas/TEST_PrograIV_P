📋 Members:
+ Brayan Carmona Garro

+ Douglas Ramírez Morales

+ Jazmín Gamboa Chacón

+ Joshua Elizondo Abarca

+ Noemí Murillo Godínez

⚙️ Installation Instructions
While in the root directory of the project:

Install dependencies:
npm install

Start the development server:
npm run dev

🐍 Running the Flask Backend
To start the Flask development server:

Navigate to the flask-backend folder:
cd flask-backend

Run the backend server:
python app.py

🛠️ If You Encounter the Error:
ModuleNotFoundError: No module named 'flask'
Follow these steps to fix it:

1. Install Flask:
On Windows:

python -m pip install flask

2. Install Flask-CORS (for handling CORS requests):
python -m pip install flask-cors

3. Verify Flask is installed:
python -m pip show flask

4. Run the Flask server again:
python app.py