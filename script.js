document.addEventListener('DOMContentLoaded', () => {
  // Set active navigation link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Signup form
  const form = document.getElementById('signup-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      if (email) {
        console.log(`Signing up with: ${email}`);
        alert("Thank you! We'll get in touch with you soon.");
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

  // Interactive Demo Functionality
  // Demo Translator
  const demoTranslator = document.querySelector('.demo-translator');
  if (!demoTranslator) return;

  // Get DOM elements
  const fromLanguage = document.getElementById('from-language');
  const toLanguage = document.getElementById('to-language');
  const inputText = document.getElementById('input-text');
  const outputText = document.getElementById('output-text');
  const swapButton = document.getElementById('swap-languages');
  const clearInputButton = document.getElementById('clear-input');
  const copyOutputButton = document.getElementById('copy-output');
  const speakInputButton = document.getElementById('speak-input');
  const speakOutputButton = document.getElementById('speak-output');
  const industryButtons = document.querySelectorAll('.industry-btn');
  const startListeningButton = document.getElementById('start-listening');
  const transcriptionText = document.getElementById('transcription-text');

  let currentIndustry = 'general';

  // Language codes for speech synthesis
  const languageCodes = {
    'en': 'en-US',
    'es': 'es-ES',
    'fr': 'fr-FR',
    'de': 'de-DE',
    'it': 'it-IT',
    'pt': 'pt-BR',
    'ru': 'ru-RU',
    'zh': 'zh-CN',
    'ja': 'ja-JP',
    'ko': 'ko-KR',
    'ar': 'ar-SA'
  };

  // Expanded translations dictionary
  const translations = {
    en: {
      es: {
        general: {
          "Hello": "Hola",
          "How are you?": "¿Cómo estás?",
          "Thank you": "Gracias",
          "Good morning": "Buenos días",
          "Good afternoon": "Buenas tardes",
          "Good evening": "Buenas noches",
          "Please": "Por favor",
          "You're welcome": "De nada",
          "Yes": "Sí",
          "No": "No",
          "I don't understand": "No entiendo",
          "Could you repeat that?": "¿Podrías repetir eso?",
          "What time is it?": "¿Qué hora es?",
          "Where is...?": "¿Dónde está...?",
          "How much is it?": "¿Cuánto cuesta?",
          "I need help": "Necesito ayuda",
          "Do you speak English?": "¿Hablas inglés?",
          "I'm lost": "Estoy perdido",
          "Can you help me?": "¿Puedes ayudarme?",
          "I'm sorry": "Lo siento",
          "Excuse me": "Disculpe"
        }
      },
      fr: {
        general: {
          "Hello": "Bonjour",
          "How are you?": "Comment allez-vous?",
          "Thank you": "Merci",
          "Good morning": "Bonjour",
          "Good afternoon": "Bon après-midi",
          "Good evening": "Bonsoir",
          "Please": "S'il vous plaît",
          "You're welcome": "De rien",
          "Yes": "Oui",
          "No": "Non",
          "I don't understand": "Je ne comprends pas",
          "Could you repeat that?": "Pouvez-vous répéter?",
          "What time is it?": "Quelle heure est-il?",
          "Where is...?": "Où est...?",
          "How much is it?": "Combien ça coûte?",
          "I need help": "J'ai besoin d'aide",
          "Do you speak English?": "Parlez-vous anglais?",
          "I'm lost": "Je suis perdu",
          "Can you help me?": "Pouvez-vous m'aider?",
          "I'm sorry": "Je suis désolé",
          "Excuse me": "Excusez-moi"
        }
      }
    }
  };

  // API Configuration
  const API_KEY = 'AIzaSyAt-4Ohija4uGE38MiFEuBBsrkFKTIxJg8';
  const TRANSLATION_API_URL = 'https://translation.googleapis.com/language/translate/v2';

  // Voice recognition setup
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    console.log('Web Speech API is supported in this browser');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    // Configure recognition settings
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    console.log('Speech recognition initialized with settings:', {
      continuous: recognition.continuous,
      interimResults: recognition.interimResults,
      lang: recognition.lang
    });

    let isListening = false;

    if (startListeningButton && transcriptionText) {
      console.log('Voice recognition UI elements found');

      startListeningButton.addEventListener('click', () => {
        if (!isListening) {
          try {
            recognition.start();
            console.log('Started listening');
            isListening = true;
            startListeningButton.innerHTML = '<i class="fas fa-stop"></i> Stop Listening';
            startListeningButton.classList.add('listening');
            transcriptionText.textContent = 'Listening...';
          } catch (error) {
            console.error('Error starting recognition:', error);
            transcriptionText.textContent = `Error: ${error.message}`;
          }
        } else {
          recognition.stop();
          console.log('Stopped listening');
          isListening = false;
          startListeningButton.innerHTML = '<i class="fas fa-microphone"></i> Start Listening';
          startListeningButton.classList.remove('listening');
        }
      });

      recognition.onstart = () => {
        console.log('Recognition started');
      };

      recognition.onresult = (event) => {
        console.log('Recognition result received');
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');

        console.log('Transcribed text:', transcript);
        transcriptionText.textContent = transcript;
        inputText.value = transcript;
        translateText();
      };

      recognition.onerror = (event) => {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';

        switch (event.error) {
          case 'no-speech':
            errorMessage.textContent = 'No speech was detected. Please try again.';
            break;
          case 'audio-capture':
            errorMessage.textContent = 'No microphone was found. Please ensure your microphone is connected.';
            break;
          case 'not-allowed':
            errorMessage.textContent = 'Microphone access was denied. Please allow microphone access.';
            break;
          default:
            errorMessage.textContent = 'An error occurred with speech recognition. Please try again.';
        }

        document.querySelector('.translation-area').appendChild(errorMessage);

        // Remove error message after 5 seconds
        setTimeout(() => {
          errorMessage.remove();
        }, 5000);

        console.error('Speech recognition error:', event.error);
      };

      recognition.onend = () => {
        console.log('Recognition ended');
        if (isListening) {
          console.log('Restarting recognition');
          recognition.start();
        }
      };
    } else {
      console.error('Voice recognition UI elements not found');
    }
  } else {
    console.error('Web Speech API is not supported in this browser');
    if (transcriptionText) {
      transcriptionText.textContent = 'Error: Web Speech API is not supported in this browser. Please use a modern browser like Chrome, Edge, or Safari.';
    }
  }

  // Translation function with loading state and error handling
  async function translateText(text, fromLang, toLang, industry = 'general') {
    const loadingIndicator = document.querySelector('.loading-indicator');
    const outputText = document.getElementById('output-text');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';

    try {
      // Show loading indicator
      loadingIndicator.style.display = 'flex';

      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Your actual translation API call would go here
      const translatedText = `Translated: ${text}`;

      // Update output
      outputText.value = translatedText;

      // Hide loading indicator
      loadingIndicator.style.display = 'none';

      // Remove any existing error messages
      const existingError = document.querySelector('.error-message');
      if (existingError) {
        existingError.remove();
      }

    } catch (error) {
      // Hide loading indicator
      loadingIndicator.style.display = 'none';

      // Show error message
      errorMessage.textContent = 'Translation failed. Please try again.';
      document.querySelector('.translation-area').appendChild(errorMessage);

      // Remove error message after 5 seconds
      setTimeout(() => {
        errorMessage.remove();
      }, 5000);

      console.error('Translation error:', error);
    }
  }

  // Event listeners
  fromLanguage.addEventListener('change', translateText);
  toLanguage.addEventListener('change', translateText);
  inputText.addEventListener('input', translateText);

  swapButton.addEventListener('click', () => {
    [fromLanguage.value, toLanguage.value] = [toLanguage.value, fromLanguage.value];
    [inputText.value, outputText.value] = [outputText.value, inputText.value];
  });

  clearInputButton.addEventListener('click', () => {
    inputText.value = '';
    outputText.value = '';
    transcriptionText.textContent = '';
  });

  copyOutputButton.addEventListener('click', () => {
    outputText.select();
    document.execCommand('copy');
    copyOutputButton.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
      copyOutputButton.innerHTML = '<i class="fas fa-copy"></i>';
    }, 2000);
  });

  // Speech synthesis
  function speakText(text, lang) {
    if (text) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageCodes[lang] || lang;
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang.startsWith(lang)) || voices[0];
      if (voice) {
        utterance.voice = voice;
      }

      window.speechSynthesis.speak(utterance);
    }
  }

  speakInputButton.addEventListener('click', () => {
    speakText(inputText.value, fromLanguage.value);
  });

  speakOutputButton.addEventListener('click', () => {
    speakText(outputText.value, toLanguage.value);
  });

  // Load voices
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }

  // Industry selection
  industryButtons.forEach(button => {
    button.addEventListener('click', () => {
      industryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      currentIndustry = button.getAttribute('data-industry');
      translateText();
    });
  });

  // Initial translation
  translateText();

  // Integration Tools Auto-Sliding Animation
  const initIntegrationSlider = () => {
    const integrationTools = document.querySelectorAll('.integration-tool');
    if (!integrationTools.length) return;

    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'integration-dots';

    // Create dots for each tool
    integrationTools.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = 'integration-dot';
      if (index === 0) dot.classList.add('active');
      dotsContainer.appendChild(dot);
    });

    // Add dots container after the integrations grid
    const integrationsGrid = document.querySelector('.integrations-grid');
    if (integrationsGrid) {
      integrationsGrid.parentNode.insertBefore(dotsContainer, integrationsGrid.nextSibling);
    }

    // Find AWS tool and set it as initial active slide
    const awsTool = Array.from(integrationTools).find(tool =>
      tool.querySelector('h3')?.textContent.toLowerCase().includes('aws')
    );
    let currentIndex = awsTool ? Array.from(integrationTools).indexOf(awsTool) : 0;

    // Set initial active states
    integrationTools.forEach((tool, index) => {
      if (index === currentIndex) {
        tool.classList.add('active');
      } else {
        tool.classList.remove('active');
      }
    });

    const slideDuration = 1500; // 1.5 seconds per slide

    const updateSlides = () => {
      // First, add sliding-out class to current tool
      const currentTool = integrationTools[currentIndex];
      currentTool.classList.add('sliding-out');

      // Remove active class from all dots
      document.querySelectorAll('.integration-dot').forEach(dot => dot.classList.remove('active'));

      // After slide out animation
      setTimeout(() => {
        // Remove sliding-out class and reset position
        currentTool.classList.remove('sliding-out');
        currentTool.style.transform = 'translateX(100%)';
        currentTool.style.opacity = '0';

        // Update to next index
        currentIndex = (currentIndex + 1) % integrationTools.length;

        // Add active class to new current tool
        integrationTools[currentIndex].classList.add('active');
        document.querySelectorAll('.integration-dot')[currentIndex].classList.add('active');
      }, 500);
    };

    // Initial setup
    updateSlides();

    // Start auto-sliding
    setInterval(updateSlides, slideDuration);

    // Add click handlers for dots
    document.querySelectorAll('.integration-dot').forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlides();
      });
    });
  };

  // Initialize the integration slider
  initIntegrationSlider();
});