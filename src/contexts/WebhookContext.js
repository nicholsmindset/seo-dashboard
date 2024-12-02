import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { database } from '../config/firebase';
import { ref, set, onValue, remove } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from './AuthContext';

const WebhookContext = createContext();

export const useWebhooks = () => {
  const context = useContext(WebhookContext);
  if (!context) {
    throw new Error('useWebhooks must be used within a WebhookProvider');
  }
  return context;
};

export const WebhookProvider = ({ children }) => {
  const [webhooks, setWebhooks] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser?.uid) return;

    const webhooksRef = ref(database, `webhooks/${currentUser.uid}`);
    const unsubscribe = onValue(webhooksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const webhookList = Object.entries(data).map(([id, webhook]) => ({
          id,
          ...webhook,
        }));
        setWebhooks(webhookList);
      } else {
        setWebhooks([]);
      }
    });

    return () => unsubscribe();
  }, [currentUser?.uid]);

  const addWebhook = useCallback(async (webhookData) => {
    if (!currentUser?.uid) return;

    const webhookId = uuidv4();
    const newWebhook = {
      ...webhookData,
      createdAt: new Date().toISOString(),
      lastTriggered: null,
      status: 'active'
    };

    try {
      await set(ref(database, `webhooks/${currentUser.uid}/${webhookId}`), newWebhook);
      return { success: true, id: webhookId };
    } catch (error) {
      console.error('Error adding webhook:', error);
      return { success: false, error: error.message };
    }
  }, [currentUser?.uid]);

  const updateWebhook = useCallback(async (webhookId, updates) => {
    if (!currentUser?.uid) return;

    try {
      const webhookRef = ref(database, `webhooks/${currentUser.uid}/${webhookId}`);
      await set(webhookRef, {
        ...webhooks.find(w => w.id === webhookId),
        ...updates,
        updatedAt: new Date().toISOString()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating webhook:', error);
      return { success: false, error: error.message };
    }
  }, [currentUser?.uid, webhooks]);

  const deleteWebhook = useCallback(async (webhookId) => {
    if (!currentUser?.uid) return;

    try {
      await remove(ref(database, `webhooks/${currentUser.uid}/${webhookId}`));
      return { success: true };
    } catch (error) {
      console.error('Error deleting webhook:', error);
      return { success: false, error: error.message };
    }
  }, [currentUser?.uid]);

  const testWebhook = useCallback(async (webhookId) => {
    const webhook = webhooks.find(w => w.id === webhookId);
    if (!webhook) return { success: false, error: 'Webhook not found' };

    try {
      const response = await fetch(webhook.url, {
        method: webhook.method || 'POST',
        headers: webhook.headers ? JSON.parse(webhook.headers) : {
          'Content-Type': 'application/json',
        },
        body: webhook.body ? JSON.parse(webhook.body) : JSON.stringify({
          test: true,
          timestamp: new Date().toISOString()
        })
      });

      const success = response.ok;
      await updateWebhook(webhookId, {
        lastTested: new Date().toISOString(),
        lastTestStatus: success ? 'success' : 'failed',
        lastTestResponse: await response.text()
      });

      return { success, status: response.status };
    } catch (error) {
      console.error('Error testing webhook:', error);
      await updateWebhook(webhookId, {
        lastTested: new Date().toISOString(),
        lastTestStatus: 'failed',
        lastTestError: error.message
      });
      return { success: false, error: error.message };
    }
  }, [webhooks, updateWebhook]);

  const value = {
    webhooks,
    addWebhook,
    updateWebhook,
    deleteWebhook,
    testWebhook
  };

  return (
    <WebhookContext.Provider value={value}>
      {children}
    </WebhookContext.Provider>
  );
};
