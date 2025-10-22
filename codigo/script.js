const display = document.getElementById('display');
const calculator = document.querySelector('.calculator');

// Función para crear explosión de partículas
function createExplosion(event) {
  const button = event.target;
  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Crear 20 partículas
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Colores aleatorios vibrantes
    const colors = ['#ff6b35', '#f7931e', '#ffd700', '#4caf50', '#2196f3', '#9c27b0', '#e76565', '#ff1744'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];

    // Posición inicial en el centro del botón
    particle.style.left = centerX + 'px';
    particle.style.top = centerY + 'px';

    // Dirección aleatoria
    const angle = (Math.PI * 2 * i) / 20;
    const velocity = 100 + Math.random() * 100;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');

    document.body.appendChild(particle);

    // Animar partícula
    particle.style.animation = 'particle-explosion 0.6s ease-out forwards';

    // Remover después de la animación
    setTimeout(() => particle.remove(), 600);
  }

  // Animar el botón
  button.classList.add('button-explode');
  setTimeout(() => button.classList.remove('button-explode'), 300);

  // Shake de la calculadora
  calculator.classList.add('calculator-shake');
  setTimeout(() => calculator.classList.remove('calculator-shake'), 500);
}

// Agregar evento de explosión a todos los botones
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', createExplosion);
  });
});

function appendNumber(num) {
  display.value += num;
}

function appendOperator(op) {
  if (display.value === '') return;
  const lastChar = display.value.slice(-1);
  if ("+-*/".includes(lastChar)) return;
  display.value += op;
}

function clearDisplay() {
  display.value = '';
}

function deleteChar() {
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  try {
    display.value = eval(display.value);
  } catch (e) {
    display.value = "Error";
  }
}
