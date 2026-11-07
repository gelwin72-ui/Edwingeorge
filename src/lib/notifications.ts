import { Directive } from '../types';

export function requestNotificationPermission() {
  if (typeof window !== 'undefined' && 'Notification' in window) {
    if (Notification.permission === 'default') {
      Notification.requestPermission().catch(console.error);
    }
  }
}

export function sendPushNotification(directive: Directive) {
  requestNotificationPermission();

  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(`🏫 ${directive.title}`, {
        body: directive.message,
        icon: '🚀',
        tag: directive.id
      });
    } catch (e) {
      console.warn('Native notification dispatch fallback', e);
    }
  }
}

export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return '•••••@gmail.com';
  const [user, domain] = email.split('@');
  if (user.length <= 2) return `${user[0]}*@${domain}`;
  return `${user[0]}***${user[user.length - 1]}@${domain}`;
}

export function hashCredential(str: string): string {
  if (!str) return '••••••••';
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `enc_${Math.abs(hash).toString(16)}_${str.length}c`;
}
