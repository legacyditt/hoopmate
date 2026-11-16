import { loadState, saveState } from './state.js';

// State utama aplikasi
const state = loadState();

// Inisialisasi aplikasi
function init() {
  saveState(state);
  console.log('HoopMate siap:', state);
}

init();