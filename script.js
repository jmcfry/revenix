const reveals = document.querySelectorAll('.reveal');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-links a');
const navbar = document.querySelector('.navbar');
const heroContent = document.querySelector('.hero-content');

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

if (navbar) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 18;
    navbar.style.boxShadow = scrolled ? '0 10px 30px rgba(0,0,0,0.35)' : 'none';
  });
}

if (heroContent) {
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  window.addEventListener('mousemove', (event) => {
    targetX = (event.clientX / window.innerWidth - 0.5) * 10;
    targetY = (event.clientY / window.innerHeight - 0.5) * 8;
  });

  const animateParallax = () => {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    heroContent.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
    requestAnimationFrame(animateParallax);
  };

  animateParallax();
}

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
const shopSidebar = document.querySelector('.shop-sidebar');

const shopData = {
  supporter: {
    title: 'Supporter',
    subtitle: 'Pacchetti ufficiali Revenix RP per supportare il server e sbloccare vantaggi premium.',
    cards: [
      {
        name: 'Supporter Argento',
        description: 'Pacchetto ideale per iniziare a supportare la community Revenix RP.',
        benefits: [
          'Sistema PED senza limiti',
          'Ruolo Supporter su Discord',
          'Accesso market privato',
          'Giveaway esclusivi',
          'Assistenza prioritaria',
          'Canali Discord riservati',
          'Contatto diretto con staff',
          'Accesso anticipato spoiler'
        ],
        price: '€30'
      },
      {
        name: 'Supporter Oro',
        description: 'Include tutti i vantaggi Argento con bonus premium aggiuntivi.',
        benefits: [
          'Tutti i vantaggi Argento',
          'Multi-PG (2 personaggi)',
          'Veicolo Import esclusivo',
          'Targa personalizzata',
          'Bonus denaro in-game',
          'Priorità su case e attività',
          'Priority Queue',
          'Area VIP Discord',
          'Accesso anticipato completo'
        ],
        price: '€75'
      },
      {
        name: 'Supporter Diamante',
        description: 'Il pacchetto top per un’esperienza completa e massima priorità.',
        benefits: [
          'Tutti i vantaggi Oro',
          'Multi-PG (3 personaggi)',
          'Bonus $2.000.000',
          'Villa o attività inclusa',
          '2 veicoli Import full upgrade',
          'Targhe illimitate',
          'Accesso immediato server (priority 0)',
          'Supporto diretto amministrazione',
          'Accesso contenuti alpha'
        ],
        price: '€125'
      }
    ]
  },
  veicoli: { title: 'Veicoli', subtitle: 'Pacchetti dedicati alla mobilità premium e agli import esclusivi.', cards: [
    { name: '1', description: 'BMW.', benefits: ['Veicolo import', 'Kit prestazioni al massimo', 'Consegna rapida'], price: '€ XX,XX' },
    { name: '2', description: 'LAMBORGHINI.', benefits: ['Veicolo import', 'Kit prestazioni al massimo', 'Consegna rapida'], price: '€ XX,XX' }
  ] },
  casa: { title: 'Casa', subtitle: 'Soluzioni immobiliari premium per il tuo personaggio.', cards: [
    { name: 'Starter Property', description: 'Casa base arredata per iniziare subito.', benefits: ['1 proprietà', 'Arredo base', 'Setup veloce'], price: '€ XX,XX' },
    { name: 'Luxury Estate', description: 'Residenza avanzata con servizi esclusivi.', benefits: ['Villa premium', 'Garage esteso', 'Interiors esclusivi'], price: '€ XX,XX' }
  ] },
  fazioni: {
    title: 'Fazioni',
    subtitle: 'Pacchetti fazione convertiti in formato shop professionale e ordinato.',
    cards: [
      {
        name: 'Pack Base',
        description: 'Essenziale per avvio operativo della fazione.',
        benefits: ['7 Pistole 9mm', '500 colpi', '150.000 soldi puliti'],
        price: '€18'
      },
      {
        name: 'Pack Elite',
        description: 'Upgrade intermedio con dotazione estesa.',
        benefits: ['13 Pistole 9mm', '1500 colpi', '5 giubbotti antiproiettile', '300.000 soldi puliti'],
        price: '€32'
      },
      {
        name: 'Pack Supreme',
        description: 'Pacchetto avanzato per operazioni ad alta intensità.',
        benefits: ['20 Pistole 9mm', '3500 colpi', '10 giubbotti antiproiettile', '5 silenziatori', '500.000 soldi puliti', '150.000 soldi sporchi'],
        price: '€50'
      },
      {
        name: 'Pack Deluxe',
        description: 'Versione completa con bonus veicolo incluso.',
        benefits: ['20 Pistole 9mm', '4000 colpi', '10 giubbotti antiproiettile', '8 silenziatori', '500.000 soldi puliti', '200.000 soldi sporchi', 'Auto a scelta (<40€)'],
        price: '€75'
      }
    ]
  },
  armi: {
    title: 'Armi',
    subtitle: 'Pack Pistole 9mm con prezzi ottimizzati e scontistiche progressive.',
    note: 'Le armi acquistate seguono le regole del server. In caso di perdita o sequestro, non è previsto rimborso.',
    cards: [
      { name: 'Pack Pistole 9mm - 5 unità', description: 'Dotazione base per utilizzo iniziale.', benefits: ['5 pistole 9mm', 'Costo totale: €10'], price: '€10' },
      { name: 'Pack Pistole 9mm - 10 unità', description: 'Formato convenienza con riduzione prezzo.', benefits: ['10 pistole 9mm', 'Sconto 10%'], price: '€18' },
      { name: 'Pack Pistole 9mm - 15 unità', description: 'Pacchetto avanzato con sconto maggiorato.', benefits: ['15 pistole 9mm', 'Sconto 15%'], price: '€25' },
      { name: 'Pack Pistole 9mm - 20 unità ★ Best Value', description: 'Miglior rapporto quantità/prezzo.', benefits: ['20 pistole 9mm', 'Best Value'], price: '€33' }
    ]
  },
  soldi: {
    title: 'Soldi',
    subtitle: 'Pacchetti visuali denaro in-game con consegna immediata.',
    cards: [
      {
        name: 'Pack Soldi 1',
        amount: '100.000$ ',
        image: 'pack_soldi1.png',
        description: 'Pacchetto ingresso per iniziare la tua economia RP.',
        benefits: ['Consegna rapida in-game'],
        price: '€10'
      },
      {
        name: 'Pack Soldi 2',
        amount: '350.000$ ',
        image: 'pack_soldi2.png',
        description: 'Pacchetto intermedio per accelerare attività e progressione.',
        benefits: ['Boost economico bilanciato'],
        price: '€20'
      },
      {
        name: 'Pack Soldi 3',
        amount: '750.000$ ',
        image: 'pack_soldi3.png',
        description: 'Pacchetto avanzato per espansione business e RP.',
        benefits: ['Ideale per investimenti maggiori'],
        price: '€35'
      },
      {
        name: 'Pack Soldi 4',
        amount: '1.500.000$ ',
        image: 'pack_soldi4.png',
        description: 'Il pacchetto più completo per massimizzare la progressione.',
        benefits: ['Massimo valore disponibile'],
        price: '€50',
        badge: 'Best Value'
      }
    ]
  },
  'multi-pg': {
    title: 'Multi-PG',
    subtitle: 'Aggiungi nuovi personaggi e amplia la tua esperienza narrativa o scegli il tuo personaggio ideale.',
    cards: [
      {
        name: 'Slot +1',
        description: 'Pack PED.',
        benefits: ['Scelta di un personaggio ideale'],
        price: '€50,00'
      },
      {
        name: 'Slot +1',
        description: 'Nuovo slot PG.',
        benefits: ['1 slot aggiuntivo nuovo PG'],
        price: '€20,00'
      }
    ]
  }
};

