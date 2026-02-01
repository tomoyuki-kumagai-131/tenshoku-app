export interface Notification {
  id: string;
  userId: string;
  type: 'application_viewed' | 'application_status' | 'new_job' | 'scout' | 'system';
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

// Mock notifications data
export const notifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'application_viewed',
    title: '応募書類が確認されました',
    message: '株式会社テックイノベーションがあなたの応募書類を確認しました。',
    link: '/mypage',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
  },
  {
    id: '2',
    userId: '1',
    type: 'scout',
    title: '新しいスカウトが届きました',
    message: 'グローバルソフト株式会社からスカウトメッセージが届いています。',
    link: '/mypage',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: '3',
    userId: '1',
    type: 'new_job',
    title: 'おすすめ求人があります',
    message: 'あなたのスキルにマッチした新着求人が5件あります。',
    link: '/jobs',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  },
  {
    id: '4',
    userId: '1',
    type: 'application_status',
    title: '選考が進みました',
    message: 'フューチャーテック株式会社の選考が次のステップに進みました。',
    link: '/mypage',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: '5',
    userId: '1',
    type: 'system',
    title: 'プロフィールを更新しましょう',
    message: 'プロフィールを充実させると、スカウトが届きやすくなります。',
    link: '/mypage',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
];

export function getNotificationsByUserId(userId: string): Notification[] {
  return notifications
    .filter((n) => n.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getUnreadCount(userId: string): number {
  return notifications.filter((n) => n.userId === userId && !n.isRead).length;
}

export function markAsRead(notificationId: string): Notification | undefined {
  const notification = notifications.find((n) => n.id === notificationId);
  if (notification) {
    notification.isRead = true;
  }
  return notification;
}

export function markAllAsRead(userId: string): void {
  notifications.forEach((n) => {
    if (n.userId === userId) {
      n.isRead = true;
    }
  });
}
