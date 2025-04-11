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

---

## 3. ¿Cómo se evitó el re-renderizado y los cálculos innecesarios?

Durante el desarrollo del proyecto, se aplicaron técnicas para mejorar el rendimiento y reducir cálculos innecesarios. A continuación, un resumen de las más importantes:

### 🔁 1. Memorización con useMemo

Se utilizó useMemo para evitar recomputaciones al ordenar o filtrar usuarios. Estas operaciones se ejecutan solo cuando cambian las dependencias (sortState, filterText) y se centralizaron en el hook useSortedAndFilteredUsers para mantener el código limpio.

### 🧠 2. Estabilidad con useCallback

handleDelete y handleSort fueron memorizadas con useCallback para evitar que cambien de referencia entre renders, lo que ayudó a prevenir re-renderizados en los componentes hijos.

### 🛡️ 3. React.memo en componentes

Se aplicó React.memo a UserRow y UserTable para evitar renders innecesarios cuando las props no cambian, optimizando el comportamiento de la tabla.

### 🔄 4. Debounce en el filtrado

El hook useDebounce permitió retrasar el filtrado hasta que el usuario deje de escribir, lo que evita múltiples actualizaciones rápidas del estado y mejora la UX.
