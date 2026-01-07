from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def print_board(bo):
    for i in range(len(bo)):
        if i % 3 == 0 and i != 0:
            print("- - - - - - - - - - - - - -")
        for j in range(len(bo[0])):
            if j % 3 == 0 and j != 0:
                print("|", end="")
            if j == 8:
                print(bo[i][j])
            else:
                print(bo[i][j], end="")


def find_empty(bo):
    for i in range(len(bo)):
        for j in range(len(bo[0])):
            if bo[i][j] == 0:
                return (i,j)
    return None

def valid(bo, num, pos):
    for i in range(len(bo[0])):
        if bo[pos[0]][i] == num and i != pos[1]:
            return False
        
    for i in range(len(bo)):
        if bo[i][pos[1]] == num and i != pos[0]:
            return False
        
    box_y = pos[0] // 3
    box_x = pos[1] // 3
    for i in range(box_x*3, box_x*3 + 3):
        for j in range(box_y*3, box_y*3 + 3):
            if bo[j][i] == num and (j, i) != pos:
                return False
    return True

def solve(bo):
    found = find_empty(bo)
    if not found:
        return True
    else:
        (row, col) = found
    for i in range(1, 10):
        if valid(bo, i, (row, col)):
            bo[row][col] = i
            if solve(bo):
                return True
            bo[row][col] = 0
    return False

@app.route('/solve', methods=['POST'])
@app.route('/api/solve', methods=['POST']) 
def solve_sudoku():
    data = request.get_json()
    if not data or 'board' not in data:
       return jsonify({"error": "No board provided"}), 400
       
    board = data.get('board')
    
    if solve(board):
        return jsonify({"solution": board, "status": "solved"})
    else:
        return jsonify({"status": "unsolvable"}), 400

if __name__ == '__main__':
    app.run(debug=True)