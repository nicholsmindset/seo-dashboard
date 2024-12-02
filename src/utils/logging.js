import { generateId } from './generateId';

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
};

class Logger {
  constructor() {
    this.level = LOG_LEVELS.INFO;
  }

  setLevel(level) {
    this.level = LOG_LEVELS[level] || LOG_LEVELS.INFO;
  }

  formatMessage(level, message, data) {
    const timestamp = new Date().toISOString();
    return {
      timestamp,
      level,
      message,
      data,
      id: generateId()
    };
  }

  debug(message, data) {
    if (this.level <= LOG_LEVELS.DEBUG) {
      console.debug(this.formatMessage('DEBUG', message, data));
    }
  }

  info(message, data) {
    if (this.level <= LOG_LEVELS.INFO) {
      console.info(this.formatMessage('INFO', message, data));
    }
  }

  warn(message, data) {
    if (this.level <= LOG_LEVELS.WARN) {
      console.warn(this.formatMessage('WARN', message, data));
    }
  }

  error(message, error, data) {
    if (this.level <= LOG_LEVELS.ERROR) {
      console.error(this.formatMessage('ERROR', message, { error, ...data }));
    }
  }
}

export const logger = new Logger();
