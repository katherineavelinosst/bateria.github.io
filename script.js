/* ==========================================================================
   INTERACTIONS & FORM SUBMISSION - CUMPLIMIENTO PSICOSOCIAL COLOMBIA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initFormSubmission();
  initLegalModals();
  initAnimationsOnScroll();
  
  // Set current year in footer
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

/* --- Navbar Scroll State --- */
function initNavbarScroll() {
  const header = document.getElementById('mainHeader');
  
  const toggleHeaderClass = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', toggleHeaderClass);
  toggleHeaderClass(); // Initial check
}

/* --- Mobile Navigation Menu --- */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNavClose = document.getElementById('mobileNavClose');
const mobileNav = document.getElementById('mobileNav');
const mobileBackdrop = document.getElementById('mobileBackdrop');

function initMobileMenu() {
  if (!mobileMenuBtn) return;
  
  const openMenu = () => {
    mobileNav.classList.add('open');
    mobileBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden'; // Disable background scroll
  };
  
  const closeMenu = () => {
    mobileNav.classList.remove('open');
    mobileBackdrop.classList.remove('open');
    document.body.style.overflow = ''; // Enable background scroll
  };
  
  mobileMenuBtn.addEventListener('click', openMenu);
  mobileNavClose.addEventListener('click', closeMenu);
  mobileBackdrop.addEventListener('click', closeMenu);
}

function closeMobileMenu() {
  if (mobileNav) mobileNav.classList.remove('open');
  if (mobileBackdrop) mobileBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}

/* --- Legal Modals (Privacy & Data policies) --- */
const legalModal = document.getElementById('legalModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const privacyBtn = document.getElementById('privacyBtn');
const dataBtn = document.getElementById('dataBtn');

const legalTexts = {
  privacy: `
    <h3>Política de Privacidad</h3>
    <p>En <strong>Cumplimiento Psicosocial Colombia</strong>, valoramos y protegemos la privacidad de la información suministrada por nuestros clientes y usuarios. De acuerdo con la normatividad legal de Colombia, la información recolectada mediante formularios o comunicación directa se mantendrá bajo estricta confidencialidad.</p>
    <h5>1. Recolección de Datos</h5>
    <p>Recolectamos información personal básica (nombre, cargo, correo corporativo, teléfono, empresa y tamaño de la misma) con el único fin de proveer cotizaciones y asesoría personalizada sobre nuestros servicios de evaluación de Baterías de Riesgo Psicosocial y SG-SST.</p>
    <h5>2. Uso de la Información</h5>
    <p>Los datos serán tratados con fines comerciales, de cotización, envío de propuestas y agendamiento de citas. No compartiremos, venderemos ni transferiremos sus datos comerciales a terceras partes sin su consentimiento explícito previo.</p>
    <h5>3. Seguridad de Datos</h5>
    <p>Implementamos medidas de seguridad físicas, tecnológicas y organizacionales adecuadas para evitar el acceso no autorizado, alteración o pérdida de los datos de su empresa.</p>
  `,
  data: `
    <h3>Tratamiento de Datos Personales (Habeas Data)</h3>
    <p>Dando cumplimiento a la <strong>Ley 1581 de 2012</strong> de protección de datos personales y su Decreto Reglamentario 1377 de 2013, <strong>Cumplimiento Psicosocial Colombia</strong> informa que los datos capturados en este portal web serán almacenados de forma segura en nuestras bases de datos comerciales.</p>
    <h5>Finalidad del Tratamiento de Datos:</h5>
    <ul>
      <li>• Contacto directo telefónico o por correo electrónico para dar asesoría y enviar propuestas de aplicación de Baterías de Riesgo Psicosocial.</li>
      <li>• Envío de comunicaciones técnicas relacionadas con actualizaciones normativas de SG-SST en Colombia.</li>
      <li>• Gestión interna administrativa para facturación y ejecución de servicios profesionales.</li>
    </ul>
    <h5>Derechos de los Titulares:</h5>
    <p>Usted como titular de la información tiene derecho a conocer, actualizar, rectificar y solicitar la eliminación de sus datos en cualquier momento. Para ejercer estos derechos, puede escribir directamente a nuestro correo de atención corporativa: <strong>katherineavelinosst@gmail.com</strong>.</p>
  `
};

function initLegalModals() {
  if (!legalModal) return;
  
  const openModal = (type) => {
    modalTitle.textContent = type === 'privacy' ? 'Política de Privacidad' : 'Tratamiento de Datos (Habeas Data)';
    modalBody.innerHTML = legalTexts[type];
    legalModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    legalModal.classList.remove('open');
    document.body.style.overflow = '';
  };
  
  if (privacyBtn) {
    privacyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('privacy');
    });
  }
  
  if (dataBtn) {
    dataBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('data');
    });
  }
  
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }
  
  legalModal.addEventListener('click', (e) => {
    if (e.target === legalModal) {
      closeModal();
    }
  });
}

