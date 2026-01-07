from flask import Flask, request, jsonify
from flask_cors import CORS
from api.index import solve 

app = Flask(__name__)
CORS(app)

@app.route('/solve', methods=['POST'])
def solve_sudoku():
    data = request.get_json() 
    board = data['board']
    
    if solve(board):
        return jsonify({"solution": board, "status": "solved"})
    else:
        return jsonify({"status": "unsolvable"}), 400

if __name__ == '__main__':
    app.run(debug=True)