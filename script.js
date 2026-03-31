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

if (navbar) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 18;
    navbar.style.boxShadow = scrolled ? '0 10px 30px rgba(0,0,0,0.35)' : 'none';
  });
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

const shopData = {
  supporter: {
    title: 'Supporter',
    subtitle: 'Pacchetti premium con vantaggi esclusivi e priorità community.',
    cards: [
      {
        name: 'Supporter Argento',
        description: 'Entry pack ideale per iniziare con bonus quality-of-life.',
        benefits: ['Tag Discord dedicato', 'Canale supporter', 'Priorità ticket base'],
        price: '€ XX,XX'
      },
      {
        name: 'Supporter Oro',
        description: 'Pacchetto avanzato con perks estesi e visibilità premium.',
        benefits: ['Tutti i vantaggi Argento', 'Slot evento prioritario', 'Benefit estetici esclusivi'],
        price: '€ XX,XX'
      },
      {
        name: 'Supporter Diamante',
        description: 'Pacchetto top tier per esperienza completa Revenix RP.',
        benefits: ['Tutti i vantaggi Oro', 'Supporto prioritario', 'Pacchetto premium completo'],
        price: '€ XX,XX'
      }
    ]
  },
  veicoli: {
    title: 'Veicoli',
    subtitle: 'Selezione veicoli premium e pacchetti mobilità.',
    cards: [
      { name: 'Street Pack', description: 'Veicoli perfetti per utilizzo urbano.', benefits: ['2 veicoli civili', 'Custom base', 'Consegna rapida'], price: '€ XX,XX' },
      { name: 'Sport Pack', description: 'Performance e stile per player competitivi.', benefits: ['Auto sportiva', 'Tuning estetico', 'Colori esclusivi'], price: '€ XX,XX' }
    ]
  },
  casa: {
    title: 'Casa',
    subtitle: 'Bundle housing e upgrade immobiliari.',
    cards: [
      { name: 'Starter Home', description: 'Ingresso ideale nel sistema immobiliare.', benefits: ['Casa base', '1 garage', 'Set arredamento base'], price: '€ XX,XX' },
      { name: 'Luxury Home', description: 'Soluzione premium per un lifestyle avanzato.', benefits: ['Villa premium', 'Garage ampliato', 'Decor pack esclusivo'], price: '€ XX,XX' }
    ]
  },
  fazioni: {
    title: 'Fazioni',
    subtitle: 'Supporto e upgrade per organizzazioni RP.',
    cards: [
      { name: 'Faction Boost Base', description: 'Pacchetto iniziale per crescita fazione.', benefits: ['Kit logistico', 'Asset RP base', 'Supporto setup'], price: '€ XX,XX' },
      { name: 'Faction Boost Pro', description: 'Upgrade completo per strutture avanzate.', benefits: ['Asset avanzati', 'Template operativi', 'Priorità gestione'], price: '€ XX,XX' }
    ]
  },
  armi: {
    title: 'Armi',
    subtitle: 'Bundle armeria cosmetici e accessori (nel rispetto del regolamento).',
    cards: [
      { name: 'Weapon Skin Pack', description: 'Set estetico armi premium.', benefits: ['Skin rare', 'Varianti colore', 'Effetti personalizzati'], price: '€ XX,XX' },
      { name: 'Tactical Bundle', description: 'Accessori e setup tattico avanzato.', benefits: ['Componenti ottimizzati', 'Preset loadout', 'Pack utility'], price: '€ XX,XX' }
    ]
  },
  soldi: {
    title: 'Soldi',
    subtitle: 'Pacchetti economici bilanciati per progressione RP.',
    cards: [
      { name: 'Economy Start', description: 'Supporto iniziale per attività lecite.', benefits: ['Capitale iniziale', 'Kit lavoro', 'Bonus utilità'], price: '€ XX,XX' },
      { name: 'Economy Plus', description: 'Upgrade economico per espansione business.', benefits: ['Fondo espansione', 'Bonus settimanale', 'Supporto sviluppo'], price: '€ XX,XX' }
    ]
  },
  'multi-pg': {
    title: 'Multi-PG',
    subtitle: 'Slot personaggi aggiuntivi per ampliare il tuo RP.',
    cards: [
      { name: 'Slot +1', description: 'Aggiungi un personaggio extra al tuo account.', benefits: ['1 slot aggiuntivo', 'Setup rapido', 'Supporto attivazione'], price: '€ XX,XX' },
      { name: 'Slot +2', description: 'Massima flessibilità narrativa con due slot.', benefits: ['2 slot aggiuntivi', 'Gestione avanzata', 'Priorità supporto'], price: '€ XX,XX' }
    ]
  },
  boost: {
    title: 'Boost',
    subtitle: 'Pacchetti boost per accelerare la tua esperienza in modo bilanciato.',
    cards: [
      { name: 'XP Boost', description: 'Incremento progressione attività RP.', benefits: ['Boost temporaneo', 'Stack controllato', 'Attivazione immediata'], price: '€ XX,XX' },
      { name: 'Business Boost', description: 'Supporto per crescita aziende e attività.', benefits: ['Bonus produttività', 'Perks economici', 'Supporto premium'], price: '€ XX,XX' }
    ]
  }
};

function renderShop(section) {
  if (!shopPanel || !shopData[section]) return;

  const data = shopData[section];
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
        <ul>
          ${card.benefits.map((item) => `<li>${item}</li>`).join('')}
        </ul>
        <p class="shop-price">Prezzo: ${card.price}</p>
        <a class="btn btn-small shop-buy" href="https://discord.gg/" target="_blank" rel="noopener noreferrer">Acquista</a>
      </article>
    `
    )
    .join('');

  shopPanel.classList.remove('fade-in');
  shopPanel.innerHTML = `${head}<div class="shop-cards">${cards}</div>`;
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

      if (this.y < -10 || this.x < -20 || this.x > canvas.width + 20) {
        this.reset();
      }
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
}
