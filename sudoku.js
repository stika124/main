function generateValidFullSudoku() {
  function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
      const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const boxCol = 3 * Math.floor(col / 3) + i % 3;
      if (board[boxRow][boxCol] === num) return false;
    }
    return true;
  }

  function fill(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const nums = [1,2,3,4,5,6,7,8,9].sort(() => Math.random() - 0.5);
          for (let num of nums) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (fill(board)) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  fill(board);
  return board.flat().join('');
}

function removeCellsFromValidSudokuToValidSudoku(boardString, count) {
  function solve(board) {
    function isValid(board, row, col, num) {
      for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;
        const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const boxCol = 3 * Math.floor(col / 3) + i % 3;
        if (board[boxRow][boxCol] === num) return false;
      }
      return true;
    }

    function backtrack(board) {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === 0) {
            for (let num = 1; num <= 9; num++) {
              if (isValid(board, row, col, num)) {
                board[row][col] = num;
                if (backtrack(board)) return true;
                board[row][col] = 0;
              }
            }
            return false;
          }
        }
      }
      return true;
    }

    const copy = board.map(row => row.slice());
    return backtrack(copy);
  }

  let board = boardString.split('').map(n => parseInt(n)).reduce((acc, val, i) => {
    if (i % 9 === 0) acc.push([]);
    acc[acc.length - 1].push(val);
    return acc;
  }, []);

  let removed = 0;
  while (removed < count) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (board[row][col] !== 0) {
      const temp = board[row][col];
      board[row][col] = 0;
      const copy = board.map(r => r.slice());
      if (solve(copy)) {
        removed++;
      } else {
        board[row][col] = temp;
      }
    }
  }

  return board.flat().map(n => n === 0 ? '.' : n.toString()).join('');
}
