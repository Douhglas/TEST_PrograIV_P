# UNIVERSIDAD NACIONAL

**Sede Regional Brunca**  
**EIF209 Programación IV**  
**Prof. Ruben Mora Vargas – Prof. Juan Gamboa Abarca**

## Examen 1 – Aplicación Web con React, Remix y Flask

## 📘 Descripción del proyecto

Este proyecto consiste en una aplicación web construida con React 18, Remix y TypeScript que permite visualizar, filtrar, ordenar y eliminar usuarios provenientes de una API desarrollada en Flask. Se diseñó siguiendo principios de rendimiento, buena experiencia de usuario, y separación de responsabilidades. La aplicación presenta los datos en una tabla dinámica, con soporte para filtrado por país, ordenamiento por columnas y restauración del estado original sin volver a consultar el backend.


## 📋 Integrantes

- 👤 Brayan Carmona Garro  
- 👤 Douglas Ramírez Morales  
- 👤 Jazmín Gamboa Chacón  
- 👤 Joshua Elizondo Abarca  
- 👤 Noemí Murillo Godínez  



## ⚙️ Instrucciones de instalación

### 💻 Frontend (React + Remix)

1. 📂 Estar ubicado en la raíz del proyecto.  
2. 📦 Instalar dependencias:
   ```bash
   npm install
   ```
3. 🚀 Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```

### 🐍 Backend (Flask)

1. 📁 Ingresar a la carpeta del backend:
   ```bash
   cd flask-backend
   ```
2. ▶️ Ejecutar el servidor:
   ```bash
   python app.py
   ```

### ❗ Si aparece el error:
`ModuleNotFoundError: No module named 'flask'`

📌 Ejecutar los siguientes comandos:
```bash
python -m pip install flask
python -m pip install flask-cors
python -m pip show flask
python app.py
```



## 🧠 ¿Qué técnica se utilizó para manejar el estado y por qué?

La gestión del estado en esta aplicación se abordó utilizando `useState` para variables locales como `sortState` (ordenamiento) y `filterText` (filtro por país). Estas permiten controlar la interacción directa del usuario con la tabla.

El hook `useUsers` centraliza la obtención de datos desde el backend y gestiona el estado asincrónico: usuarios, carga (`loading`) y errores (`error`). Esto mejora la modularidad y reutilización del código.

Adicionalmente, se empleó el hook `useSortedAndFilteredUsers`, que combina ordenamiento y filtrado aplicando `useMemo` para evitar recálculos y `useDebounce` para mejorar el rendimiento durante la escritura en el input de búsqueda.



## 🚀 ¿Cómo se evitó el re-renderizado y los cálculos innecesarios?

Se aplicaron distintas estrategias para optimizar el rendimiento:

### ✅ 1. Memorización con `useMemo`

Se usó para ordenar y filtrar usuarios sin recalcular mientras no cambien las dependencias (`sortState`, `filterText`).

### ✅ 2. Funciones estables con `useCallback`

`handleDelete` y `handleSort` fueron memorizadas para evitar renders innecesarios en componentes hijos.

### ✅ 3. `React.memo` en componentes

Aplicado a `UserRow` y `UserTable` para evitar renders si sus props no cambian.

### ✅ 4. `useDebounce` en la búsqueda

Permite ejecutar el filtro solo después de una pausa en la escritura del usuario, reduciendo el numero de peticiones.



## ⚠️ ¿Cómo se organizó la lógica de carga y manejo de errores?

La lógica de carga y errores se encapsuló en el hook `useUsers`. Este se encarga de realizar el `fetch` al backend Flask, guardar los resultados y manejar distintos tipos de fallos (respuesta inválida, error de red, estructura inesperada). El componente principal muestra un mensaje personalizado mientras se carga (`<Loading />`) o en caso de error (`<ErrorMessage />`).



## 🧾 ¿Qué decisiones se tomaron respecto a la estructura y tipado de los datos?

Se definió una interfaz `User` con propiedades estrictamente tipadas: `id`, `firstName`, `lastName`, `photo`, `country`. Esto permitió validar el tipo de cada elemento desde el backend hasta la vista, reduciendo errores y mejorando el autocompletado en el desarrollo con TypeScript.



## 🎯 ¿Cómo se garantizó que la experiencia del usuario fuera fluida?

Se cuidó que la aplicación respondiera sin retrasos perceptibles. Se mostraron mensajes claros durante la carga y en caso de error, se usaron estilos diferenciados para filas alternas, y se implementó el debounce en el filtro para evitar saltos o bloqueos al escribir. También se evitó recargar datos innecesariamente.



## 🌍 ¿Cómo se hizo el deploy, dónde y cuál es la URL?

El backend en Flask fue desplegado en [Render.com](https://render.com), mientras que el frontend fue desplegado en [Vercel](https://vercel.com) y configurado para responder desde un dominio accesible públicamente.

🔗 **URL de la aplicación:** [https://tu-dominio.vercel.app](https://tu-dominio.vercel.app) *(actualizar con el real)*



## 📬 Entrega

Este repositorio fue compartido con la cuenta del profesor **RubenMoraAI** en GitHub y el enlace fue enviado al correo oficial.


## 🎓 Conclusión y aprendizajes del grupo

Este proyecto nos permitió aprender a trabajar de forma colaborativa, distribuyendo responsabilidades y respetando el trabajo individual de cada miembro. Aplicamos buenas prácticas como el control de errores y estados de carga visibles, lo cual mejora la experiencia del usuario, especialmente en condiciones de red lentas.

También aprendimos sobre diseño responsivo, implementación de temas claro/oscuro, modularidad del código y despliegue tanto del frontend como del backend. Se hizo uso de useMemo, useCallback, y React.memo para optimizar el rendimiento, así como de hooks personalizados y componentes funcionales para promover la reutilización del código.

Finalmente, se implementó un sistema de caché para restaurar el estado original de la tabla sin tener que volver a llamar al backend, lo que consolidó nuestra comprensión sobre el manejo eficiente del estado y la separación de responsabilidades en aplicaciones web modernas.
