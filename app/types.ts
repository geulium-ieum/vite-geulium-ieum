import * as v from 'valibot';
import type { TokenSchema, UserSchema } from '~/constants/user';
import type { MemorialFilterSchema } from '~/constants/memorial';

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

export interface Notification {
  id: string;
  type: 'memorial' | 'offering' | 'family-invite' | 'anniversary' | 'announcement';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  relatedId?: string;
}

// Common
export type Children = React.ReactNode | React.ReactNode[];
export interface ListParams {
  page?: number;
  size?: number;
  sort?: (
    'deceasedName' |
    'birthDate' |
    'deathDate' |
    'location' |
    'biography' |
    'photoUrl' |
    'visibility' |
    'status' |
    'rejectionReason' |
    'approvedBy' |
    'approvedAt' |
    'createdBy' |
    'updatedBy' |
    'createdAt' |
    'updatedAt'
  )[];
}

// User
export type User = v.InferOutput<typeof UserSchema>;
export type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN";

// Memorial
export type MemorialFilter = v.InferOutput<typeof MemorialFilterSchema>;
export interface MemorialFilterProps extends ListParams {
  name: string;
  birthDate: string;
  deathDate: string;
}

export type Token = v.InferOutput<typeof TokenSchema>;

export type FooterDialogType = 'faq' | 'inquiry' | 'guide' | 'terms' | 'privacy' | 'accessibility';

export interface FooterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface PostRegisterParams {
  email: string;
  password: string;
  phone: string;
  name: string;
}

export interface PostVerifyEmailParams {
  email: string;
  code: string;
}

export interface PostLoginParams {
  email: string;
  password: string;
}