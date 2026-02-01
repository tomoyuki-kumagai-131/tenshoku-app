import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handle } from 'hono/vercel';

// Import mock data and types
import type {
  User,
  Job,
  JobApplication,
  Favorite,
  Notification,
  ApiResponse,
} from '@tenshoku/types';

// ============== Mock Data ==============

const users: User[] = [
  {
    id: '1',
    email: 'test@example.com',
    name: 'テスト太郎',
    phone: '090-1234-5678',
    address: '東京都渋谷区',
    createdAt: '2024-01-15T00:00:00Z',
  },
];

const jobs: Job[] = [
  {
    id: '1',
    title: 'シニアフロントエンドエンジニア',
    company: '株式会社テックイノベーション',
    location: '東京都渋谷区',
    salary: '600万円〜900万円',
    employmentType: '正社員',
    description: 'モダンなフロントエンド技術を駆使して、ユーザー体験を向上させるWebアプリケーションの開発をリードしていただきます。React/TypeScriptを中心とした開発環境で、チームと協力しながらプロダクトを成長させていく役割です。',
    requirements: '・React/TypeScriptでの開発経験3年以上\n・チーム開発経験\n・コードレビューの経験\n・パフォーマンス最適化の知識',
    skills: ['React', 'TypeScript', 'Next.js', 'GraphQL'],
    benefits: '・フルリモートワーク可\n・フレックスタイム制\n・書籍購入補助\n・カンファレンス参加支援',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    createdAt: '2024-01-20T00:00:00Z',
  },
  {
    id: '2',
    title: 'バックエンドエンジニア',
    company: '株式会社クラウドソリューションズ',
    location: '大阪府大阪市',
    salary: '500万円〜800万円',
    employmentType: '正社員',
    description: 'クラウドネイティブなバックエンドシステムの設計・開発を担当していただきます。マイクロサービスアーキテクチャの構築や、APIの設計・実装が主な業務です。',
    requirements: '・バックエンド開発経験3年以上\n・Go または Python での開発経験\n・RDBMSの設計・運用経験\n・クラウドサービス(AWS/GCP)の利用経験',
    skills: ['Go', 'Python', 'AWS', 'Kubernetes', 'PostgreSQL'],
    benefits: '・リモートワーク週3日\n・技術書籍購入制度\n・資格取得支援\n・副業OK',
    imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800',
    createdAt: '2024-01-19T00:00:00Z',
  },
  {
    id: '3',
    title: 'フルスタックエンジニア',
    company: 'グローバルテック株式会社',
    location: 'フルリモート',
    salary: '550万円〜850万円',
    employmentType: '正社員',
    description: 'フロントエンドからバックエンドまで幅広く開発を担当していただきます。新規プロダクトの立ち上げから運用まで、一貫して関わることができます。',
    requirements: '・Web開発経験3年以上\n・フロントエンド・バックエンド両方の経験\n・自走できる方\n・英語でのコミュニケーション（読み書き程度）',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
    benefits: '・完全フルリモート\n・フレックスタイム\n・年間休日125日\n・ストックオプション制度',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    createdAt: '2024-01-18T00:00:00Z',
  },
  {
    id: '4',
    title: 'モバイルアプリエンジニア',
    company: '株式会社アプリファクトリー',
    location: '東京都港区',
    salary: '500万円〜750万円',
    employmentType: '正社員',
    description: 'iOS/Androidアプリの開発を担当していただきます。React Nativeを使用したクロスプラットフォーム開発がメインとなります。',
    requirements: '・モバイルアプリ開発経験2年以上\n・React Native または Flutter の経験\n・ストアへのリリース経験\n・UI/UXへの関心',
    skills: ['React Native', 'TypeScript', 'iOS', 'Android'],
    benefits: '・リモートワーク可\n・最新デバイス支給\n・勉強会参加支援\n・健康診断充実',
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800',
    createdAt: '2024-01-17T00:00:00Z',
  },
  {
    id: '5',
    title: 'データサイエンティスト',
    company: '株式会社AIラボ',
    location: '東京都千代田区',
    salary: '700万円〜1200万円',
    employmentType: '正社員',
    description: '機械学習モデルの構築・運用、データ分析基盤の整備を担当していただきます。ビジネス課題を解決するためのデータ活用を推進する役割です。',
    requirements: '・データサイエンス実務経験3年以上\n・Python/Rでの分析経験\n・機械学習モデルの構築経験\n・ビジネスサイドとの折衝経験',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'AWS'],
    benefits: '・フレックスタイム\n・論文投稿支援\n・GPU環境完備\n・学会参加費用支給',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    createdAt: '2024-01-16T00:00:00Z',
  },
  {
    id: '6',
    title: 'DevOpsエンジニア',
    company: '株式会社インフラマスター',
    location: '福岡県福岡市',
    salary: '550万円〜800万円',
    employmentType: '正社員',
    description: 'CI/CDパイプラインの構築・運用、インフラの自動化を担当していただきます。開発チームの生産性向上に貢献する重要なポジションです。',
    requirements: '・インフラ/DevOps経験3年以上\n・Terraform/Ansibleの経験\n・Kubernetes運用経験\n・監視・ログ基盤の構築経験',
    skills: ['Kubernetes', 'Terraform', 'AWS', 'Docker', 'GitHub Actions'],
    benefits: '・リモートワーク中心\n・資格手当あり\n・技術カンファレンス登壇支援\n・副業OK',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    createdAt: '2024-01-15T00:00:00Z',
  },
];

