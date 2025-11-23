import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { UserRole } from '@/types';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface LoginProps {
  onLogin: (email: string, role: UserRole) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('이메일과 비밀번호를 입력해주세요');
      return;
    }
    toast.success('로그인되었습니다');
    onLogin(email, 'USER');
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmail || !adminPassword) {
      toast.error('이메일과 비밀번호를 입력해주세요');
      return;
    }
    
    // Super Admin 구분 (데모용)
    const role: UserRole = adminEmail === 'superadmin@admin.com' ? 'SUPER_ADMIN' : 'ADMIN';
    toast.success('관리자 로그인되었습니다');
    onLogin(adminEmail, role);
  };

  const handleSocialLogin = (provider: string) => {
    toast.success(`${provider} 로그인 (데모)`);
    onLogin(`user@${provider.toLowerCase()}.com`, 'USER');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-900 via-purple-800 to-blue-900 py-12 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🕊️</span>
          </div>
          <h1 className="text-2xl text-gray-900 mb-2">그리움 이음</h1>
          <p className="text-gray-600">로그인하여 서비스를 이용하세요</p>
        </div>

        <Tabs defaultValue="user" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="user">일반 사용자</TabsTrigger>
            <TabsTrigger value="admin">관리자</TabsTrigger>
          </TabsList>

          <TabsContent value="user">
            <form onSubmit={handleUserLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-600">로그인 유지</span>
                </label>
                <a href="/find-password" className="text-purple-600 hover:underline">
                  비밀번호 찾기
                </a>
              </div>

              <Button type="submit" className="w-full">
                로그인
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">또는</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full bg-[#FEE500] text-black"
                  onClick={() => handleSocialLogin('Kakao')}
                >
                  <span className="mr-2">💬</span>
                  카카오로 계속하기
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full bg-[#2DB400] text-white"
                  onClick={() => handleSocialLogin('Naver')}
                >
                  <span className="mr-2">N</span>
                  네이버로 계속하기
                </Button>
              </div>

              <div className="text-center text-sm text-gray-600 mt-6">
                계정이 없으신가요?{' '}
                <Link to="/register" className="text-purple-600 hover:underline">
                  회원가입
                </Link>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="admin">
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <Label htmlFor="admin-email">관리자 이메일</Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="이메일"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="admin-password">비밀번호</Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="비밀번호"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                <p className="mb-1">데모 계정:</p>
                <p>일반 관리자: admin@admin.com</p>
                <p>Super Admin: superadmin@admin.com</p>
              </div>

              <Button type="submit" className="w-full">
                관리자 로그인
              </Button>

              <div className="text-center text-sm text-gray-600 mt-6">
                <Link to="/" className="text-purple-600 hover:underline">
                  메인으로 돌아가기
                </Link>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
