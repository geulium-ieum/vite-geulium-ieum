import { useState } from 'react';
import { Users, Heart, MessageSquare, TrendingUp, Bell } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export function AdminDashboard() {
  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: '1',
      type: 'memorial',
      requester: '김영수',
      deceasedName: '김철수',
      requestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'pending',
    },
    {
      id: '2',
      type: 'memorial',
      requester: '이민지',
      deceasedName: '이영희',
      requestDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'pending',
    },
  ]);

  const stats = {
    totalMemorials: 234,
    totalUsers: 1847,
    monthlyVisits: 12483,
    activeTributes: 456,
  };

  const recentUsers = [
    { id: '1', name: '김영수', email: 'kim@example.com', joinDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), status: 'active' },
    { id: '2', name: '이민지', email: 'lee@example.com', joinDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), status: 'active' },
    { id: '3', name: '박준호', email: 'park@example.com', joinDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), status: 'active' },
  ];

  const recentActivities = [
    { id: '1', type: 'tribute', user: '김영수', memorial: '김철수', action: '추모글 작성', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) },
    { id: '2', type: 'offering', user: '이민지', memorial: '이영희', action: '헌화', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    { id: '3', type: 'tribute', user: '박준호', memorial: '박민수', action: '추모글 작성', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) },
  ];

  const handleApprove = (id: string) => {
    setPendingApprovals(prev => prev.filter(item => item.id !== id));
    toast.success('승인되었습니다');
  };

  const handleReject = (id: string) => {
    setPendingApprovals(prev => prev.filter(item => item.id !== id));
    toast.success('반려되었습니다');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">관리자 대시보드</h1>
          <p className="text-gray-600">시스템 전체 현황을 한눈에 확인하세요</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">전체 추모관</p>
              <Heart className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl">{stats.totalMemorials}</p>
            <p className="text-sm text-green-600 mt-2">+12 이번 달</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">전체 회원</p>
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl">{stats.totalUsers}</p>
            <p className="text-sm text-green-600 mt-2">+45 이번 달</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">월간 방문</p>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl">{stats.monthlyVisits.toLocaleString()}</p>
            <p className="text-sm text-green-600 mt-2">+8.3% 전월 대비</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">활성 추모글</p>
              <MessageSquare className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl">{stats.activeTributes}</p>
            <p className="text-sm text-green-600 mt-2">+23 이번 달</p>
          </Card>
        </div>

        <Tabs defaultValue="approvals" className="space-y-6">
          <TabsList>
            <TabsTrigger value="approvals">
              <Bell className="w-4 h-4 mr-2" />
              승인 대기
              {pendingApprovals.length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {pendingApprovals.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="w-4 h-4 mr-2" />
              회원 관리
            </TabsTrigger>
            <TabsTrigger value="activities">
              <TrendingUp className="w-4 h-4 mr-2" />
              최근 활동
            </TabsTrigger>
          </TabsList>

          <TabsContent value="approvals">
            <Card className="p-6">
              <h2 className="text-xl mb-6">승인 대기 목록</h2>
              {pendingApprovals.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  승인 대기 중인 항목이 없습니다
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>유형</TableHead>
                      <TableHead>신청자</TableHead>
                      <TableHead>고인명</TableHead>
                      <TableHead>신청일</TableHead>
                      <TableHead>작업</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingApprovals.map(item => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Badge>추모관 개설</Badge>
                        </TableCell>
                        <TableCell>{item.requester}</TableCell>
                        <TableCell>{item.deceasedName}</TableCell>
                        <TableCell>{item.requestDate.toLocaleDateString('ko-KR')}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleApprove(item.id)}>
                              승인
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleReject(item.id)}>
                              반려
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl">최근 가입 회원</h2>
                <Button variant="outline">전체 회원 보기</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>이름</TableHead>
                    <TableHead>이메일</TableHead>
                    <TableHead>가입일</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.joinDate.toLocaleDateString('ko-KR')}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {user.status === 'active' ? '정상' : '비활성'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost">
                          관리
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="activities">
            <Card className="p-6">
              <h2 className="text-xl mb-6">최근 활동 내역</h2>
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'tribute' ? 'bg-purple-100' : 'bg-pink-100'
                      }`}>
                        {activity.type === 'tribute' ? (
                          <MessageSquare className="w-5 h-5 text-purple-600" />
                        ) : (
                          <Heart className="w-5 h-5 text-pink-600" />
                        )}
                      </div>
                      <div>
                        <p>
                          <span>{activity.user}</span>님이{' '}
                          <span className="text-purple-600">{activity.memorial}</span> 추모관에{' '}
                          <span>{activity.action}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                          {activity.timestamp.toLocaleString('ko-KR')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
