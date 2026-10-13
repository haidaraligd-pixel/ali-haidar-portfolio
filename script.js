/* ============================================
   ALI HAIDAR — Web Developer Portfolio
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Navbar ---------- */
  var nav = document.getElementById('nav');
  var burger = document.querySelector('.burger');
  var navMenu = document.querySelector('.nav-menu');

  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (burger && navMenu) {
    burger.addEventListener('click', function () {
      var open = navMenu.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    navMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navMenu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Smooth anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    });
  });

  /* ---------- Hero stat counters ---------- */
  var counters = document.querySelectorAll('.stat-num');
  var counted = false;

  function runCounters() {
    if (counted || !counters.length) return;
    var box = counters[0].getBoundingClientRect();
    if (box.top > window.innerHeight || box.bottom < 0) return;
    counted = true;

    counters.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / 1100, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
    });
  }
  runCounters();
  window.addEventListener('scroll', runCounters, { passive: true });

  /* ---------- Skill bars ---------- */
  var skillBox = document.querySelector('.skills-box');
  if (skillBox && 'IntersectionObserver' in window) {
    var skillObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var bars = entry.target.querySelectorAll('.bar i');
        bars.forEach(function (bar, i) {
          var w = bar.style.width;
          bar.style.width = '0';
          setTimeout(function () { bar.style.width = w; }, 60 + i * 90);
        });
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.3 });
    skillObs.observe(skillBox);
  }

  /* ---------- Scroll reveal ---------- */
  var revealTargets = document.querySelectorAll(
    '.srv, .proc, .work-card, .sec-head, .skills-box, .cb-form, .about-facts'
  );

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        entry.target.style.transitionDelay = Math.min(i * 70, 320) + 'ms';
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(function (el) {
      el.classList.add('rv');
      io.observe(el);
    });
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  var sendBtn = document.getElementById('sendBtn');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.classList.remove('error');

      var name = form.cname.value.trim();
      var email = form.cemail.value.trim();
      var type = form.ctype.value;
      var budget = form.cbudget.value;
      var msg = form.cmsg.value.trim();

      if (!name || !email || !type || !msg) {
        status.textContent = 'Please fill in your name, email, project type and details.';
        status.classList.add('error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = 'That email address does not look right.';
        status.classList.add('error');
        return;
      }

      var original = sendBtn.innerHTML;
      sendBtn.disabled = true;
      sendBtn.textContent = 'Sending…';

      var text =
        'Salam Ali Haidar!%0A%0A' +
        '*Name:* ' + encodeURIComponent(name) + '%0A' +
        '*Email:* ' + encodeURIComponent(email) + '%0A' +
        '*Project:* ' + encodeURIComponent(type) + '%0A' +
        (budget ? '*Budget:* ' + encodeURIComponent(budget) + '%0A' : '') +
        '%0A' + encodeURIComponent(msg);

      setTimeout(function () {
        sendBtn.disabled = false;
        sendBtn.innerHTML = original;
        status.textContent = 'Thank you, ' + name + '. Opening WhatsApp so your message reaches me directly…';
        form.reset();
        window.open('https://wa.me/923010668408?text=' + text, '_blank');
      }, 800);
    });
  }

  /* ---------- Footer year ---------- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

});
