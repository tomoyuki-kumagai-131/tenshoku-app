import type { Favorite } from '@tenshoku/types';

// Mock favorites database
export const favorites: Favorite[] = [];

// Helper functions
export function getFavoritesByUserId(userId: string): Favorite[] {
  return favorites.filter((fav) => fav.userId === userId);
}

export function findFavorite(userId: string, jobId: string): Favorite | undefined {
  return favorites.find((fav) => fav.userId === userId && fav.jobId === jobId);
}

export function addFavorite(userId: string, jobId: string): Favorite {
  const existing = findFavorite(userId, jobId);
  if (existing) {
    return existing;
  }

  const favorite: Favorite = {
    id: `fav-${Date.now()}`,
    userId,
    jobId,
    createdAt: new Date().toISOString(),
  };

  favorites.push(favorite);
  return favorite;
}

export function removeFavorite(userId: string, jobId: string): boolean {
  const index = favorites.findIndex((fav) => fav.userId === userId && fav.jobId === jobId);
  if (index !== -1) {
    favorites.splice(index, 1);
    return true;
  }
  return false;
}

export function isFavorite(userId: string, jobId: string): boolean {
  return favorites.some((fav) => fav.userId === userId && fav.jobId === jobId);
}
