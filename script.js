document.addEventListener('DOMContentLoaded', () => {
  // Signup form
  const form = document.getElementById('signup-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      if (email) {
        console.log(`Signing up with: ${email}`);
        alert('Thank you! We'll get in touch with you soon.');
        e.target.reset();
      } else {
        alert('Please enter a valid email.');
      }
    });
  }

  // Contact form validation and submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Reset previous error states
      const formGroups = contactForm.querySelectorAll('.form-group');
      formGroups.forEach(group => {
        group.classList.remove('error');
        const errorMessage = group.querySelector('.error-message');
        if (errorMessage) errorMessage.remove();
      });

      // Validate form fields
      let isValid = true;
      const name = contactForm.querySelector('#name');
      const email = contactForm.querySelector('#email');
      const message = contactForm.querySelector('#message');

      if (!name.value.trim()) {
        showError(name, 'Please enter your name');
        isValid = false;
      }

      if (!email.value.trim()) {
        showError(email, 'Please enter your email');
        isValid = false;
      } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
      }

      if (!message.value.trim()) {
        showError(message, 'Please enter your message');
        isValid = false;
      }

      if (isValid) {
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
          // Simulate form submission (replace with actual API call)
          await new Promise(resolve => setTimeout(resolve, 1500));

          // Show success message
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
          submitBtn.style.background = 'var(--secondary-color)';

          // Reset form
          contactForm.reset();

          // Reset button after delay
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
          }, 3000);
        } catch (error) {
          // Show error state
          submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error!';
          submitBtn.style.background = '#e74c3c';

          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
          }, 3000);
        }
      }
    });
  }

  // Helper function to show error message
  function showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');

    const errorMessage = document.createElement('span');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    formGroup.appendChild(errorMessage);
  }

  // Helper function to validate email
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Scroll animations
  const animatedElements = document.querySelectorAll('.animate');
  const animateOnScroll = () => {
    animatedElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (elementTop < windowHeight - 50) {
        el.classList.add('visible');
      } else {
        el.classList.remove('visible');
      }
    });
  };
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();

  // Form Validation
  function validateForm(form) {
    let isValid = true;
    const formGroups = form.querySelectorAll('.form-group');

    formGroups.forEach(group => {
      const input = group.querySelector('input, textarea, select');
      const errorMessage = group.querySelector('.error-message') || document.createElement('div');

      if (!errorMessage.classList.contains('error-message')) {
        errorMessage.classList.add('error-message');
        group.appendChild(errorMessage);
      }

      // Remove existing error state
      group.classList.remove('error');
      errorMessage.textContent = '';

      // Check if field is required
      if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        group.classList.add('error');
        errorMessage.textContent = 'This field is required';
        return;
      }

      // Email validation
      if (input.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          isValid = false;
          group.classList.add('error');
          errorMessage.textContent = 'Please enter a valid email address';
          return;
        }
      }

      // Phone validation
      if (input.type === 'tel' && input.value) {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(input.value)) {
          isValid = false;
          group.classList.add('error');
          errorMessage.textContent = 'Please enter a valid phone number';
          return;
        }
      }
    });

    return isValid;
  }

  // Form Submission Handler
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!validateForm(form)) {
        return;
      }

      const submitBtn = form.querySelector('.submit-btn');
      const originalBtnText = submitBtn.innerHTML;

      try {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
        form.appendChild(successMessage);

        // Reset form
        form.reset();

        // Remove success message after 3 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 3000);

      } catch (error) {
        console.error('Form submission error:', error);
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = 'An error occurred. Please try again.';
        form.appendChild(errorMessage);

        setTimeout(() => {
          errorMessage.remove();
        }, 3000);

      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  });
});