/* --- Form Validation and AJAX Submission to FormSubmit --- */
function initFormSubmission() {
  const form = document.getElementById('leadForm');
  const submitBtn = document.getElementById('formSubmitBtn');
  
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Clear custom error states if any
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
      // Basic check
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = 'var(--alert-red)';
      } else {
        input.style.borderColor = 'var(--border-light)';
      }
      
      // Email check
      if (input.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          isValid = false;
          input.style.borderColor = 'var(--alert-red)';
        }
      }
    });
    
    if (!isValid) {
      alert("Por favor diligencie todos los campos obligatorios correctamente.");
      return;
    }
    
    // UI state: Loading
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> <span>Enviando información...</span>';
    
    // Build JSON data from form inputs
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    // Add additional contextual data for clarity in the email
    data['Ciudad'] = 'Bogotá / Colombia';
    data['Fecha_Envio'] = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });
    
    try {
      // POST to FormSubmit AJAX endpoint
      const response = await fetch("https://formsubmit.co/ajax/katherineavelinosst@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (response.ok && (result.success === true || result.success === "true")) {
        // Redirection to dedicated Gracias Page (Google Ads Conversion Tracking best practice)
        window.location.href = "gracias.html";
      } else {
        throw new Error(result.message || "Error al procesar el formulario.");
      }
      
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Lo sentimos, ocurrió un problema técnico al enviar tus datos. Por favor, contáctanos directamente a través del botón flotante de WhatsApp o llámanos al 3102631462 para brindarte atención inmediata.");
      
      // Restore Button state
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
}

/* --- Smooth Scrolling for Anchor Links & Mobile Sticky CTA visibility --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = document.getElementById('mainHeader').offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
});

/* --- Mobile Sticky CTA Bar Show/Hide Logic --- */
const stickyCta = document.querySelector('.sticky-mobile-cta');
const heroForm = document.getElementById('contacto-form');

if (stickyCta && heroForm) {
  window.addEventListener('scroll', () => {
    // Show sticky CTA on mobile only if we are past the hero form section
    if (window.innerWidth <= 768) {
      const formPosition = heroForm.getBoundingClientRect().bottom + window.scrollY;
      const scrollPosition = window.scrollY + window.innerHeight;
      
      if (window.scrollY > formPosition - 100) {
        stickyCta.style.display = 'flex';
      } else {
        stickyCta.style.display = 'none';
      }
    } else {
      stickyCta.style.display = 'none';
    }
  });
}

/* --- Subtle Animations on Scroll (Fades elements in) --- */
function initAnimationsOnScroll() {
  const fadeElements = document.querySelectorAll('.problem-card, .compliance-card, .service-card, .eval-col-card, .benefit-card, .sector-card-priority');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });
    
    fadeElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(15px)';
      el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      observer.observe(el);
    });
  } else {
    // Fallback if browser doesn't support IntersectionObserver
    fadeElements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }
}
