import { Hono, Context, Next } from 'hono';
import type { User, UserProfile, ApiResponse } from '@tenshoku/types';
import { findUserById, updateUser, getSession } from '../mock';

type Variables = {
  userId: string;
};

const usersRoute = new Hono<{ Variables: Variables }>();

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

// Get current user
usersRoute.get('/me', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const user = findUserById(userId);

  if (!user) {
    return c.json<ApiResponse<null>>(
      {
        success: false,
        error: 'ユーザーが見つかりません',
      },
      404
    );
  }

  const { password: _, ...userWithoutPassword } = user;

  return c.json<ApiResponse<User>>({
    success: true,
    data: userWithoutPassword,
  });
});

// Update current user profile
usersRoute.put('/me', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const body = await c.req.json<UserProfile>();

  const updated = updateUser(userId, {
    name: body.name,
    phone: body.phone,
    address: body.address,
  });

  if (!updated) {
    return c.json<ApiResponse<null>>(
      {
        success: false,
        error: 'ユーザーが見つかりません',
      },
      404
    );
  }

  return c.json<ApiResponse<User>>({
    success: true,
    data: updated,
  });
});

export default usersRoute;
