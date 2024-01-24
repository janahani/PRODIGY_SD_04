<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="sudokuCSS.css">
    <title>Sudoku Game</title>
</head>
<body>
    <h1>Sudoku Solver</h1>
    <div class="sudoku-board" id="sudoku-board">
        <?php for ($i = 0; $i < 81; $i++) { ?>
            <input type="number" class="sudoku-input" maxlength="1" readonly>
        <?php } ?>
    </div>
    <script src="sudokuJS.js"></script>
    <button class="solve" onclick="solveSudoku()">Solve</button>
    
    <script>
        window.onload = function() {
            fillSudokuBoard();
        };
    </script>
</body>
</html>

