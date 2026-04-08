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

let shopIndicator = null;

// INDICATORE DINAMICO
function updateShopIndicator(activeTab) {
  if (!shopSidebar || !activeTab || !shopIndicator) return;

  const sidebarRect = shopSidebar.getBoundingClientRect();
  const tabRect = activeTab.getBoundingClientRect();

  shopIndicator.style.top = `${tabRect.top - sidebarRect.top + shopSidebar.scrollTop}px`;
  shopIndicator.style.height = `${tabRect.height}px`;
}

const shopData = {/* LASCIA IDENTICO IL shopData */};

function panelMarkup(data) {
  const head = `
    <div class="shop-panel-head">
      <h3 class="shop-panel-title">${data.title}</h3>
      <p class="shop-panel-sub">${data.subtitle}</p>
    </div>
  `;

  const cards = data.cards.map(card => `
    <article class="shop-item">
      ${card.badge ? `<span class="shop-badge">${card.badge}</span>` : ''}
      <h3>${card.name}</h3>
      ${card.image ? `<div class="shop-image-wrap"><img class="shop-image" src="${card.image}" alt="${card.name}" loading="lazy" /></div>` : ''}
      ${card.amount ? `<p class="shop-amount">${card.amount}</p>` : ''}
      <p>${card.description}</p>
      <ul>${card.benefits.map(item => `<li>◆ ${item}</li>`).join('')}</ul>
      <p class="shop-price">Prezzo: ${card.price}</p>
      <a class="btn btn-small shop-buy" href="https://paypal.me/danielenooo" target="_blank">Acquista</a>
    </article>
  `).join('');

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

// INIT SHOP
if (shopTabs.length && shopPanel) {

  if (shopSidebar) {
    shopIndicator = document.createElement('div');
    shopIndicator.className = 'shop-indicator';
    shopSidebar.appendChild(shopIndicator);
  }

  const initialActiveTab = document.querySelector('.shop-tab.active') || shopTabs[0];
  const initialSection = initialActiveTab?.dataset.shop || 'supporter';

  renderShop(initialSection, false);

  if (initialActiveTab) {
    requestAnimationFrame(() => updateShopIndicator(initialActiveTab));
  }

  shopTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      shopTabs.forEach((item) => item.classList.remove('active'));
      tab.classList.add('active');

      requestAnimationFrame(() => updateShopIndicator(tab));

      renderShop(tab.dataset.shop, true);
    });
  });

  window.addEventListener('resize', () => {
    const currentActiveTab = document.querySelector('.shop-tab.active');
    if (currentActiveTab) updateShopIndicator(currentActiveTab);
  });
}

// Ripple effect
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

// Canvas particles (identico)
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
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
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
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
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
