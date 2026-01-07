# Full-Stack Sudoku Solver

A clean, responsive web application that solves any valid Sudoku puzzle in real-time. This project integrates a **Recursive Backtracking algorithm** (Python) with a modern **React** frontend, deployed as a serverless application.

🔗 **[Live Demo](https://your-vercel-link-here.vercel.app)** *(Replace with your actual Vercel link)*

## 🚀 Features

* **Recursive Backtracking Algorithm:** Solves complex puzzles efficiently using a Python-based Depth-First Search approach.
* **Real-Time Validation:** Instantly solves valid grids and detects unsolvable board states.
* **Smart UI:** Distinguishes between user inputs (White) and the computer's generated solution (Green).
* **Responsive Design:** Fully centered, dark-themed grid built with **Tailwind CSS**.
* **Serverless Architecture:** Backend runs as an on-demand Python function via Vercel.

## 🛠️ Tech Stack

* **Frontend:** React, Vite, Tailwind CSS
* **Backend:** Python 3.9, Flask (REST API)
* **Deployment:** Vercel (Serverless Functions)

## 📂 Project Structure

```text
sudoku-solver/
├── api/                  # Python Backend (Flask)
│   └── index.py          # Solver Logic & API Endpoint
├── src/                  # React Frontend
│   ├── components/       # UI Components (SudokuGrid.jsx)
│   └── App.jsx           # Main Entry Point
├── vercel.json           # Serverless Routing Config
└── requirements.txt      # Python Dependencies

## ⚡ How to Run Locally

To run this project on your machine, you need to start both the Frontend (React) and Backend (Python) servers.

### 1. Clone the repository
```bash
git clone [https://github.com/YOUR_USERNAME/sudoku-solver.git](https://github.com/YOUR_USERNAME/sudoku-solver.git)
cd sudoku-solver

### 2. Setup Frontend
```bash
npm install
npm run dev

### 3. Setup Backend
Open a new terminal window:
```bash
# Optional: Create a virtual environment
# python -m venv venv
# source venv/bin/activate  (Mac/Linux) or venv\Scripts\activate (Windows)

pip install -r requirements.txt
python api/index.py

### 4. Connect
The project is configured with a local proxy in `vite.config.js`. Requests made to `/api/solve` from the frontend will automatically forward to the Python backend at port 5000.