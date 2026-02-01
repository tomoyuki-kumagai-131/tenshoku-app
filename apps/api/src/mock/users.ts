import type { User } from '@tenshoku/types';

export type UserWithPassword = User & { password: string };

// Mock users database
export const users: Map<string, UserWithPassword> = new Map([
  [
    'user-1',
    {
      id: 'user-1',
      email: 'test@example.com',
      password: 'password',
      name: '山田 太郎',
      phone: '090-1234-5678',
      address: '東京都渋谷区神南1-2-3 テックビル501',
      createdAt: '2024-01-01T00:00:00Z',
    },
  ],
]);

// Helper functions
export function findUserByEmail(email: string): UserWithPassword | undefined {
  for (const user of users.values()) {
    if (user.email === email) {
      return user;
    }
  }
  return undefined;
}

export function findUserById(id: string): UserWithPassword | undefined {
  return users.get(id);
}

export function updateUser(id: string, data: Partial<User>): User | undefined {
  const user = users.get(id);
  if (!user) return undefined;

  const updated = { ...user, ...data };
  users.set(id, updated);

  const { password: _, ...userWithoutPassword } = updated;
  return userWithoutPassword;
}
