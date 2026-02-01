import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import authRoute from './routes/auth';
import usersRoute from './routes/users';
import jobsRoute from './routes/jobs';
import favoritesRoute from './routes/favorites';
import notificationsRoute from './routes/notifications';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use(
  '*',
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  })
);

// Health check
app.get('/', (c) => {
  return c.json({ status: 'ok', message: 'Tenshoku API is running' });
});

// Routes
app.route('/api/auth', authRoute);
app.route('/api/users', usersRoute);
app.route('/api/jobs', jobsRoute);
app.route('/api/favorites', favoritesRoute);
app.route('/api/notifications', notificationsRoute);

const port = 4000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
