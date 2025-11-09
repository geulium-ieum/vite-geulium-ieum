import { Bell, Heart, MessageSquare, Users, Calendar, FileText, Check, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { User as UserType, Notification, Page } from '@/types';
import { Footer } from '@/components/Footer';

interface NotificationCenterProps {
  user: UserType | null;
  notifications: Notification[];
  onNavigate: (page: Page) => void;
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllAsRead: () => void;
}

export function NotificationCenter({
  notifications, 
  onNavigate, 
  onMarkAsRead, 
  onMarkAllAsRead 
}: NotificationCenterProps) {
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'memorial':
        return <MessageSquare className="w-5 h-5 text-purple-600" />;
      case 'offering':
        return <Heart className="w-5 h-5 text-pink-600" />;
      case 'family-invite':
        return <Users className="w-5 h-5 text-blue-600" />;
      case 'anniversary':
        return <Calendar className="w-5 h-5 text-orange-600" />;
      case 'announcement':
        return <FileText className="w-5 h-5 text-green-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else if (diffInDays < 7) {
      return `${diffInDays}일 전`;
    } else {
      return date.toLocaleDateString('ko-KR');
    }
  };

  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-gray-900 mb-2">알림</h1>
            <p className="text-gray-600">
              {unreadNotifications.length > 0 
                ? `${unreadNotifications.length}개의 읽지 않은 알림이 있습니다`
                : '모든 알림을 확인했습니다'}
            </p>
          </div>
          {unreadNotifications.length > 0 && (
            <Button variant="outline" onClick={onMarkAllAsRead}>
              <CheckCheck className="w-4 h-4 mr-2" />
              모두 읽음 처리
            </Button>
          )}
        </div>

        {/* Unread Notifications */}
        {unreadNotifications.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg mb-4 text-gray-700">읽지 않음</h2>
            <div className="space-y-3">
              {unreadNotifications.map(notification => (
                <Card 
                  key={notification.id}
                  className="p-4 hover:shadow-md transition-shadow cursor-pointer bg-purple-50 border-l-4 border-l-purple-500"
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3>{notification.title}</h3>
                        <span className="text-sm text-gray-500">{getTimeAgo(notification.timestamp)}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{notification.message}</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMarkAsRead(notification.id);
                      }}
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Read Notifications */}
        {readNotifications.length > 0 && (
          <div>
            <h2 className="text-lg mb-4 text-gray-700">읽음</h2>
            <div className="space-y-3">
              {readNotifications.map(notification => (
                <Card 
                  key={notification.id}
                  className="p-4 hover:shadow-md transition-shadow opacity-60"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-gray-700">{notification.title}</h3>
                        <span className="text-sm text-gray-500">{getTimeAgo(notification.timestamp)}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{notification.message}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl text-gray-900 mb-2">알림이 없습니다</h3>
            <p className="text-gray-600">새로운 알림이 도착하면 여기에 표시됩니다</p>
          </div>
        )}
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
