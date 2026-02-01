// Token to user ID mapping (mock session store)
export const sessions: Map<string, string> = new Map();

// Helper functions
export function createSession(token: string, userId: string): void {
  sessions.set(token, userId);
}

export function getSession(token: string): string | undefined {
  return sessions.get(token);
}

export function deleteSession(token: string): boolean {
  return sessions.delete(token);
}

export function hasSession(token: string): boolean {
  return sessions.has(token);
}
