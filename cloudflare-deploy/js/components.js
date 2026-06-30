/* ═══════════════════════════════════════════
   THE BREAKDOWN — Shared Components v2
   ═══════════════════════════════════════════ */

(function() {
  'use strict';

  // Kill orphaned service worker from old site version
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(regs) {
      regs.forEach(function(r) { r.unregister(); });
    });
  }

  const SITE = 'https://thebreakdown.in';

  function loadCSS(href) {
    var el = document.createElement('link');
    el.rel = 'stylesheet';
    el.href = href;
    document.head.appendChild(el);
  }

  function createNav() {
    var nav = document.createElement('nav');
    nav.className = 'nav';
    nav.innerHTML =
      '<div class="nav-inner">' +
        '<a href="' + SITE + '/" class="nav-logo">' +
          '<span class="logo-mark">B</span>' +
          '<span>THE BREAKDOWN</span>' +
        '</a>' +
        '<div class="nav-links" id="navLinks">' +
          '<a href="' + SITE + '/stories">Stories</a>' +
          '<a href="' + SITE + '/the-fix" class="nav-thefix" style="color:#FF6F00;font-weight:600">🔧 The Fix</a>' +
          '<a href="' + SITE + '/incredible-india" class="nav-incredible" style="color:#34D399;font-weight:600">🇮🇳 Incredible India</a>' +
          '<a href="' + SITE + '/topics">Topics</a>' +
          '<a href="' + SITE + '/about">About</a>' +
          '<a href="' + SITE + '/team">Team</a>' +
          '<a href="' + SITE + '/funding">Funding</a>' +
          '<a href="' + SITE + '/contact" class="nav-cta">Contact</a>' +
        '</div>' +
        '<button class="nav-toggle" id="navToggle" aria-label="Toggle menu">☰</button>' +
      '</div>';
    document.body.insertBefore(nav, document.body.firstChild);
    document.body.style.paddingTop = '60px';
  }

  function createFooter() {
    var footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML =
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            '<div class="footer-logo">THE BREAKDOWN</div>' +
            '<p>Complex Stories. Clear Analysis. Forensic journalism tracing the deals, decisions, and deceptions shaping modern India.</p>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h5>Sections</h5>' +
            '<a href="' + SITE + '/stories">Latest Stories</a>' +
            '<a href="' + SITE + '/the-fix" style="color:#FF6F00">🔧 The Fix</a>' +
            '<a href="' + SITE + '/incredible-india" style="color:#34D399">🇮🇳 Incredible India</a>' +
            '<a href="' + SITE + '/topics">Topics</a>' +
            '<a href="' + SITE + '/about">About</a>' +
            '<a href="' + SITE + '/contact">Contact</a>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h5>Policies</h5>' +
            '<a href="' + SITE + '/editorial-policy">Editorial Policy</a>' +
            '<a href="' + SITE + '/corrections">Corrections</a>' +
            '<a href="' + SITE + '/ai-policy">AI Policy</a>' +
            '<a href="' + SITE + '/privacy-policy">Privacy</a>' +
            '<a href="' + SITE + '/terms-of-service">Terms of Service</a>' +
            '<a href="' + SITE + '/cookies-policy">Cookies</a>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h5>Follow</h5>' +
            '<a href="https://x.com/thebreakdownin" target="_blank" rel="noopener">X (Twitter)</a>' +
            '<a href="https://youtube.com/@thebreakdownin" target="_blank" rel="noopener">YouTube</a>' +
            '<a href="' + SITE + '/feed.xml">RSS Feed</a>' +
            '<a href="' + SITE + '/thank-you">Newsletter</a>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<p>&copy; ' + new Date().getFullYear() + ' The Breakdown. All rights reserved.</p>' +
          '<div class="footer-social">' +
            '<a href="https://x.com/thebreakdownin" target="_blank" rel="noopener" aria-label="X">X</a>' +
            '<a href="https://youtube.com/@thebreakdownin" target="_blank" rel="noopener" aria-label="YouTube">YT</a>' +
            '<a href="' + SITE + '/feed.xml" aria-label="RSS">RSS</a>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(footer);
  }

  function createTicker(items) {
    var ticker = document.createElement('div');
    ticker.className = 'ticker';
    var trackHtml = '';
    var doubled = (items || []).concat(items || []);
    doubled.forEach(function(item) {
      trackHtml += '<a href="' + (item.url || '#') + '">' + (item.label || '') + '</a>';
    });
    ticker.innerHTML =
      '<div class="ticker-inner">' +
        '<span class="ticker-label">BREAKING</span>' +
        '<div class="ticker-scroll">' +
          '<div class="ticker-track">' + trackHtml + '</div>' +
        '</div>' +
      '</div>';
    return ticker;
  }

  function createNewsletter() {
    var card = document.createElement('div');
    card.className = 'newsletter-card';
    card.innerHTML =
      '<h3>Stay informed</h3>' +
      '<p>Get the week\'s most important stories delivered to your inbox every Saturday.</p>' +
      '<form class="newsletter-form" action="' + SITE + '/thank-you" method="get">' +
        '<input type="email" name="email" placeholder="Enter your email" required>' +
        '<button type="submit" class="btn btn-primary">Subscribe</button>' +
      '</form>';
    return card;
  }

  function initNav() {
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    if (toggle && links) {
      toggle.addEventListener('click', function() {
        links.classList.toggle('open');
      });
    }
    var current = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(function(a) {
      if (a.getAttribute('href') === current || (a.getAttribute('href') !== '/' && current.startsWith(a.getAttribute('href')))) {
        a.classList.add('active');
      }
    });
  }

  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(function(el) { observer.observe(el); });
  }

  function initCountUp() {
    var els = document.querySelectorAll('.count-up');
    if (!els.length) return;
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseFloat(el.getAttribute('data-target') || el.textContent.replace(/[^0-9.]/g, ''));
        var suffix = el.textContent.replace(/[0-9.,]/g, '');
        var duration = 2000;
        var start = performance.now();
        function update(now) {
          var progress = Math.min((now - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased).toLocaleString() + suffix;
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });
    els.forEach(function(el) { observer.observe(el); });
  }

  function ready(fn) {
    if (document.readyState !== 'loading') { fn(); }
    else { document.addEventListener('DOMContentLoaded', fn); }
  }

  function init() {
    if (!document.getElementById('no-components')) {
      if (!document.querySelector('.nav')) createNav();
      if (!document.querySelector('.footer')) createFooter();
      initNav();
      initReveal();
      initCountUp();
      initLightbox();
    }
  }

  function initLightbox() {
    document.querySelectorAll('.story-image figure img, .media-grid figure img, .story-image img:not(figure img)').forEach(function(img) {
      img.addEventListener('click', function() {
        var overlay = document.createElement('div');
        overlay.className = 'lightbox';
        var caption = '';
        var fig = this.closest('figure');
        if (fig) {
          var fc = fig.querySelector('figcaption');
          if (fc) caption = fc.textContent;
        }
        overlay.innerHTML =
          '<span class="lb-close">&times;</span>' +
          '<img src="' + this.getAttribute('src') + '" alt="' + (this.getAttribute('alt') || '') + '">' +
          (caption ? '<div class="lb-caption">' + caption + '</div>' : '');
        document.body.appendChild(overlay);
        requestAnimationFrame(function() { overlay.classList.add('open'); });
        overlay.querySelector('.lb-close').addEventListener('click', function(e) {
          e.stopPropagation();
          overlay.classList.remove('open');
          setTimeout(function() { overlay.remove(); }, 300);
        });
        overlay.addEventListener('click', function(e) {
          if (e.target === overlay) {
            overlay.classList.remove('open');
            setTimeout(function() { overlay.remove(); }, 300);
          }
        });
        document.addEventListener('keydown', function lbKey(e) {
          if (e.key === 'Escape') {
            overlay.classList.remove('open');
            setTimeout(function() { overlay.remove(); }, 300);
            document.removeEventListener('keydown', lbKey);
          }
        });
      });
    });
  }

  // Auto-init on page load
  ready(init);

  // Expose for manual use
  window.TBD = {
    createNav: createNav,
    createFooter: createFooter,
    createTicker: createTicker,
    createNewsletter: createNewsletter,
    initReveal: initReveal,
    initCountUp: initCountUp,
    initNav: initNav,
    initLightbox: initLightbox
  };
})();
