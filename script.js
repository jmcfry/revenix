const reveals = document.querySelectorAll('.reveal');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-links a');
const navbar = document.querySelector('.navbar');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 18;
  navbar.style.boxShadow = scrolled ? '0 10px 30px rgba(0,0,0,0.35)' : 'none';
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

reveals.forEach((section) => revealObserver.observe(section));

const shopTabs = document.querySelectorAll('.shop-tab');
const shopPanel = document.getElementById('shop-panel');

const shopData = {
  supporter: {
    title: 'Supporter',
    subtitle: 'Scegli il pacchetto premium più adatto al tuo percorso su Revenix RP.',
    cards: [
      {
        name: 'Supporter Argento',
        description: 'Pacchetto entry-level con vantaggi base e supporto prioritario community.',
        price: '€ XX,XX'
      },
      {
        name: 'Supporter Oro',
        description: 'Benefici estesi, accessi esclusivi e perks dedicati al gameplay RP.',
        price: '€ XX,XX'
      },
      {
        name: 'Supporter Diamante',
        description: 'Pacchetto top con priorità elevata, bonus premium e supporto dedicato.',
        price: '€ XX,XX'
      }
    ]
  },
  veicoli: { title: 'Veicoli', subtitle: 'Sezione in aggiornamento: presto disponibili pacchetti dedicati ai veicoli.' },
  casa: { title: 'Casa', subtitle: 'Sezione in aggiornamento: presto disponibili opzioni immobili e housing.' },
  fazioni: { title: 'Fazioni', subtitle: 'Sezione in aggiornamento: presto disponibili pacchetti fazione.' },
  armi: { title: 'Armi', subtitle: 'Sezione in aggiornamento: presto disponibili bundle armi e accessori.' },
  soldi: { title: 'Soldi', subtitle: 'Sezione in aggiornamento: presto disponibili pacchetti economici.' },
  'multi-pg': { title: 'Multi-PG', subtitle: 'Sezione in aggiornamento: presto disponibili slot personaggi aggiuntivi.' },
  boost: { title: 'Boost', subtitle: 'Sezione in aggiornamento: presto disponibili boost progressione.' }
};

function renderShop(section) {
  if (!shopPanel || !shopData[section]) return;

  const data = shopData[section];

  let html = `<h3 class="shop-panel-title">${data.title}</h3><p class="shop-panel-sub">${data.subtitle}</p>`;

  if (data.cards) {
    const cardsHtml = data.cards
      .map(
        (card) => `
          <article class="shop-item">
            <h3>${card.name}</h3>
            <p>${card.description}</p>
            <p class="shop-price">Prezzo: ${card.price}</p>
            <a class="btn btn-small" href="https://discord.gg/" target="_blank" rel="noopener noreferrer">Acquista</a>
          </article>
        `
      )
      .join('');

    html += `<div class="shop-cards">${cardsHtml}</div>`;
  } else {
    html += '<div class="shop-placeholder">Contenuto in arrivo. Resta aggiornato sul nostro Discord.</div>';
  }

  shopPanel.classList.remove('fade-in');
  shopPanel.innerHTML = html;
  requestAnimationFrame(() => shopPanel.classList.add('fade-in'));
}

if (shopTabs.length && shopPanel) {
  renderShop('supporter');

  shopTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      shopTabs.forEach((item) => item.classList.remove('active'));
      tab.classList.add('active');
      renderShop(tab.dataset.shop);
    });
  });
}

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
const particles = [];
const particleCount = 90;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.reset(true);
  }

  reset(firstSpawn = false) {
    this.x = Math.random() * canvas.width;
    this.y = firstSpawn ? Math.random() * canvas.height : canvas.height + Math.random() * 80;
    this.size = Math.random() * 2.3 + 0.6;
    this.speedY = Math.random() * 0.8 + 0.2;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.alpha = Math.random() * 0.45 + 0.2;
  }

  update() {
    this.y -= this.speedY;
    this.x += this.speedX;

    if (this.y < -10 || this.x < -20 || this.x > canvas.width + 20) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(200, 128, 255, ${this.alpha})`;
    ctx.shadowBlur = 13;
    ctx.shadowColor = 'rgba(232, 121, 249, 0.9)';
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function connectParticles() {
  for (let i = 0; i < particles.length; i += 1) {
    for (let j = i + 1; j < particles.length; j += 1) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.hypot(dx, dy);

      if (distance < 125) {
        const opacity = 1 - distance / 125;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 122, 0, ${opacity * 0.2})`;
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function initParticles() {
  particles.length = 0;
  for (let i = 0; i < particleCount; i += 1) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  connectParticles();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

resizeCanvas();
initParticles();
animate();
