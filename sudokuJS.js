const board = document.getElementById('sudoku-board');
const inputs = board.querySelectorAll('.sudoku-input');

function fillSudokuBoard() {
    const sudoku = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    // fill input fields with sudoku array
    for (let i = 0; i < sudoku.length; i++) {
        for (let j = 0; j < sudoku[i].length; j++) {
            const index = i * sudoku[i].length + j;
            const input = inputs[index];
            input.value = sudoku[i][j];
        }
    }
}

function solveSudoku() {
    const sudoku = [];
    
    // fill sudoku array with input values
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        const value = input.value.trim();
        sudoku.push(value !== '' ? parseInt(value) : 0);
    }
    
    if (solve(0, 0, sudoku, inputs)) {
        console.log('Puzzle solved!');
    } else {
        alert('No solution found for the puzzle!');
    }
}

function solve(row, col, sudoku, inputs) {
    // all rows filled so soduko solved
    if (row === 9) {
        return true; 
    }
  
    const nextRow = col === 8 ? row + 1 : row; // if last column, move by rows else stay at the same row
    const nextCol = (col + 1) % 9; // if not last column, move by columns
  
    // if sudoku input not equal zero, move to next row and column
    if (sudoku[row * 9 + col] !== 0) {
        return solve(nextRow, nextCol, sudoku, inputs); 
    }
  
    for (let num = 1; num <= 9; num++) {
        if (isValid(row, col, num, sudoku)) {
            // if valid num then fill sudoku and input with it
            sudoku[row * 9 + col] = num;
            inputs[row * 9 + col].value = num;
            
            // backtrack
            if (solve(nextRow, nextCol, sudoku, inputs)) {
                return true; 
            }
            
            // if not valid then fill input with empty space and sudoku array with 0
            sudoku[row * 9 + col] = 0; 
            inputs[row * 9 + col].value = ''; 
        }
    }
  
    return false; 
}

function isValid(row, col, num, sudoku) {
    // check if number in found in same row or column
    for (let i = 0; i < 9; i++) {
        if (sudoku[row * 9 + i] === num || sudoku[i * 9 + col] === num) {
            return false; // not valid
        }
    }

    //check in 3*3 grid by getting start row and column
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (sudoku[i * 9 + j] === num) {
                return false; // not valid
            }
        }
    }

    return true; // valid
}