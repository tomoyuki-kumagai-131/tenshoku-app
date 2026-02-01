import { Hono, Context, Next } from 'hono';
import type { Favorite, Job, ApiResponse } from '@tenshoku/types';
import {
  getSession,
  getFavoritesByUserId,
  addFavorite,
  removeFavorite,
  isFavorite,
  findJobById,
} from '../mock';

type Variables = {
  userId: string;
};

const favoritesRoute = new Hono<{ Variables: Variables }>();

// Middleware to check authentication
const authMiddleware = async (c: Context<{ Variables: Variables }>, next: Next) => {
  const authHeader = c.req.header('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return c.json(
      {
        success: false,
        error: '認証が必要です',
      } as ApiResponse<null>,
      401
    );
  }

  const userId = getSession(token);
  if (!userId) {
    return c.json(
      {
        success: false,
        error: '認証が必要です',
      } as ApiResponse<null>,
      401
    );
  }

  c.set('userId', userId);
  await next();
};

// Get all favorites for current user
favoritesRoute.get('/', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const userFavorites = getFavoritesByUserId(userId);

  // Get job details for each favorite
  const favoritesWithJobs = userFavorites
    .map((fav) => {
      const job = findJobById(fav.jobId);
      return job ? { ...fav, job } : null;
    })
    .filter((item): item is Favorite & { job: Job } => item !== null);

  return c.json<ApiResponse<(Favorite & { job: Job })[]>>({
    success: true,
    data: favoritesWithJobs,
  });
});

// Check if a job is favorited
favoritesRoute.get('/check/:jobId', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const jobId = c.req.param('jobId');

  const favorited = isFavorite(userId, jobId);

  return c.json<ApiResponse<{ isFavorite: boolean }>>({
    success: true,
    data: { isFavorite: favorited },
  });
});

// Add a job to favorites
favoritesRoute.post('/:jobId', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const jobId = c.req.param('jobId');

  const job = findJobById(jobId);
  if (!job) {
    return c.json<ApiResponse<null>>(
      {
        success: false,
        error: '求人が見つかりません',
      },
      404
    );
  }

  const favorite = addFavorite(userId, jobId);

  return c.json<ApiResponse<Favorite>>({
    success: true,
    data: favorite,
  });
});

// Remove a job from favorites
favoritesRoute.delete('/:jobId', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const jobId = c.req.param('jobId');

  const removed = removeFavorite(userId, jobId);

  if (!removed) {
    return c.json<ApiResponse<null>>(
      {
        success: false,
        error: 'お気に入りが見つかりません',
      },
      404
    );
  }

  return c.json<ApiResponse<null>>({
    success: true,
  });
});

export default favoritesRoute;
