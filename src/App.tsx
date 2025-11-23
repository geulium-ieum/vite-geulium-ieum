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
import type { Notification, User, UserRole } from '@/types';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/organisms/Header';
import { useAuth } from '@/context/AuthContext';

export default function App() {
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

  const { user, setUser } = useAuth();

  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  // const unreadCount = notifications.filter(n => !n.read).length;

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
      navigate('/admin-dashboard');
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleViewMemorial = (memorialId: string) => {
    setSelectedMemorialId(memorialId);
    navigate(`/memorial/${memorialId}`);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {pathname !== '/login' && pathname !== '/register' && (
        <Header />
      )}

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                user={user}
                onViewMemorial={handleViewMemorial}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/register"
            element={
              <Register />
            }
          />
          <Route
            path="/search"
            element={
              <SearchDeceased
                user={user}
                onViewMemorial={handleViewMemorial}
              />
            }
          />
          <Route
            path="/memorial/:id"
            element={
              <MemorialPage
                user={user}
                memorialId={selectedMemorialId}
              />
            }
          />
          <Route
            path="/mypage"
            element={
              <UserMyPage
                user={user}
                onLogout={handleLogout}
                onViewMemorial={handleViewMemorial}
              />
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <AdminDashboard />
            }
          />
          <Route
            path="/admin-mypage"
            element={
              <AdminMyPage
                user={user}
                onLogout={handleLogout}
              />
            }
          />
          <Route
            path="/family-groups"
            element={
              <FamilyGroups user={user} />
            }
          />
          <Route
            path="/notifications"
            element={
              <NotificationCenter
                user={user}
                notifications={notifications}
                onMarkAsRead={markNotificationAsRead}
                onMarkAllAsRead={markAllAsRead}
              />
            }
          />
          <Route
            path="/announcements"
            element={
              <Announcements user={user} />
            }
          />
        </Routes>
      </main>
      <Toaster />
    </div>
  )
}
