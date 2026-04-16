  // Handle mobile hamburger toggle
  const hamburger = document.querySelector('.hamburger');
  const navMobile = document.querySelector('.nav-mobile');
  const navLinks = document.querySelector('.nav-links');
  const mobileLinksContainer = navMobile;

  hamburger.addEventListener('click', () => {
    navMobile.classList.toggle('active');
  });
  hamburger.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' ') {
      navMobile.classList.toggle('active');
    }
  });

  // Populate mobile menu links from desktop navigation
  function populateMobileMenu() {
    const navLinksDesktop = document.querySelectorAll('.nav-links a');
    navMobile.innerHTML = '';
    navLinksDesktop.forEach(link => {
      const a = document.createElement('a');
      a.textContent = link.textContent;
      a.setAttribute('data-link', link.getAttribute('data-link'));
      a.tabIndex = 0;
      a.classList.toggle('active', link.classList.contains('active'));
      a.addEventListener('click', () => {
        goToSection(a.getAttribute('data-link'));
        navMobile.classList.remove('active');
      });
      a.addEventListener('keydown', e => {
        if(e.key === 'Enter' || e.key === ' ') {
          goToSection(a.getAttribute('data-link'));
          navMobile.classList.remove('active');
        }
      });
      navMobile.appendChild(a);
    });
  }
  populateMobileMenu();

  // Navigation links: switch section
  const allNavLinks = document.querySelectorAll('.nav-links a');
  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      const target = link.getAttribute('data-link');
      goToSection(target);
    });
    link.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' ') {
        const target = link.getAttribute('data-link');
        goToSection(target);
      }
    });
  });

  function goToSection(id) {
    // Hide all sections
    const sections = document.querySelectorAll('main section');
    sections.forEach(s => {
      s.classList.remove('active');
      s.setAttribute('tabindex', '-1');
    });
    // Show target section
    const targetSection = document.getElementById(id);
    if(targetSection) {
      targetSection.classList.add('active');
      targetSection.setAttribute('tabindex', '0');
      targetSection.focus({preventScroll:true});
    }
    // Update nav links active state
    allNavLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-link') === id);
      link.setAttribute('aria-current', link.getAttribute('data-link') === id ? 'page' : 'false');
    });
    // Update mobile nav links
    const mobileLinks = document.querySelectorAll('.nav-mobile a');
    mobileLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-link') === id);
    });
    // Close mobile menu if open
    navMobile.classList.remove('active');
  }

  // Reservation page: date min today
  const dateInput = document.getElementById('date');
  const todayStr = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', todayStr);

  // Reservation form submit handling
  const form = document.getElementById('reservationForm');
  const confirmation = document.getElementById('confirmation');

  form.addEventListener('submit', e => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Phone validation: 7-15 digits numeric only
    const phoneVal = form.phone.value.replace(/\D/g, '');
    const phonePattern = /^\d{7,15}$/;
    if (!phonePattern.test(phoneVal)) {
      alert('Please enter a valid phone number with 7 to 15 digits.');
      form.phone.focus();
      return;
    }

    // Validate time between 11:00 and 22:00
    const [hour, minute] = form.time.value.split(':').map(Number);
    if(hour < 11 || hour > 22) {
      alert('Please select a time between 11:00 and 22:00.');
      form.time.focus();
      return;
    }

    confirmation.style.display = 'block';
    confirmation.textContent = `Thank you, ${form.name.value}! Your table for ${form.guests.value} is reserved on ${form.date.value} at ${form.time.value}. We will contact you shortly.`;
    form.reset();
  });

  // Contact form submit simulation
  const contactForm = document.querySelector('#contact form');
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you shortly.');
    contactForm.reset();
  });

  // Menu filtering
  const filterButtons = document.querySelectorAll('#menu .filter-tabs button');
  const menuItems = document.querySelectorAll('#menu .menu-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      const filter = button.getAttribute('data-filter');
      menuItems.forEach(item => {
        if(filter === 'all' || item.classList.contains(filter)) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

  // Book a Table button on Home scrolls to reservation
  const toReservationBtn = document.getElementById('toReservationBtn');
  toReservationBtn.addEventListener('click', () => {
    goToSection('reservation');
  });