import { v4 as uuidv4 } from 'uuid';

// Logging levels
const LogLevel = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

// Logging configuration
const LogConfig = {
  currentLevel: LogLevel.INFO,
  maxLogEntries: 500,
  logToConsole: true,
  logToLocalStorage: true
};

// Logging utility
export const LoggerService = {
  // Set logging configuration
  configure: (config) => {
    Object.assign(LogConfig, config);
  },

  // Log an entry
  log: (level, message, metadata = {}) => {
    // Check if the log level is enabled
    if (!LoggerService.isLevelEnabled(level)) return;

    // Create log entry
    const logEntry = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      level,
      message,
      metadata
    };

    // Log to console if enabled
    if (LogConfig.logToConsole) {
      LoggerService._logToConsole(logEntry);
    }

    // Log to localStorage if enabled
    if (LogConfig.logToLocalStorage) {
      LoggerService._logToLocalStorage(logEntry);
    }

    return logEntry;
  },

  // Check if a log level is enabled
  isLevelEnabled: (level) => {
    const levels = [LogLevel.ERROR, LogLevel.WARN, LogLevel.INFO, LogLevel.DEBUG];
    return levels.indexOf(level) <= levels.indexOf(LogConfig.currentLevel);
  },

  // Log to console
  _logToConsole: (logEntry) => {
    const { level, message, metadata } = logEntry;
    
    switch (level) {
      case LogLevel.ERROR:
        console.error(message, metadata);
        break;
      case LogLevel.WARN:
        console.warn(message, metadata);
        break;
      case LogLevel.INFO:
        console.info(message, metadata);
        break;
      case LogLevel.DEBUG:
        console.debug(message, metadata);
        break;
    }
  },

  // Log to localStorage
  _logToLocalStorage: (logEntry) => {
    try {
      // Retrieve existing logs
      const existingLogs = JSON.parse(localStorage.getItem('app_logs') || '[]');
      
      // Add new log entry
      existingLogs.push(logEntry);
      
      // Trim logs if exceeding max entries
      if (existingLogs.length > LogConfig.maxLogEntries) {
        existingLogs.splice(0, existingLogs.length - LogConfig.maxLogEntries);
      }
      
      // Store updated logs
      localStorage.setItem('app_logs', JSON.stringify(existingLogs));
    } catch (error) {
      console.error('Failed to log to localStorage:', error);
    }
  },

  // Retrieve logs
  getLogs: (options = {}) => {
    const { 
      level, 
      startDate, 
      endDate, 
      limit = 100 
    } = options;

    try {
      const logs = JSON.parse(localStorage.getItem('app_logs') || '[]');
      
      return logs
        .filter(log => {
          // Filter by log level
          if (level && log.level !== level) return false;
          
          // Filter by date range
          const logDate = new Date(log.timestamp);
          if (startDate && logDate < new Date(startDate)) return false;
          if (endDate && logDate > new Date(endDate)) return false;
          
          return true;
        })
        .slice(-limit)  // Limit number of logs
        .reverse();  // Most recent first
    } catch (error) {
      console.error('Failed to retrieve logs:', error);
      return [];
    }
  },

  // Clear logs
  clearLogs: () => {
    try {
      localStorage.removeItem('app_logs');
      return true;
    } catch (error) {
      console.error('Failed to clear logs:', error);
      return false;
    }
  },

  // Export logs
  exportLogs: (format = 'json') => {
    const logs = LoggerService.getLogs();
    
    switch (format) {
      case 'json':
        return JSON.stringify(logs, null, 2);
      case 'csv':
        // Convert logs to CSV
        const csvHeader = 'ID,Timestamp,Level,Message';
        const csvRows = logs.map(log => 
          `${log.id},${log.timestamp},${log.level},"${log.message.replace(/"/g, '""')}"`
        );
        return `${csvHeader}\n${csvRows.join('\n')}`;
      default:
        throw new Error('Unsupported export format');
    }
  },

  // Predefined logging methods
  error: (message, metadata) => LoggerService.log(LogLevel.ERROR, message, metadata),
  warn: (message, metadata) => LoggerService.log(LogLevel.WARN, message, metadata),
  info: (message, metadata) => LoggerService.log(LogLevel.INFO, message, metadata),
  debug: (message, metadata) => LoggerService.log(LogLevel.DEBUG, message, metadata)
};
