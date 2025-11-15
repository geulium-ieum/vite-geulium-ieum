import { useState } from 'react';
import { Home } from '@/components/Home';
import { Login } from '@/components/Login';
import { Register } from '@/components/Register';
import { SearchDeceased } from '@/components/SearchDeceased';
import { MemorialPage } from '@/components/MemorialPage';
import { UserMyPage } from '@/components/UserMyPage';
import { AdminDashboard } from '@/components/AdminDashboard';
import { AdminMyPage } from '@/components/AdminMyPage';
import { FamilyGroups } from '@/components/FamilyGroups';
import { NotificationCenter } from '@/components/NotificationCenter';
import { Announcements } from '@/components/Announcements';
import { Toaster } from '@/components/ui/sonner';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Notification, Page, User, UserRole } from '@/types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);
  const [selectedMemorialId, setSelectedMemorialId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'memorial',
      title: '새로운 추모글',
      message: '김철수님의 추모관에 새로운 추모글이 등록되었습니다.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
    },
    {
      id: '2',
      type: 'family-invite',
      title: '가족 그룹 초대',
      message: '이영희님이 "김씨 가문" 그룹에 초대했습니다.',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      read: false,
    },
    {
      id: '3',
      type: 'anniversary',
      title: '기일 알림',
      message: '김철수님의 기일이 3일 후입니다.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogin = (email: string, role: UserRole) => {
    const newUser: User = {
      id: Math.floor(Math.random() * 1000000),
      name: email.split('@')[0],
      email,
      role: role || "USER",
      phone: "",
      isActive: true,
    };
    setUser(newUser);
    
    if (role === "ADMIN" || role === "SUPER_ADMIN") {
      setCurrentPage('admin-dashboard');
    } else {
      setCurrentPage('home');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleViewMemorial = (memorialId: string) => {
    setSelectedMemorialId(memorialId);
    setCurrentPage('memorial');
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home user={user} onNavigate={setCurrentPage} onViewMemorial={handleViewMemorial} />;
      case 'login':
        return <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'register':
        return <Register onRegister={() => setCurrentPage('login')} onNavigate={setCurrentPage} />;
      case 'search':
        return <SearchDeceased user={user} onNavigate={setCurrentPage} onViewMemorial={handleViewMemorial} />;
      case 'memorial':
        return <MemorialPage user={user} memorialId={selectedMemorialId} onNavigate={setCurrentPage} />;
      case 'mypage':
        return <UserMyPage user={user} onNavigate={setCurrentPage} onLogout={handleLogout} onViewMemorial={handleViewMemorial} />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'admin-mypage':
        return <AdminMyPage user={user} onLogout={handleLogout} />;
      case 'family-groups':
        return <FamilyGroups user={user} onNavigate={setCurrentPage} />;
      case 'notifications':
        return (
          <NotificationCenter 
            user={user}
            notifications={notifications}
            onNavigate={setCurrentPage}
            onMarkAsRead={markNotificationAsRead}
            onMarkAllAsRead={markAllAsRead}
          />
        );
      case 'announcements':
        return <Announcements user={user} onNavigate={setCurrentPage} />;
      default:
        return <Home user={user} onNavigate={setCurrentPage} onViewMemorial={handleViewMemorial} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage !== 'login' && currentPage !== 'register' && (
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div 
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setCurrentPage(user?.role === "ADMIN" || user?.role === "SUPER_ADMIN" ? 'admin-dashboard' : 'home')}
              >
                <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white">🕊️</span>
                </div>
                <h1 className="text-xl text-gray-900">그리움 이음</h1>
              </div>

              <nav className="flex items-center gap-6">
                {user && (
                  <>
                    {(user.role === "USER" || !user.role) && (
                      <>
                        <button onClick={() => setCurrentPage('home')} className="text-gray-700 hover:text-gray-900 transition-colors">
                          홈
                        </button>
                        <button onClick={() => setCurrentPage('search')} className="text-gray-700 hover:text-gray-900 transition-colors">
                          고인 검색
                        </button>
                        <button onClick={() => setCurrentPage('family-groups')} className="text-gray-700 hover:text-gray-900 transition-colors">
                          가족 그룹
                        </button>
                      </>
                    )}
                    {(user.role === "ADMIN" || user.role === "SUPER_ADMIN") && (
                      <>
                        <button onClick={() => setCurrentPage('admin-dashboard')} className="text-gray-700 hover:text-gray-900 transition-colors">
                          대시보드
                        </button>
                        <button onClick={() => setCurrentPage('announcements')} className="text-gray-700 hover:text-gray-900 transition-colors">
                          공지사항 관리
                        </button>
                      </>
                    )}
                    
                    <div className="relative">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="relative"
                        onClick={() => setCurrentPage('notifications')}
                      >
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                          <Badge 
                            variant="destructive" 
                            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                          >
                            {unreadCount}
                          </Badge>
                        )}
                      </Button>
                    </div>

                    <button 
                      onClick={() => setCurrentPage(user.role === "ADMIN" || user.role === "SUPER_ADMIN" ? 'admin-mypage' : 'mypage')} 
                      className="text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      마이페이지
                    </button>
                  </>
                )}
                {!user && (
                  <>
                    <button onClick={() => setCurrentPage('login')} className="text-gray-700 hover:text-gray-900 transition-colors">
                      로그인
                    </button>
                    <Button onClick={() => setCurrentPage('register')}>
                      회원가입
                    </Button>
                  </>
                )}
              </nav>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main>
        {renderPage()}
      </main>

      <Toaster />
    </div>
  );
}
