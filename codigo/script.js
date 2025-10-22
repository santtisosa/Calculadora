const display = document.getElementById('display');

// Crear efecto de partículas
function createParticles(x, y, color) {
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '5px';
    particle.style.height = '5px';
    particle.style.background = color;
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.boxShadow = `0 0 10px ${color}`;

    document.body.appendChild(particle);

    const angle = (Math.PI * 2 * i) / 15;
    const velocity = 2 + Math.random() * 3;
    let posX = x;
    let posY = y;
    let opacity = 1;

    const animate = () => {
      posX += Math.cos(angle) * velocity;
      posY += Math.sin(angle) * velocity;
      opacity -= 0.02;

      particle.style.left = posX + 'px';
      particle.style.top = posY + 'px';
      particle.style.opacity = opacity;

      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        particle.remove();
      }
    };

    animate();
  }
}

// Animación de shake
function shakeElement(element) {
  element.style.animation = 'none';
  setTimeout(() => {
    element.style.animation = 'shake 0.5s ease';
  }, 10);
}

// Agregar animación de shake al CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
  @keyframes resultFlash {
    0%, 100% { background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%); }
    50% { background: linear-gradient(135deg, #ffd700 0%, #ff6b6b 50%, #f093fb 100%); }
  }
`;
document.head.appendChild(style);

function appendNumber(num) {
  display.value += num;
  addButtonFeedback(event);
}

function appendOperator(op) {
  if (display.value === '') return;
  const lastChar = display.value.slice(-1);
  if ("+-*/".includes(lastChar)) return;
  display.value += op;
  addButtonFeedback(event);
}

function clearDisplay() {
  display.value = '';
  const rect = display.getBoundingClientRect();
  createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, '#ff6b6b');
  addButtonFeedback(event);
}

function deleteChar() {
  display.value = display.value.slice(0, -1);
  addButtonFeedback(event);
}

function calculateResult() {
  try {
    const result = eval(display.value);
    display.style.animation = 'resultFlash 0.6s ease';
    setTimeout(() => {
      display.value = result;
      display.style.animation = 'neonFlicker 2s infinite';
    }, 300);

    const rect = display.getBoundingClientRect();
    createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, '#ffd700');
    addButtonFeedback(event);
  } catch (e) {
    display.value = "Error";
    shakeElement(display);
    const rect = display.getBoundingClientRect();
    createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, '#ff0000');
  }
}

function addButtonFeedback(event) {
  if (event && event.target) {
    const button = event.target;
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Determinar color basado en el botón
    let color = '#f093fb';
    if (button.classList.contains('equal')) {
      color = '#ffd700';
    } else if (button.classList.contains('zero')) {
      color = '#667eea';
    }

    createParticles(x, y, color);
  }
}

// Agregar listeners a todos los botones para feedback visual
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      addButtonFeedback(e);
    });
  });
});
