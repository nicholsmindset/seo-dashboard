class ValidationService {
  constructor() {
    this.rules = {
      // User Authentication
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
      },
      password: {
        required: true,
        minLength: 8,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      },
      displayName: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z0-9\s-]+$/,
        message: 'Display name must be between 2 and 50 characters and can only contain letters, numbers, spaces, and hyphens'
      },

      // Company Information
      companyName: {
        required: true,
        minLength: 2,
        maxLength: 100,
        message: 'Company name must be between 2 and 100 characters'
      },
      website: {
        pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
        message: 'Please enter a valid website URL'
      },
      phone: {
        pattern: /^\+?[\d\s-]{10,}$/,
        message: 'Please enter a valid phone number'
      },

      // SEO Metrics
      trafficGoal: {
        required: true,
        pattern: /^\d+$/,
        message: 'Please enter a valid number for traffic goal'
      },
      keywords: {
        required: true,
        validate: (value) => value.split(',').length > 0,
        message: 'Please enter at least one keyword'
      },

      // Webhook Configuration
      webhookUrl: {
        required: true,
        pattern: /^https?:\/\/.+/,
        message: 'Please enter a valid webhook URL'
      },
      apiKey: {
        minLength: 16,
        pattern: /^[A-Za-z0-9_-]+$/,
        message: 'API key must be at least 16 characters and contain only letters, numbers, underscores, and hyphens'
      }
    };
  }

  validate(fieldName, value, customRules = {}) {
    const rules = { ...this.rules[fieldName], ...customRules };
    const errors = [];

    if (!rules) {
      console.warn(`No validation rules found for field: ${fieldName}`);
      return errors;
    }

    // Required check
    if (rules.required && !value) {
      errors.push('This field is required');
      return errors;
    }

    // Skip other validations if field is empty and not required
    if (!value && !rules.required) {
      return errors;
    }

    // Length checks
    if (rules.minLength && value.length < rules.minLength) {
      errors.push(`Must be at least ${rules.minLength} characters`);
    }
    if (rules.maxLength && value.length > rules.maxLength) {
      errors.push(`Must be no more than ${rules.maxLength} characters`);
    }

    // Pattern check
    if (rules.pattern && !rules.pattern.test(value)) {
      errors.push(rules.message || 'Invalid format');
    }

    // Custom validation
    if (rules.validate && !rules.validate(value)) {
      errors.push(rules.message || 'Invalid value');
    }

    return errors;
  }

  validateForm(formData, fields) {
    const errors = {};
    let isValid = true;

    fields.forEach(field => {
      const fieldErrors = this.validate(field, formData[field]);
      if (fieldErrors.length > 0) {
        errors[field] = fieldErrors;
        isValid = false;
      }
    });

    return { isValid, errors };
  }

  validatePassword(password) {
    const requirements = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[@$!%*?&]/.test(password)
    };

    const errors = [];
    if (!requirements.minLength) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!requirements.hasUpperCase) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!requirements.hasLowerCase) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!requirements.hasNumber) {
      errors.push('Password must contain at least one number');
    }
    if (!requirements.hasSpecialChar) {
      errors.push('Password must contain at least one special character (@$!%*?&)');
    }

    return {
      isValid: errors.length === 0,
      errors,
      requirements
    };
  }

  validateWebhookUrl(url) {
    const errors = [];
    
    try {
      const parsedUrl = new URL(url);
      
      // Check protocol
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        errors.push('URL must use HTTP or HTTPS protocol');
      }

      // Check for localhost in production
      if (process.env.NODE_ENV === 'production' && 
          (parsedUrl.hostname === 'localhost' || parsedUrl.hostname === '127.0.0.1')) {
        errors.push('Cannot use localhost in production environment');
      }

      // Check for valid port if specified
      if (parsedUrl.port && (isNaN(parsedUrl.port) || parsedUrl.port < 1 || parsedUrl.port > 65535)) {
        errors.push('Invalid port number');
      }
    } catch (error) {
      errors.push('Invalid URL format');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  validateApiKey(apiKey, provider = '') {
    const errors = [];
    
    // Basic validation
    if (!apiKey) {
      errors.push('API key is required');
      return { isValid: false, errors };
    }

    // Provider-specific validation
    switch (provider.toLowerCase()) {
      case 'google':
        if (!/^AIza[0-9A-Za-z-_]{35}$/.test(apiKey)) {
          errors.push('Invalid Google API key format');
        }
        break;
      case 'github':
        if (!/^gh[ps]_[A-Za-z0-9]{36}$/.test(apiKey)) {
          errors.push('Invalid GitHub token format');
        }
        break;
      case 'semrush':
        if (!/^[0-9a-f]{32}$/.test(apiKey)) {
          errors.push('Invalid SEMrush API key format');
        }
        break;
      default:
        // Generic API key validation
        if (apiKey.length < 16) {
          errors.push('API key must be at least 16 characters long');
        }
        if (!/^[A-Za-z0-9_-]+$/.test(apiKey)) {
          errors.push('API key can only contain letters, numbers, underscores, and hyphens');
        }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export default new ValidationService();
