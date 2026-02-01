// User types
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  createdAt: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  address: string;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Job types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
  employmentType: string;
  imageUrl: string;
  createdAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  name: string;
  phone: string;
  address: string;
  message: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface ApplicationRequest {
  name: string;
  phone: string;
  address: string;
  message: string;
}

// Favorite types
export interface Favorite {
  id: string;
  userId: string;
  jobId: string;
  createdAt: string;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: 'application_viewed' | 'application_status' | 'new_job' | 'scout' | 'system';
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
