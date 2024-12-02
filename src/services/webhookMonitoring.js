import { ref, set, get } from 'firebase/database';
import { database } from '../config/firebase';

class WebhookMonitoring {
  constructor(userId) {
    this.userId = userId;
    this.baseRef = `webhook_metrics/${userId}`;
  }

  async logWebhookExecution(webhookId, data) {
    const timestamp = new Date().toISOString();
    const executionRef = ref(database, `${this.baseRef}/executions/${webhookId}/${timestamp}`);
    
    await set(executionRef, {
      ...data,
      timestamp,
      status: data.success ? 'success' : 'failure',
      responseTime: data.responseTime || 0,
      errorMessage: data.error || null
    });

    // Update aggregate metrics
    await this.updateAggregateMetrics(webhookId, data);
  }

  async updateAggregateMetrics(webhookId, data) {
    const metricsRef = ref(database, `${this.baseRef}/metrics/${webhookId}`);
    const metricsSnapshot = await get(metricsRef);
    const currentMetrics = metricsSnapshot.val() || {
      totalExecutions: 0,
      successCount: 0,
      failureCount: 0,
      averageResponseTime: 0,
      lastExecuted: null,
      lastStatus: null
    };

    const newMetrics = {
      totalExecutions: currentMetrics.totalExecutions + 1,
      successCount: currentMetrics.successCount + (data.success ? 1 : 0),
      failureCount: currentMetrics.failureCount + (data.success ? 0 : 1),
      averageResponseTime: (
        (currentMetrics.averageResponseTime * currentMetrics.totalExecutions + data.responseTime) /
        (currentMetrics.totalExecutions + 1)
      ),
      lastExecuted: new Date().toISOString(),
      lastStatus: data.success ? 'success' : 'failure'
    };

    await set(metricsRef, newMetrics);
  }

  async getWebhookMetrics(webhookId) {
    const metricsRef = ref(database, `${this.baseRef}/metrics/${webhookId}`);
    const metricsSnapshot = await get(metricsRef);
    return metricsSnapshot.val() || null;
  }

  async getRecentExecutions(webhookId, limit = 10) {
    const executionsRef = ref(database, `${this.baseRef}/executions/${webhookId}`);
    const executionsSnapshot = await get(executionsRef);
    const executions = executionsSnapshot.val() || {};
    
    return Object.entries(executions)
      .sort(([a], [b]) => b.localeCompare(a))
      .slice(0, limit)
      .map(([timestamp, data]) => ({
        timestamp,
        ...data
      }));
  }

  async getDailyStats(webhookId, days = 7) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const executionsRef = ref(database, `${this.baseRef}/executions/${webhookId}`);
    const executionsSnapshot = await get(executionsRef);
    const executions = executionsSnapshot.val() || {};

    const dailyStats = {};
    for (let i = 0; i < days; i++) {
      const date = new Date(endDate);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      dailyStats[dateStr] = {
        total: 0,
        success: 0,
        failure: 0,
        averageResponseTime: 0
      };
    }

    Object.entries(executions).forEach(([timestamp, data]) => {
      const date = new Date(timestamp).toISOString().split('T')[0];
      if (dailyStats[date]) {
        dailyStats[date].total++;
        if (data.status === 'success') {
          dailyStats[date].success++;
        } else {
          dailyStats[date].failure++;
        }
        dailyStats[date].averageResponseTime = (
          (dailyStats[date].averageResponseTime * (dailyStats[date].total - 1) + data.responseTime) /
          dailyStats[date].total
        );
      }
    });

    return dailyStats;
  }
}

export default WebhookMonitoring;
