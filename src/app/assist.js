import { GRID_SIZE } from './Animations';
const SIZE = GRID_SIZE;
const N = SIZE * SIZE;
const idx = (r, c) => r * SIZE + c;

function buildToggleMatrix() {
  const A = Array.from({ length: N }, () => Array(N).fill(0));

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const i = idx(r, c);
      A[i][i] = 1;
      if (r > 0) A[idx(r, c)][idx(r - 1, c)] = 1;
      if (r < SIZE - 1) A[idx(r, c)][idx(r + 1, c)] = 1;
      if (c > 0) A[idx(r, c)][idx(r, c - 1)] = 1;
      if (c < SIZE - 1) A[idx(r, c)][idx(r, c + 1)] = 1;
    }
  }

  return A;
}

function solveGF2(A, b) {
  const matrix = A.map((row, i) => [...row, b[i]]);

  let row = 0;
  for (let col = 0; col < N; col++) {
    let sel = -1;
    for (let i = row; i < N; i++) {
      if (matrix[i][col] === 1) {
        sel = i;
        break;
      }
    }

    if (sel === -1) continue;

    [matrix[row], matrix[sel]] = [matrix[sel], matrix[row]];

    for (let i = 0; i < N; i++) {
      if (i !== row && matrix[i][col] === 1) {
        for (let j = col; j <= N; j++) {
          matrix[i][j] ^= matrix[row][j];
        }
      }
    }

    row++;
  }

  const x = new Array(N).fill(0);
  for (let i = 0; i < N; i++) {
    const pivot = matrix[i].findIndex((v, j) => v === 1 && j < N);
    if (pivot === -1) {
      if (matrix[i][N] !== 0) return null;
    } else {
      x[pivot] = matrix[i][N];
    }
  }

  return x;
}

export function solveLightsOut(inputBoard) {
  const b = inputBoard.flat().map(cell => cell ^ 1);

  const A = buildToggleMatrix();
  const solution = solveGF2(A, b);

  if (!solution) {
    console.log("No solution exists.");
    return null;
  }

  const pressBoard = [];
  for (let r = 0; r < SIZE; r++) {
    pressBoard.push(solution.slice(r * SIZE, (r + 1) * SIZE));
  }

  return pressBoard;
}
