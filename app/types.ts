import * as v from 'valibot';
import { TokenSchema, UserSchema } from '~/constants/user';

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

export type Children = React.ReactNode | React.ReactNode[];

export type User = v.InferOutput<typeof UserSchema>;
export type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN";
export type Token = v.InferOutput<typeof TokenSchema>;

export type FooterDialogType = 'faq' | 'inquiry' | 'guide' | 'terms' | 'privacy' | 'accessibility';

export interface FooterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface PostVerifyEmailParams {
  email: string;
  code: string;
}