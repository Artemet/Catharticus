/* ── Hamburger ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  /* Close nav on link click */
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* ── Active nav on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  const get_title_line = document.querySelectorAll('.nav-links .title-bar');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    links.forEach(a => {
      a.classList.remove('active');
      get_title_line[Number(a.id)].classList.remove('title-bar-active');
      if (a.getAttribute('href') === '#' + current) {
        a.classList.add('active');
        get_title_line[Number(a.id)].classList.add('title-bar-active');
      }
    });
  }, { passive: true });

  /* ── Scroll reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        // Stagger siblings within same parent
        const siblings = [...e.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
        const idx = siblings.indexOf(e.target);
        setTimeout(() => {
          e.target.classList.add('visible');
        }, Math.min(idx * 80, 400));
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));

  /* ── Form submit ── */
  function submitForm() {
    const name    = document.getElementById('fname').value.trim();
    const email   = document.getElementById('femail').value.trim();
    const message = document.getElementById('fmessage').value.trim();
    const msg     = document.getElementById('formMessage');

    if (!name || !email || !message) {
      msg.style.display = 'block';
      msg.style.background = 'rgba(255,60,60,0.1)';
      msg.style.borderColor = 'rgba(255,60,60,0.3)';
      msg.style.color = '#ff9999';
      msg.textContent = 'Please fill in your name, email and message.';
      return;
    }

    msg.style.display = 'block';
    msg.style.background = 'rgba(42,79,255,0.15)';
    msg.style.borderColor = 'rgba(42,79,255,0.4)';
    msg.style.color = '#99b0ff';
    msg.textContent = 'Thank you for your inquiry. We will be in touch shortly.';

    document.getElementById('fname').value    = '';
    document.getElementById('fcompany').value = '';
    document.getElementById('femail').value   = '';
    document.getElementById('fmessage').value = '';
  }