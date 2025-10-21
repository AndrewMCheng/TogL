export function getTodaySeedNumber() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');

  const dateStr = `${yyyy}-${mm}-${dd}`;

  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = dateStr.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  return Math.abs(hash);
}

export function generateLightsOutSeed(size = 6, seed = null) {

  function mulberry32(a) {
    return function () {
      let t = a += 0x6D2B79F5;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
  }

  let randomFunc = Math.random;
  if (seed !== null) {
    randomFunc = mulberry32(seed);
  }

  const board = [];
  for (let i = 0; i < size * size; i++) {
    board.push(randomFunc() < 0.5 ? 0 : 1);
  }
  return board;
}

export function generateRealLightsOutSeed(seed) {
  const n = Math.sqrt(seed.length);
  const result = new Array(seed.length).fill(1); 

  for (let i = 0; i < seed.length; i++) {
    if (seed[i] === 1) {
      const row = Math.floor(i / n);
      const col = i % n;

      const toggle = (r, c) => {
        if (r < 0 || r >= n || c < 0 || c >= n) return;
        const idx = r * n + c;
        result[idx] = result[idx] === 1 ? 0 : 1; 
      };

      toggle(row, col);
      toggle(row - 1, col);
      toggle(row + 1, col);
      toggle(row, col - 1);
      toggle(row, col + 1);
    }
  }

  return result;
}