function panelMarkup(data) {
  const head = `
    <div class="shop-panel-head">
      <h3 class="shop-panel-title">${data.title}</h3>
      <p class="shop-panel-sub">${data.subtitle}</p>
    </div>
  `;

  const cards = data.cards
    .map(
      (card) => `
      <article class="shop-item">
        ${card.badge ? `<span class="shop-badge">${card.badge}</span>` : ''}
        <h3>${card.name}</h3>
        ${card.image ? `<div class="shop-image-wrap"><img class="shop-image" src="${card.image}" alt="${card.name}" loading="lazy" /></div>` : ''}
        ${card.amount ? `<p class="shop-amount">${card.amount}</p>` : ''}
        <p>${card.description}</p>
        <ul>${card.benefits.map((item) => `<li>◆ ${item}</li>`).join('')}</ul>
        <p class="shop-price">Prezzo: ${card.price}</p>
        <a class="btn btn-small shop-buy" href="https://paypal.me/danielenooo" target="_blank" rel="noopener noreferrer">Acquista</a>
      </article>
    `
    )
    .join('');

  const note = data.note ? `<p class="shop-placeholder">${data.note}</p>` : '';
  return `${head}<div class="shop-cards">${cards}</div>${note}`;
}

function renderShop(section, animate = true) {
  if (!shopPanel || !shopData[section]) return;
  const html = panelMarkup(shopData[section]);

  if (!animate) {
    shopPanel.innerHTML = html;
    return;
  }

  shopPanel.classList.add('panel-leave');
  setTimeout(() => {
    shopPanel.innerHTML = html;
    shopPanel.classList.remove('panel-leave');
    shopPanel.classList.add('panel-enter');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => shopPanel.classList.remove('panel-enter'));
      });
    });
  }, 240);
}

if (shopTabs.length && shopPanel) {
  renderShop('supporter', false);

  shopTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      shopTabs.forEach((item) => item.classList.remove('active'));
      tab.classList.add('active');
      if (shopSidebar) {
        shopSidebar.style.setProperty('--active-index', index.toString());
      }
      renderShop(tab.dataset.shop, true);
    });
  });

if (shopSidebar) {
  const tabRect = tab.getBoundingClientRect();
  const sidebarRect = shopSidebar.getBoundingClientRect();

  const offset = tabRect.top - sidebarRect.top;

  shopSidebar.style.setProperty('--active-offset', `${offset}px`);
}
}

document.querySelectorAll('.btn, .shop-tab, .card').forEach((element) => {
  element.addEventListener('click', (event) => {
    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    const rect = element.getBoundingClientRect();
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
});

const canvas = document.getElementById('bg-canvas');

if (canvas) {
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
      if (this.y < -10 || this.x < -20 || this.x > canvas.width + 20) this.reset();
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 159, 26, ${this.alpha})`;
      ctx.shadowBlur = 13;
      ctx.shadowColor = 'rgba(255, 122, 0, 0.85)';
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const distance = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
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
    for (let i = 0; i < particleCount; i += 1) particles.push(new Particle());
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
}
