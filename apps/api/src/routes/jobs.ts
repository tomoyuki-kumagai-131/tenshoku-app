import { Hono, Context, Next } from 'hono';
import type { Job, JobApplication, ApplicationRequest, ApiResponse } from '@tenshoku/types';
import { findJobById, searchJobs, createApplication, getSession, getAllSkills } from '../mock';

type Variables = {
  userId: string;
};

const jobsRoute = new Hono<{ Variables: Variables }>();

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

// Get all unique skills
jobsRoute.get('/skills', authMiddleware, async (c) => {
  const skills = getAllSkills();
  return c.json({
    success: true,
    data: skills,
  });
});

// Get all jobs with pagination
jobsRoute.get('/', authMiddleware, async (c) => {
  const page = parseInt(c.req.query('page') || '1');
  const limit = parseInt(c.req.query('limit') || '9');
  const search = c.req.query('search') || '';
  const location = c.req.query('location') || '';
  const sort = (c.req.query('sort') || 'recommended') as 'newest' | 'recommended';
  const skillsParam = c.req.query('skills') || '';
  const skills = skillsParam ? skillsParam.split(',').filter(Boolean) : [];

  // Use helper function for search and pagination
  const result = searchJobs({ search, location, skills, page, limit, sort });

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return c.json({
    success: true,
    data: result,
  });
});

// Get job by id
jobsRoute.get('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  const job = findJobById(id);

  if (!job) {
    return c.json<ApiResponse<null>>(
      {
        success: false,
        error: '求人が見つかりません',
      },
      404
    );
  }

  return c.json<ApiResponse<Job>>({
    success: true,
    data: job,
  });
});

// Apply to job
jobsRoute.post('/:id/apply', authMiddleware, async (c) => {
  const jobId = c.req.param('id');
  const userId = c.get('userId');
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

  const body = await c.req.json<ApplicationRequest>();

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const application: JobApplication = {
    id: `app-${Date.now()}`,
    jobId,
    userId,
    name: body.name,
    phone: body.phone,
    address: body.address,
    message: body.message,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  createApplication(application);

  return c.json<ApiResponse<JobApplication>>({
    success: true,
    data: application,
  });
});

export default jobsRoute;
