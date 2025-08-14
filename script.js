// Texto con efecto “máquina de escribir”
const target = document.getElementById('type-target');
const cursor = document.querySelector('.cursor');
const phrase = 'Te amo Meli, muchísimo mi vida hermosa';
const typeSpeed = 65;      // ms por carácter
const holdTime = 1600;     // pausa al terminar de escribir
const eraseSpeed = 38;     // ms por carácter al borrar

async function typeText(text){
  target.textContent = '';
  for (let i = 0; i < text.length; i++){
    target.textContent += text[i];
    await sleep(typeSpeed);
  }
}
async function eraseText(){
  const text = target.textContent;
  for (let i = text.length; i > 0; i--){
    target.textContent = text.slice(0, i - 1);
    await sleep(eraseSpeed);
  }
}
function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

async function loopTypewriter(){
  while(true){
    await typeText(phrase);
    await sleep(holdTime);
    await eraseText();
    await sleep(400);
  }
}
loopTypewriter();

// Generador de corazones
const heartsLayer = document.getElementById('hearts');
const btnMore = document.getElementById('more');

const MAX_HEARTS = 100;      // límite para no saturar
let liveHearts = 0;

// Crear un corazón
function createHeart(x = null, y = null){
  if (liveHearts >= MAX_HEARTS) return;

  const span = document.createElement('div');
  span.className = 'heart';

  // Aleatorios bonitos
  const size = rand(16, 44);           // px
  const hue = Math.random() < 0.5 ? 342 : 8; // tonos rosados/rojo
  const col = `hsl(${hue}, 90%, ${rand(55, 72)}%)`;
  const rot = `${rand(-25, 25)}deg`;
  const dur = `${rand(7, 14)}s`;

  // Posición inicial
  const startX = (x ?? rand(0, window.innerWidth)) - size / 2;
  const startY = (y ?? window.innerHeight + 20);

  span.style.left = `${startX}px`;
  span.style.top = `${startY}px`;
  span.style.setProperty('--size', `${size}px`);
  span.style.setProperty('--rot', rot);
  span.style.setProperty('--dur', dur);
  span.style.setProperty('--col', col);

  // Contenido del corazón (emoji para compatibilidad total)
  const inner = document.createElement('span');
  inner.textContent = '❤';
  span.appendChild(inner);

  heartsLayer.appendChild(span);
  liveHearts++;

  // Remover al terminar
  span.addEventListener('animationend', () => {
    span.remove();
    liveHearts--;
  }, { once:true });
}

// Utilidades
function rand(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min; }

// Lluvia inicial de corazones
for (let i = 0; i < 30; i++){
  setTimeout(() => createHeart(), i * 120);
}

// Más corazones con el botón
btnMore.addEventListener('click', () => {
  for (let i = 0; i < 16; i++){
    setTimeout(() => createHeart(), i * 70);
  }
});

// Corazones donde hagas click/tap
window.addEventListener('pointerdown', (e) => {
  for (let i = 0; i < 10; i++){
    setTimeout(() => createHeart(e.clientX + rand(-30, 30), e.clientY + rand(-10, 10)), i * 35);
  }
});

// Bonus: un pequeño “chorro” continuo suave
let ticker = 0;
function tick(){
  ticker++;
  if (ticker % 14 === 0){ createHeart(); }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
