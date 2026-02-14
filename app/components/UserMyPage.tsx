import { useState } from 'react';
import { User, Settings, Heart, LogOut, Calendar } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Switch } from '~/components/ui/switch';
import { toast } from 'sonner';
import { Footer } from '~/components/Footer';
import { useNavigate } from 'react-router';
import type { Route } from './+types/UserMyPage';
import { userContext } from '~/context/userContext';
import { Link } from 'react-router';

export async function loader({ context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  return { user };
}

export default function UserMyPage({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '010-1234-5678',
  });
  const [notifications, setNotifications] = useState({
    newTribute: true,
    offering: true,
    familyInvite: true,
    anniversary: true,
  });

  const navigate = useNavigate();

  const myMemorials = [
    {
      id: '1',
      name: '김철수',
      relationship: '할아버지',
      deathDate: '2024.08.20',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    },
    {
      id: '2',
      name: '이영희',
      relationship: '할머니',
      deathDate: '2024.09.10',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    },
  ];

  const myTributes = [
    {
      id: '1',
      memorialName: '김철수',
      content: '항상 따뜻한 미소로 맞아주시던 모습이 생각납니다...',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: '2',
      memorialName: '이영희',
      content: '좋은 분이셨습니다. 하늘에서 편히 쉬시길...',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
  ];

  const upcomingAnniversaries = [
    {
      id: '1',
      name: '김철수',
      type: '기일',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: '2',
      name: '이영희',
      type: '생신',
      date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    },
  ];

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('프로필이 업데이트되었습니다');
  };

  const handleNotificationToggle = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.success('알림 설정이 변경되었습니다');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl min-h-[calc(100vh-398px)] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">마이페이지</h1>
          <p className="text-gray-600">내 정보와 활동을 관리하세요</p>
        </div>

        <Tabs defaultValue="memorials" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="memorials">
              <Heart className="w-4 h-4 mr-2" />
              내 추모관
            </TabsTrigger>
            <TabsTrigger value="tributes">
              추모글
            </TabsTrigger>
            <TabsTrigger value="anniversaries">
              <Calendar className="w-4 h-4 mr-2" />
              기일 알림
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              프로필
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              설정
            </TabsTrigger>
          </TabsList>

          <TabsContent value="memorials">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl">관리 중인 추모관</h2>
                <Button onClick={() => navigate('/search')}>
                  새 추모관 등록
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myMemorials.map(memorial => (
                  <Card 
                    key={memorial.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    // onClick={() => onViewMemorial(memorial.id)}
                  >
                    <div className="aspect-square relative overflow-hidden bg-gray-200">
                      <img 
                        src={memorial.image}
                        alt={memorial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="mb-1">{memorial.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{memorial.relationship}</p>
                      <p className="text-sm text-gray-500">{memorial.deathDate}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="tributes">
            <Card className="p-6">
              <h2 className="text-xl mb-6">내가 남긴 추모글</h2>
              <div className="space-y-4">
                {myTributes.map(tribute => (
                  <Card key={tribute.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h3>{tribute.memorialName}</h3>
                      <p className="text-sm text-gray-500">
                        {tribute.timestamp.toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                    <p className="text-gray-700">{tribute.content}</p>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="anniversaries">
            <Card className="p-6">
              <h2 className="text-xl mb-6">다가오는 기일</h2>
              <div className="space-y-4">
                {upcomingAnniversaries.map(anniversary => (
                  <Card key={anniversary.id} className="p-4 border-l-4 border-l-purple-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="mb-1">{anniversary.name}</h3>
                        <p className="text-sm text-gray-600">{anniversary.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-purple-600">
                          {Math.ceil((anniversary.date.getTime() - Date.now()) / (1000 * 60 * 60 * 24))}일 후
                        </p>
                        <p className="text-sm text-gray-500">
                          {anniversary.date.toLocaleDateString('ko-KR')}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="p-6">
              <h2 className="text-xl mb-6">프로필 정보</h2>
              <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
                <div>
                  <Label htmlFor="name">이름</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">휴대폰 번호</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <Button type="submit">프로필 업데이트</Button>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl mb-6">알림 설정</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p>새 추모글 알림</p>
                      <p className="text-sm text-gray-600">내 추모관에 새로운 추모글이 등록되면 알림을 받습니다</p>
                    </div>
                    <Switch
                      checked={notifications.newTribute}
                      onCheckedChange={(checked) => handleNotificationToggle('newTribute', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p>헌화/분향 알림</p>
                      <p className="text-sm text-gray-600">온라인 성묘 활동 시 알림을 받습니다</p>
                    </div>
                    <Switch
                      checked={notifications.offering}
                      onCheckedChange={(checked) => handleNotificationToggle('offering', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p>가족 그룹 초대 알림</p>
                      <p className="text-sm text-gray-600">가족 그룹 초대 시 알림을 받습니다</p>
                    </div>
                    <Switch
                      checked={notifications.familyInvite}
                      onCheckedChange={(checked) => handleNotificationToggle('familyInvite', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p>기일 알림</p>
                      <p className="text-sm text-gray-600">기일 및 명절 알림을 받습니다</p>
                    </div>
                    <Switch
                      checked={notifications.anniversary}
                      onCheckedChange={(checked) => handleNotificationToggle('anniversary', checked)}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl mb-6">계정 관리</h2>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 hover:border-purple-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="mb-1">비밀번호 변경</h3>
                        <p className="text-sm text-gray-600">계정 보안을 위해 주기적으로 비밀번호를 변경하세요</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Link to="/mypage/change-password">
                          변경
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="mb-1 text-red-900">로그아웃</h3>
                        <p className="text-sm text-red-700">현재 계정에서 로그아웃합니다</p>
                      </div>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        // onClick={onLogout}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        로그아웃
                      </Button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="mb-1">회원 탈퇴</h3>
                        <p className="text-sm text-gray-600">계정을 삭제하면 모든 데이터가 영구 삭제됩니다</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-500">
                        탈퇴하기
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