let favorites: Favorite[] = [];

const notifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'application_viewed',
    title: '応募書類が確認されました',
    message: '株式会社テックイノベーションがあなたの応募書類を確認しました。',
    isRead: false,
    link: '/jobs/1',
    createdAt: '2024-01-21T10:00:00Z',
  },
  {
    id: '2',
    userId: '1',
    type: 'new_job',
    title: '新着求人のお知らせ',
    message: 'あなたのスキルにマッチした求人が5件追加されました。',
    isRead: false,
    link: '/jobs',
    createdAt: '2024-01-20T15:00:00Z',
  },
  {
    id: '3',
    userId: '1',
    type: 'scout',
    title: 'スカウトが届きました',
    message: 'グローバルテック株式会社からスカウトメッセージが届いています。',
    isRead: true,
    link: '/jobs/3',
    createdAt: '2024-01-19T09:00:00Z',
  },
];

const sessions = new Map<string, string>();
const applications: JobApplication[] = [];

// ============== Hono App ==============

const app = new Hono().basePath('/api');

app.use('*', cors({ origin: (origin) => origin || '*', credentials: true }));

// Helper
function success<T>(data: T): ApiResponse<T> {
  return { success: true, data };
}

function error(message: string): ApiResponse<null> {
  return { success: false, error: message };
}

function getUserFromToken(authHeader: string | undefined): User | null {
  if (!authHeader?.startsWith('Bearer ')) return null;
  const token = authHeader.substring(7);
  const userId = sessions.get(token);
  return userId ? users.find((u) => u.id === userId) || null : null;
}

// Auth routes
app.post('/auth/login', async (c) => {
  const { email, password } = await c.req.json();
  if (email === 'test@example.com' && password === 'password') {
    const user = users[0];
    const token = `token_${Date.now()}`;
    sessions.set(token, user.id);
    return c.json(success({ user, token }));
  }
  return c.json(error('Invalid credentials'), 401);
});

app.post('/auth/logout', (c) => {
  const token = c.req.header('Authorization')?.substring(7);
  if (token) sessions.delete(token);
  return c.json(success(null));
});

// Users routes
app.get('/users/me', (c) => {
  const user = getUserFromToken(c.req.header('Authorization'));
  if (!user) return c.json(error('Unauthorized'), 401);
  return c.json(success(user));
});

app.put('/users/me', async (c) => {
  const user = getUserFromToken(c.req.header('Authorization'));
  if (!user) return c.json(error('Unauthorized'), 401);
  const { name, phone, address } = await c.req.json();
  Object.assign(user, { name: name ?? user.name, phone: phone ?? user.phone, address: address ?? user.address });
  return c.json(success(user));
});

