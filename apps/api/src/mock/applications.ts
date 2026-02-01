import type { JobApplication } from '@tenshoku/types';

// Mock applications database
export const applications: JobApplication[] = [];

// Helper functions
export function createApplication(application: JobApplication): JobApplication {
  applications.push(application);
  return application;
}

export function findApplicationsByUserId(userId: string): JobApplication[] {
  return applications.filter((app) => app.userId === userId);
}

export function findApplicationsByJobId(jobId: string): JobApplication[] {
  return applications.filter((app) => app.jobId === jobId);
}

export function findApplicationById(id: string): JobApplication | undefined {
  return applications.find((app) => app.id === id);
}
