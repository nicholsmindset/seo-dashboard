import { toast } from 'react-toastify';
import { ref, push, serverTimestamp } from 'firebase/database';
import { database } from '../config/firebase';

class NotificationService {
  constructor(userId) {
    this.userId = userId;
    this.notificationsRef = ref(database, `notifications/${userId}`);
  }

  // Severity levels
  static SEVERITY = {
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical'
  };

  // Notification categories
  static CATEGORY = {
    WEBHOOK: 'webhook',
    SECURITY: 'security',
    SYSTEM: 'system',
    CONTENT: 'content',
    SEO: 'seo'
  };

  async notify({ 
    title,
    message,
    severity = NotificationService.SEVERITY.INFO,
    category = NotificationService.CATEGORY.SYSTEM,
    metadata = {},
    toast: showToast = true,
    persistent = true
  }) {
    const notification = {
      title,
      message,
      severity,
      category,
      metadata,
      timestamp: serverTimestamp(),
      read: false
    };

    // Store in Firebase if persistent
    if (persistent) {
      try {
        await push(this.notificationsRef, notification);
      } catch (error) {
        console.error('Error storing notification:', error);
      }
    }

    // Show toast notification if requested
    if (showToast) {
      this.showToast(notification);
    }

    return notification;
  }

  showToast(notification) {
    const toastOptions = {
      position: 'bottom-right',
      autoClose: this.getAutoCloseTime(notification.severity),
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    };

    const content = (
      <div>
        <strong>{notification.title}</strong>
        <div>{notification.message}</div>
      </div>
    );

    switch (notification.severity) {
      case NotificationService.SEVERITY.SUCCESS:
        toast.success(content, toastOptions);
        break;
      case NotificationService.SEVERITY.WARNING:
        toast.warning(content, toastOptions);
        break;
      case NotificationService.SEVERITY.ERROR:
      case NotificationService.SEVERITY.CRITICAL:
        toast.error(content, toastOptions);
        break;
      default:
        toast.info(content, toastOptions);
    }
  }

  getAutoCloseTime(severity) {
    switch (severity) {
      case NotificationService.SEVERITY.ERROR:
        return 10000; // 10 seconds
      case NotificationService.SEVERITY.CRITICAL:
        return false; // Don't auto-close
      case NotificationService.SEVERITY.WARNING:
        return 7000; // 7 seconds
      default:
        return 5000; // 5 seconds
    }
  }

  // Webhook-specific notifications
  async notifyWebhookSuccess(webhookName, metadata = {}) {
    return this.notify({
      title: 'Webhook Success',
      message: `Successfully executed webhook: ${webhookName}`,
      severity: NotificationService.SEVERITY.SUCCESS,
      category: NotificationService.CATEGORY.WEBHOOK,
      metadata
    });
  }

  async notifyWebhookFailure(webhookName, error, metadata = {}) {
    return this.notify({
      title: 'Webhook Failed',
      message: `Failed to execute webhook: ${webhookName}. Error: ${error}`,
      severity: NotificationService.SEVERITY.ERROR,
      category: NotificationService.CATEGORY.WEBHOOK,
      metadata: { ...metadata, error }
    });
  }

  async notifyWebhookRetry(webhookName, attempt, metadata = {}) {
    return this.notify({
      title: 'Webhook Retry',
      message: `Retrying webhook: ${webhookName} (Attempt ${attempt})`,
      severity: NotificationService.SEVERITY.WARNING,
      category: NotificationService.CATEGORY.WEBHOOK,
      metadata: { ...metadata, attempt }
    });
  }

  // Security notifications
  async notifySecurityEvent(title, message, metadata = {}) {
    return this.notify({
      title,
      message,
      severity: NotificationService.SEVERITY.WARNING,
      category: NotificationService.CATEGORY.SECURITY,
      metadata,
      toast: true,
      persistent: true
    });
  }

  // System notifications
  async notifySystemEvent(title, message, severity = NotificationService.SEVERITY.INFO) {
    return this.notify({
      title,
      message,
      severity,
      category: NotificationService.CATEGORY.SYSTEM,
      toast: true,
      persistent: true
    });
  }

  // Content-related notifications
  async notifyContentEvent(title, message, metadata = {}) {
    return this.notify({
      title,
      message,
      severity: NotificationService.SEVERITY.INFO,
      category: NotificationService.CATEGORY.CONTENT,
      metadata,
      toast: true,
      persistent: true
    });
  }

  // SEO-related notifications
  async notifySEOEvent(title, message, metadata = {}) {
    return this.notify({
      title,
      message,
      severity: NotificationService.SEVERITY.INFO,
      category: NotificationService.CATEGORY.SEO,
      metadata,
      toast: true,
      persistent: true
    });
  }
}

export default NotificationService;
