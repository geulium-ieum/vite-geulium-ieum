import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Card } from '~/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import type { UserRole } from '~/types';
import { toast } from 'sonner';
import { Form, Link, redirect } from 'react-router';
import type { Route } from './+types/Login';
import { userService } from '~/lib/services/user';
import { commitSession, getSession } from '~/lib/sessions.server';

interface LoginProps {
  onLogin: (email: string, role: UserRole) => void;
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  if (!email || !password) {
    return
  }
  try {
    const response = await userService.post.login({ email, password });
    session.set("token", response.accessToken);
    return redirect('/', {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  } catch (error) {
    console.error(error);
  }
}

type FormErrors = { email?: string; password?: string };

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [userErrors, setUserErrors] = useState<FormErrors>({});
  const [adminErrors, setAdminErrors] = useState<FormErrors>({});
  const NaverClientId = import.meta.env.VITE_NAVER_CLIENT_ID; // 발급받은 클라이언트 아이디
  const NaverRedirectUri = import.meta.env.VITE_NAVER_AUTH_REDIRECT_URI; //Callback URL
  const State = "geulium-ieum"
  const NaverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NaverClientId}&state=${State}&redirect_uri=${NaverRedirectUri}`;
  const KakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
  // const KakaoRestApiKey = 'f7fa95378edceb9434253f50fef1b79a';
  const KakaoRedirectUri = import.meta.env.VITE_KAKAO_AUTH_REDIRECT_URI;
  const KakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KakaoClientId}&redirect_uri=${KakaoRedirectUri}&response_type=code`;

  const handleSocialLogin = (provider: string) => {
    toast.success(`${provider} 로그인 (데모)`);
    onLogin(`user@${provider.toLowerCase()}.com`, 'USER');
  };

  const handleUserSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const errors: FormErrors = {};
    if (!email.trim()) errors.email = '이메일을 입력해주세요.';
    if (!password) errors.password = '비밀번호를 입력해주세요.';
    setUserErrors(errors);
    if (Object.keys(errors).length > 0) e.preventDefault();
  };

  const handleAdminSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const errors: FormErrors = {};
    if (!adminEmail.trim()) errors.email = '이메일을 입력해주세요.';
    if (!adminPassword) errors.password = '비밀번호를 입력해주세요.';
    setAdminErrors(errors);
    if (Object.keys(errors).length > 0) e.preventDefault();
  };

  const handleNaverLogin = () => {
    window.location.href = NaverAuthUrl;
  };

  const handleKakaoLogin = () => {
    window.location.href = KakaoAuthUrl;
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
            <Form method="POST" className="space-y-4" onSubmit={handleUserSubmit}>
              <div>
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (userErrors.email) setUserErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  className={userErrors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
                />
                {userErrors.email && (
                  <p className="mt-1 text-sm text-red-500" role="alert">
                    {userErrors.email}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (userErrors.password) setUserErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  className={userErrors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}
                />
                {userErrors.password && (
                  <p className="mt-1 text-sm text-red-500" role="alert">
                    {userErrors.password}
                  </p>
                )}
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
                  onClick={handleKakaoLogin}
                >
                  <span className="mr-2">💬</span>
                  카카오로 로그인
                </Button>
                <Form method="POST" action="/auth/naver/login">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-[#03C75A] text-white"
                  onClick={handleNaverLogin}
                >
                  <span className="mr-2">N</span> 네이버로 로그인
                </Button>
                </Form>
              </div>

              <div className="text-center text-sm text-gray-600 mt-6">
                계정이 없으신가요?{' '}
                <Link to="/register" className="text-purple-600 hover:underline">
                  회원가입
                </Link>
              </div>
            </Form>
          </TabsContent>

          <TabsContent value="admin">
            <Form method="POST" className="space-y-4" onSubmit={handleAdminSubmit}>
              <div>
                <Label htmlFor="admin-email">관리자 이메일</Label>
                <Input
                  id="admin-email"
                  name="email"
                  type="email"
                  placeholder="이메일"
                  value={adminEmail}
                  onChange={(e) => {
                    setAdminEmail(e.target.value);
                    if (adminErrors.email) setAdminErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  className={adminErrors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
                />
                {adminErrors.email && (
                  <p className="mt-1 text-sm text-red-500" role="alert">
                    {adminErrors.email}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="admin-password">비밀번호</Label>
                <Input
                  id="admin-password"
                  name="password"
                  type="password"
                  placeholder="비밀번호"
                  value={adminPassword}
                  onChange={(e) => {
                    setAdminPassword(e.target.value);
                    if (adminErrors.password) setAdminErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  className={adminErrors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}
                />
                {adminErrors.password && (
                  <p className="mt-1 text-sm text-red-500" role="alert">
                    {adminErrors.password}
                  </p>
                )}
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
            </Form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
