import { ref, set } from 'firebase/database';
import { database } from '../config/firebase';
import NotificationService from './notificationService';

class WebhookRetryService {
  constructor(userId) {
    this.userId = userId;
    this.maxRetries = 3;
    this.baseDelay = 1000; // 1 second
    this.notifications = new NotificationService(userId);
  }

  async executeWithRetry(webhook, payload) {
    let attempt = 0;
    let lastError = null;

    while (attempt < this.maxRetries) {
      try {
        if (attempt > 0) {
          await this.notifications.notifyWebhookRetry(webhook.name, attempt + 1, {
            webhookId: webhook.id,
            url: webhook.url
          });
        }

        const startTime = Date.now();
        const response = await fetch(webhook.url, {
          method: webhook.method,
          headers: this.parseHeaders(webhook.headers, payload),
          body: this.parseBody(webhook.body, payload)
        });

        const responseTime = Date.now() - startTime;
        const responseData = await response.text();

        if (response.ok) {
          await this.logSuccess(webhook.id, {
            attempt,
            responseTime,
            responseData
          });

          await this.notifications.notifyWebhookSuccess(webhook.name, {
            webhookId: webhook.id,
            responseTime,
            attempts: attempt + 1
          });

          return {
            success: true,
            responseTime,
            responseData
          };
        }

        lastError = new Error(`HTTP ${response.status}: ${responseData}`);
        await this.handleFailure(webhook.id, lastError, attempt, responseTime);
      } catch (error) {
        lastError = error;
        await this.handleFailure(webhook.id, error, attempt);
      }

      attempt++;
      if (attempt < this.maxRetries) {
        await this.delay(this.getBackoffDelay(attempt));
      }
    }

    // Final failure notification after all retries
    await this.notifications.notifyWebhookFailure(webhook.name, lastError.message, {
      webhookId: webhook.id,
      attempts: attempt,
      finalError: lastError.message
    });

    return {
      success: false,
      error: lastError.message,
      attempts: attempt
    };
  }

  parseHeaders(headers, payload) {
    if (typeof headers === 'string') {
      headers = JSON.parse(headers);
    }
    return Object.entries(headers).reduce((acc, [key, value]) => {
      acc[key] = this.interpolateValue(value, payload);
      return acc;
    }, {});
  }

  parseBody(body, payload) {
    if (!body) return null;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }
    return JSON.stringify(this.interpolateObject(body, payload));
  }

  interpolateObject(obj, payload) {
    if (typeof obj !== 'object') {
      return this.interpolateValue(obj, payload);
    }

    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (typeof value === 'object' && value !== null) {
        acc[key] = this.interpolateObject(value, payload);
      } else {
        acc[key] = this.interpolateValue(value, payload);
      }
      return acc;
    }, Array.isArray(obj) ? [] : {});
  }

  interpolateValue(value, payload) {
    if (typeof value !== 'string') return value;
    return value.replace(/\${(\w+)}/g, (match, key) => {
      return payload[key] || match;
    });
  }

  async handleFailure(webhookId, error, attempt, responseTime = 0) {
    const timestamp = new Date().toISOString();
    const failureRef = ref(database, `webhook_failures/${this.userId}/${webhookId}/${timestamp}`);
    
    await set(failureRef, {
      error: error.message,
      attempt,
      timestamp,
      responseTime,
      nextRetryDelay: attempt < this.maxRetries ? this.getBackoffDelay(attempt) : null
    });
  }

  async logSuccess(webhookId, data) {
    const timestamp = new Date().toISOString();
    const successRef = ref(database, `webhook_successes/${this.userId}/${webhookId}/${timestamp}`);
    
    await set(successRef, {
      ...data,
      timestamp
    });
  }

  getBackoffDelay(attempt) {
    // Exponential backoff with jitter
    const exponentialDelay = this.baseDelay * Math.pow(2, attempt);
    const jitter = Math.random() * 1000; // Random delay between 0-1000ms
    return exponentialDelay + jitter;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default WebhookRetryService;
