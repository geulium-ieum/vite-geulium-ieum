export type Page = 
  | 'home'
  | 'login'
  | 'register'
  | 'search'
  | 'memorial'
  | 'mypage'
  | 'admin-dashboard'
  | 'admin-mypage'
  | 'family-groups'
  | 'notifications'
  | 'announcements';

export type UserRole = 'user' | 'admin' | 'super-admin' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Notification {
  id: string;
  type: 'memorial' | 'offering' | 'family-invite' | 'anniversary' | 'announcement';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  relatedId?: string;
}
