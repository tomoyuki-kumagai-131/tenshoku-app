import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { handle } from 'hono/vercel';

import authRoute from './routes/auth';
import usersRoute from './routes/users';
import jobsRoute from './routes/jobs';
import favoritesRoute from './routes/favorites';
import notificationsRoute from './routes/notifications';

const app = new Hono().basePath('/api');

// Middleware
app.use('*', logger());
app.use(
  '*',
  cors({
    origin: (origin) => origin || '*',
    credentials: true,
  })
);

// Health check
app.get('/', (c) => {
  return c.json({ status: 'ok', message: 'Tenshoku API is running' });
});

// Routes
app.route('/auth', authRoute);
app.route('/users', usersRoute);
app.route('/jobs', jobsRoute);
app.route('/favorites', favoritesRoute);
app.route('/notifications', notificationsRoute);

// For Vercel
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

// For local development
if (process.env.NODE_ENV !== 'production') {
  const { serve } = await import('@hono/node-server');
  const port = 4000;
  console.log(`Server is running on http://localhost:${port}`);
  serve({
    fetch: app.fetch,
    port,
  });
}

export default app;
