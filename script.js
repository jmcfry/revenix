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
    { name: 'Street Import', description: 'Veicolo import perfetto per utilizzo quotidiano.', benefits: ['Import esclusivo', 'Assetto personalizzato', 'Consegna rapida'], price: '€ XX,XX' },
    { name: 'Track Elite', description: 'Configurazione sportiva per performance elevate.', benefits: ['Top speed boost', 'Wrap premium', 'Dettagli racing'], price: '€ XX,XX' }
  ] },
  casa: { title: 'Casa', subtitle: 'Soluzioni immobiliari premium per il tuo personaggio.', cards: [
    { name: 'Starter Property', description: 'Casa base arredata per iniziare subito.', benefits: ['1 proprietà', 'Arredo base', 'Setup veloce'], price: '€ XX,XX' },
    { name: 'Luxury Estate', description: 'Residenza avanzata con servizi esclusivi.', benefits: ['Villa premium', 'Garage esteso', 'Interiors esclusivi'], price: '€ XX,XX' }
  ] },
  fazioni: { title: 'Fazioni', subtitle: 'Supporta la tua organizzazione con pacchetti dedicati.', cards: [
    { name: 'Faction Kit', description: 'Pacchetto base per sviluppo fazione.', benefits: ['Bundle logistico', 'Boost organizzativo', 'Setup rapido'], price: '€ XX,XX' },
    { name: 'Faction Elite', description: 'Upgrade completo per fazioni avanzate.', benefits: ['Assets premium', 'Supporto dedicato', 'Perk esclusivi'], price: '€ XX,XX' }
  ] },
  armi: { title: 'Armi', subtitle: 'Contenuti cosmetici e bundle accessori in linea col regolamento.', cards: [
    { name: 'Weapon Visual Pack', description: 'Set estetico armi in tema Revenix.', benefits: ['Skin premium', 'Colori esclusivi', 'Varianti neon'], price: '€ XX,XX' },
    { name: 'Tactical Upgrade', description: 'Pacchetto utility per loadout avanzato.', benefits: ['Set accessori', 'Preset tattico', 'UI weapon perks'], price: '€ XX,XX' }
  ] },
  soldi: { title: 'Soldi', subtitle: 'Pacchetti economici bilanciati per progressione RP.', cards: [
    { name: 'Economy Start', description: 'Boost iniziale per attività lecite.', benefits: ['Capitale base', 'Utility pack', 'Bonus settimanale'], price: '€ XX,XX' },
    { name: 'Economy Pro', description: 'Pacchetto espansione business avanzato.', benefits: ['Fondo premium', 'Perks business', 'Supporto crescita'], price: '€ XX,XX' }
  ] },
  'multi-pg': { title: 'Multi-PG', subtitle: 'Aggiungi nuovi personaggi e amplia la tua esperienza narrativa.', cards: [
    { name: 'Slot +1', description: 'Un personaggio extra con attivazione rapida.', benefits: ['1 slot aggiuntivo', 'Attivazione fast', 'Supporto setup'], price: '€ XX,XX' },
    { name: 'Slot +2', description: 'Flessibilità totale con due personaggi extra.', benefits: ['2 slot aggiuntivi', 'Priorità attivazione', 'Gestione avanzata'], price: '€ XX,XX' }
  ] },
  boost: { title: 'Boost', subtitle: 'Pacchetti boost per accelerare progressione e sviluppo RP.', cards: [
    { name: 'Progress Boost', description: 'Incremento progressione attività e obiettivi.', benefits: ['Boost XP', 'Durata estesa', 'Attivazione immediata'], price: '€ XX,XX' },
    { name: 'Business Boost', description: 'Pacchetto dedicato a imprese e attività.', benefits: ['Bonus produttività', 'Perks economici', 'Supporto premium'], price: '€ XX,XX' }
  ] }
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
        <h3>${card.name}</h3>
        <p>${card.description}</p>
        <ul>${card.benefits.map((item) => `<li>◆ ${item}</li>`).join('')}</ul>
        <p class="shop-price">Prezzo: ${card.price}</p>
        <a class="btn btn-small shop-buy" href="https://paypal.me/danielenooo" target="_blank" rel="noopener noreferrer">Acquista</a>
      </article>
    `
    )
    .join('');

  return `${head}<div class="shop-cards">${cards}</div>`;
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
    shopSidebar.style.setProperty('--active-index', '0');
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
