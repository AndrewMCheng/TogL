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

export function generateLightsOutSeed(seed = null) {
  
  function mulberry32(a) {
    return function() {
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
  for (let i = 0; i < 36; i++) {
    board.push(randomFunc() < 0.5 ? 0 : 1);
  }
  return board;
}



