import { LoggerService } from './logging';
import { toast } from 'react-toastify';

// Custom error types
export class AppError extends Error {
  constructor(message, type = 'error', code = null) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.code = code;
    this.timestamp = new Date().toISOString();
  }
}

// Error handling utility
export const ErrorHandler = {
  // Log and handle errors
  handle: (error, context = {}) => {
    // Determine error type
    const errorType = error instanceof AppError ? error.type : 'error';
    
    // Log the error
    LoggerService.error(`Error in ${context.source || 'unknown'}`, {
      message: error.message,
      stack: error.stack,
      type: errorType,
      context
    });

    // Show user-friendly notification
    ErrorHandler.notify(error, context);

    // Optional: Send error to monitoring service
    ErrorHandler.reportToMonitoring(error, context);
  },

  // Show user-friendly notification
  notify: (error, context = {}) => {
    const errorMessages = {
      'error': error.message || 'An unexpected error occurred',
      'warning': error.message || 'Warning: Something might not work as expected',
      'info': error.message || 'Additional information'
    };

    const toastOptions = {
      position: "bottom-right",
      autoClose: context.autoClose || 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    };

    switch(error.type || 'error') {
      case 'warning':
        toast.warn(errorMessages.warning, toastOptions);
        break;
      case 'info':
        toast.info(errorMessages.info, toastOptions);
        break;
      default:
        toast.error(errorMessages.error, toastOptions);
    }
  },

  // Report to external monitoring service (placeholder)
  reportToMonitoring: (error, context) => {
    // In a real-world scenario, integrate with services like Sentry, LogRocket, etc.
    console.debug('Error reported to monitoring', { error, context });
  },

  // Create a wrapped async function for error handling
  asyncWrapper: (fn) => async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      ErrorHandler.handle(error, { 
        source: fn.name, 
        args 
      });
      throw error;
    }
  },

  // Create custom error
  createError: (message, type = 'error', code = null) => {
    return new AppError(message, type, code);
  }
};
