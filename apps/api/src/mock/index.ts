// Re-export all mock data and helpers
export { users, findUserByEmail, findUserById, updateUser } from './users';
export type { UserWithPassword } from './users';

export { jobs, findJobById, searchJobs, getAllSkills } from './jobs';

export {
  applications,
  createApplication,
  findApplicationsByUserId,
  findApplicationsByJobId,
  findApplicationById,
} from './applications';

export {
  sessions,
  createSession,
  getSession,
  deleteSession,
  hasSession,
} from './sessions';

export {
  favorites,
  getFavoritesByUserId,
  findFavorite,
  addFavorite,
  removeFavorite,
  isFavorite,
} from './favorites';
