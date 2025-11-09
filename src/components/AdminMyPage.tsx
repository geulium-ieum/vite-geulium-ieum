import { useState } from 'react';
import { User, Settings, Shield, Database, Lock, LogOut, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { User as UserType } from '@/types';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface AdminMyPageProps {
  user: UserType | null;
  onLogout: () => void;
}

export function AdminMyPage({ user, onLogout }: AdminMyPageProps) {
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '010-1234-5678',
  });

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    autoBackup: true,
    emailNotifications: true,
    smsNotifications: false,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    ipWhitelist: false,
  });

  const [adminUsers, setAdminUsers] = useState([
    { id: '1', name: '김관리', email: 'admin1@admin.com', role: 'admin', lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    { id: '2', name: '이관리', email: 'admin2@admin.com', role: 'admin', lastLogin: new Date(Date.now() - 5 * 60 * 60 * 1000) },
  ]);

  const systemLogs = [
    { id: '1', type: 'info', message: '시스템 정상 작동 중', timestamp: new Date(Date.now() - 10 * 60 * 1000) },
    { id: '2', type: 'warning', message: '디스크 사용량 70% 초과', timestamp: new Date(Date.now() - 30 * 60 * 1000) },
    { id: '3', type: 'success', message: '데이터 백업 완료', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  ];

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('프로필이 업데이트되었습니다');
  };

  const handleSystemSettingToggle = (key: string, value: boolean) => {
    setSystemSettings(prev => ({ ...prev, [key]: value }));
    toast.success('시스템 설정이 변경되었습니다');
  };

  const handleSecuritySettingToggle = (key: string, value: boolean) => {
    setSecuritySettings(prev => ({ ...prev, [key]: value }));
    toast.success('보안 설정이 변경되었습니다');
  };

  const handleChangeRole = (userId: string, newRole: string) => {
    setAdminUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    toast.success('권한이 변경되었습니다');
  };

  const isSuperAdmin = user?.role === 'super-admin';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">관리자 설정</h1>
          <p className="text-gray-600">
            관리자 계정 정보 및 시스템 설정을 관리하세요
            {isSuperAdmin && <Badge className="ml-2" variant="destructive">Super Admin</Badge>}
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className={isSuperAdmin ? "grid w-full grid-cols-5" : "grid w-full grid-cols-4"}>
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              프로필
            </TabsTrigger>
            <TabsTrigger value="system">
              <Settings className="w-4 h-4 mr-2" />
              시스템 설정
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="w-4 h-4 mr-2" />
              보안 설정
            </TabsTrigger>
            <TabsTrigger value="logs">
              <Activity className="w-4 h-4 mr-2" />
              로그 관리
            </TabsTrigger>
            {isSuperAdmin && (
              <TabsTrigger value="admins">
                <Lock className="w-4 h-4 mr-2" />
                관리자 권한
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="profile">
            <Card className="p-6">
              <h2 className="text-xl mb-6">관리자 프로필</h2>
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

                <div>
                  <Label>권한</Label>
                  <Input value={user?.role === 'super-admin' ? 'Super Admin' : 'Admin'} disabled />
                </div>

                <div className="flex gap-3">
                  <Button type="submit">프로필 업데이트</Button>
                  <Button type="button" variant="outline">비밀번호 변경</Button>
                </div>
              </form>

              <div className="mt-8 pt-8 border-t">
                <Button 
                  variant="destructive"
                  onClick={onLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  로그아웃
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card className="p-6">
              <h2 className="text-xl mb-6">시스템 환경 설정</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p>유지보수 모드</p>
                    <p className="text-sm text-gray-600">시스템을 일시적으로 중단합니다</p>
                  </div>
                  <Switch
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => handleSystemSettingToggle('maintenanceMode', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p>자동 백업</p>
                    <p className="text-sm text-gray-600">매일 자동으로 데이터를 백업합니다</p>
                  </div>
                  <Switch
                    checked={systemSettings.autoBackup}
                    onCheckedChange={(checked) => handleSystemSettingToggle('autoBackup', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p>이메일 알림</p>
                    <p className="text-sm text-gray-600">시스템 이벤트 이메일 알림</p>
                  </div>
                  <Switch
                    checked={systemSettings.emailNotifications}
                    onCheckedChange={(checked) => handleSystemSettingToggle('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p>SMS 알림</p>
                    <p className="text-sm text-gray-600">긴급 상황 SMS 알림</p>
                  </div>
                  <Switch
                    checked={systemSettings.smsNotifications}
                    onCheckedChange={(checked) => handleSystemSettingToggle('smsNotifications', checked)}
                  />
                </div>

                <div className="pt-6 border-t">
                  <Button variant="outline" className="w-full">
                    <Database className="w-4 h-4 mr-2" />
                    수동 백업 실행
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="p-6">
              <h2 className="text-xl mb-6">보안 설정</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p>2단계 인증</p>
                    <p className="text-sm text-gray-600">로그인 시 추가 인증을 요구합니다</p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => handleSecuritySettingToggle('twoFactorAuth', checked)}
                  />
                </div>

                <div>
                  <Label>세션 타임아웃 (분)</Label>
                  <Select 
                    value={securitySettings.sessionTimeout}
                    onValueChange={(value) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: value }))}
                  >
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15분</SelectItem>
                      <SelectItem value="30">30분</SelectItem>
                      <SelectItem value="60">1시간</SelectItem>
                      <SelectItem value="120">2시간</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p>IP 화이트리스트</p>
                    <p className="text-sm text-gray-600">특정 IP에서만 접근 허용</p>
                  </div>
                  <Switch
                    checked={securitySettings.ipWhitelist}
                    onCheckedChange={(checked) => handleSecuritySettingToggle('ipWhitelist', checked)}
                  />
                </div>

                <div className="pt-6 border-t">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      <Shield className="w-4 h-4 inline mr-2" />
                      보안 설정 변경 시 즉시 적용됩니다
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="logs">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl">시스템 로그</h2>
                <Button variant="outline">로그 다운로드</Button>
              </div>
              <div className="space-y-3">
                {systemLogs.map(log => (
                  <div 
                    key={log.id} 
                    className={`p-4 rounded-lg border ${
                      log.type === 'success' ? 'bg-green-50 border-green-200' :
                      log.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                      'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant={
                          log.type === 'success' ? 'default' :
                          log.type === 'warning' ? 'destructive' :
                          'outline'
                        }>
                          {log.type.toUpperCase()}
                        </Badge>
                        <p className={
                          log.type === 'success' ? 'text-green-800' :
                          log.type === 'warning' ? 'text-yellow-800' :
                          'text-blue-800'
                        }>
                          {log.message}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {log.timestamp.toLocaleString('ko-KR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {isSuperAdmin && (
            <TabsContent value="admins">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl">관리자 권한 관리</h2>
                  <Button>새 관리자 추가</Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>이름</TableHead>
                      <TableHead>이메일</TableHead>
                      <TableHead>권한</TableHead>
                      <TableHead>마지막 로그인</TableHead>
                      <TableHead>작업</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminUsers.map(admin => (
                      <TableRow key={admin.id}>
                        <TableCell>{admin.name}</TableCell>
                        <TableCell>{admin.email}</TableCell>
                        <TableCell>
                          <Select 
                            value={admin.role}
                            onValueChange={(value) => handleChangeRole(admin.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="super-admin">Super Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>{admin.lastLogin.toLocaleString('ko-KR')}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost">관리</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}