// Jobs routes
app.get('/jobs', (c) => {
  const page = parseInt(c.req.query('page') || '1');
  const limit = parseInt(c.req.query('limit') || '10');
  const search = c.req.query('search')?.toLowerCase();
  const location = c.req.query('location');
  const skillsParam = c.req.query('skills');
  const skills = skillsParam ? skillsParam.split(',') : [];

  let filtered = [...jobs];
  if (search) {
    filtered = filtered.filter(
      (j) => j.title.toLowerCase().includes(search) || j.company.toLowerCase().includes(search) || j.description.toLowerCase().includes(search)
    );
  }
  if (location) {
    filtered = filtered.filter((j) => j.location.includes(location));
  }
  if (skills.length > 0) {
    filtered = filtered.filter((j) => skills.some((s) => j.skills.includes(s)));
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return c.json(
    success({
      jobs: paginated,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit), hasMore: start + limit < total },
    })
  );
});

app.get('/jobs/skills', (c) => {
  const allSkills = [...new Set(jobs.flatMap((j) => j.skills))];
  return c.json(success(allSkills));
});

app.get('/jobs/:id', (c) => {
  const job = jobs.find((j) => j.id === c.req.param('id'));
  if (!job) return c.json(error('Job not found'), 404);
  return c.json(success(job));
});

app.post('/jobs/:id/apply', async (c) => {
  const user = getUserFromToken(c.req.header('Authorization'));
  if (!user) return c.json(error('Unauthorized'), 401);
  const jobId = c.req.param('id');
  const job = jobs.find((j) => j.id === jobId);
  if (!job) return c.json(error('Job not found'), 404);
  const { name, phone, address, message } = await c.req.json();
  const application: JobApplication = {
    id: `app_${Date.now()}`,
    userId: user.id,
    jobId,
    name,
    phone,
    address,
    message,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  applications.push(application);
  return c.json(success(application));
});

// Favorites routes
app.get('/favorites', (c) => {
  const user = getUserFromToken(c.req.header('Authorization'));
  if (!user) return c.json(error('Unauthorized'), 401);
  const userFavorites = favorites
    .filter((f) => f.userId === user.id)
    .map((f) => ({ ...f, job: jobs.find((j) => j.id === f.jobId)! }))
    .filter((f) => f.job);
  return c.json(success(userFavorites));
});

app.get('/favorites/check/:jobId', (c) => {
  const user = getUserFromToken(c.req.header('Authorization'));
  if (!user) return c.json(error('Unauthorized'), 401);
  const isFavorite = favorites.some((f) => f.userId === user.id && f.jobId === c.req.param('jobId'));
  return c.json(success({ isFavorite }));
});

app.post('/favorites/:jobId', (c) => {
  const user = getUserFromToken(c.req.header('Authorization'));
  if (!user) return c.json(error('Unauthorized'), 401);
  const jobId = c.req.param('jobId');
  if (!favorites.some((f) => f.userId === user.id && f.jobId === jobId)) {
    const favorite: Favorite = { id: `fav_${Date.now()}`, userId: user.id, jobId, createdAt: new Date().toISOString() };
    favorites.push(favorite);
    return c.json(success(favorite));
  }
  return c.json(success(favorites.find((f) => f.userId === user.id && f.jobId === jobId)!));
});

app.delete('/favorites/:jobId', (c) => {
  const user = getUserFromToken(c.req.header('Authorization'));
  if (!user) return c.json(error('Unauthorized'), 401);
  favorites = favorites.filter((f) => !(f.userId === user.id && f.jobId === c.req.param('jobId')));
  return c.json(success(null));
});

// Notifications routes
app.get('/notifications', (c) => {
  const user = getUserFromToken(c.req.header('Authorization'));
  if (!user) return c.json(error('Unauthorized'), 401);
  const userNotifications = notifications.filter((n) => n.userId === user.id);
  const unreadCount = userNotifications.filter((n) => !n.isRead).length;
  return c.json(success({ notifications: userNotifications, unreadCount }));
});

app.post('/notifications/:id/read', (c) => {
  const user = getUserFromToken(c.req.header('Authorization'));
  if (!user) return c.json(error('Unauthorized'), 401);
  const notification = notifications.find((n) => n.id === c.req.param('id') && n.userId === user.id);
  if (!notification) return c.json(error('Not found'), 404);
  notification.isRead = true;
  return c.json(success(notification));
});

app.post('/notifications/read-all', (c) => {
  const user = getUserFromToken(c.req.header('Authorization'));
  if (!user) return c.json(error('Unauthorized'), 401);
  notifications.filter((n) => n.userId === user.id).forEach((n) => (n.isRead = true));
  return c.json(success(null));
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
