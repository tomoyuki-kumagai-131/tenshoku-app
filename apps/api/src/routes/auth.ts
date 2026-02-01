import { Hono } from 'hono';
import type { LoginRequest, LoginResponse, ApiResponse } from '@tenshoku/types';
import { findUserByEmail, createSession, deleteSession } from '../mock';

const auth = new Hono();

// Login
auth.post('/login', async (c) => {
  const body = await c.req.json<LoginRequest>();
  const { email, password } = body;

  // Find user by email
  const foundUser = findUserByEmail(email);

  if (!foundUser || foundUser.password !== password) {
    return c.json<ApiResponse<null>>(
      {
        success: false,
        error: 'メールアドレスまたはパスワードが正しくありません',
      },
      401
    );
  }

  // Generate mock token
  const token = `mock-token-${Date.now()}-${Math.random().toString(36).substring(7)}`;
  createSession(token, foundUser.id);

  const { password: _, ...userWithoutPassword } = foundUser;

  return c.json<ApiResponse<LoginResponse>>({
    success: true,
    data: {
      token,
      user: userWithoutPassword,
    },
  });
});

// Logout
auth.post('/logout', async (c) => {
  const authHeader = c.req.header('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (token) {
    deleteSession(token);
  }

  return c.json<ApiResponse<null>>({
    success: true,
  });
});

export default auth;
