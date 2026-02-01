import { Hono } from 'hono';
import {
  getNotificationsByUserId,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
} from '../mock/notifications';

const notifications = new Hono();

// Get all notifications for current user
notifications.get('/', (c) => {
  // In real app, get user ID from auth
  const userId = '1';
  const items = getNotificationsByUserId(userId);
  const unreadCount = getUnreadCount(userId);

  return c.json({
    success: true,
    data: {
      notifications: items,
      unreadCount,
    },
  });
});

// Get unread count only
notifications.get('/unread-count', (c) => {
  const userId = '1';
  const count = getUnreadCount(userId);

  return c.json({
    success: true,
    data: { count },
  });
});

// Mark a notification as read
notifications.post('/:id/read', (c) => {
  const id = c.req.param('id');
  const notification = markAsRead(id);

  if (!notification) {
    return c.json({ success: false, error: 'Notification not found' }, 404);
  }

  return c.json({
    success: true,
    data: notification,
  });
});

// Mark all notifications as read
notifications.post('/read-all', (c) => {
  const userId = '1';
  markAllAsRead(userId);

  return c.json({
    success: true,
    data: null,
  });
});

export default notifications;
