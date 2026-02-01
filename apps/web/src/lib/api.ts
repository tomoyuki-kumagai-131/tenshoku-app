import type {
  User,
  Job,
  JobApplication,
  LoginRequest,
  LoginResponse,
  UserProfile,
  ApplicationRequest,
  ApiResponse,
  Favorite,
  Notification,
} from '@tenshoku/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

export interface PaginatedJobsResponse {
  jobs: Job[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export interface JobsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  location?: string;
  skills?: string[];
  sort?: 'newest' | 'recommended';
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error || `HTTP error: ${response.status}`,
      };
    }

    return response.json();
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

export const authApi = {
  login: (data: LoginRequest) =>
    fetchApi<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  logout: () =>
    fetchApi<null>('/auth/logout', {
      method: 'POST',
    }),
};

export const userApi = {
  getMe: () => fetchApi<User>('/users/me'),

  updateProfile: (data: UserProfile) =>
    fetchApi<User>('/users/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

export const jobApi = {
  getAll: (params: JobsQueryParams = {}) => {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set('page', params.page.toString());
    if (params.limit) searchParams.set('limit', params.limit.toString());
    if (params.search) searchParams.set('search', params.search);
    if (params.location) searchParams.set('location', params.location);
    if (params.skills && params.skills.length > 0) searchParams.set('skills', params.skills.join(','));
    if (params.sort) searchParams.set('sort', params.sort);

    const queryString = searchParams.toString();
    return fetchApi<PaginatedJobsResponse>(`/jobs${queryString ? `?${queryString}` : ''}`);
  },

  getById: (id: string) => fetchApi<Job>(`/jobs/${id}`),

  getSkills: () => fetchApi<string[]>('/jobs/skills'),

  apply: (jobId: string, data: ApplicationRequest) =>
    fetchApi<JobApplication>(`/jobs/${jobId}/apply`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export type FavoriteWithJob = Favorite & { job: Job };

export const favoriteApi = {
  getAll: () => fetchApi<FavoriteWithJob[]>('/favorites'),

  check: (jobId: string) => fetchApi<{ isFavorite: boolean }>(`/favorites/check/${jobId}`),

  add: (jobId: string) =>
    fetchApi<Favorite>(`/favorites/${jobId}`, {
      method: 'POST',
    }),

  remove: (jobId: string) =>
    fetchApi<null>(`/favorites/${jobId}`, {
      method: 'DELETE',
    }),
};

export interface NotificationsResponse {
  notifications: Notification[];
  unreadCount: number;
}

export const notificationApi = {
  getAll: () => fetchApi<NotificationsResponse>('/notifications'),

  getUnreadCount: () => fetchApi<{ count: number }>('/notifications/unread-count'),

  markAsRead: (id: string) =>
    fetchApi<Notification>(`/notifications/${id}/read`, {
      method: 'POST',
    }),

  markAllAsRead: () =>
    fetchApi<null>('/notifications/read-all', {
      method: 'POST',
    }),
};
