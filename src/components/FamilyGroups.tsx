import { useState } from 'react';
import { Users, Plus, Settings, UserPlus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { User as UserType } from '@/types';
import { toast } from 'sonner';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Footer } from '@/components/Footer';

interface FamilyGroupsProps {
  user: UserType | null;
}

interface FamilyGroup {
  id: number;
  name: string;
  description: string;
  createdDate: Date;
  memberCount: number;
  memorialCount: number;
  role: 'admin' | 'member';
  members: GroupMember[];
}

interface GroupMember {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'member';
  joinDate: Date;
}

export function FamilyGroups({ user }: FamilyGroupsProps) {
  const [groups, setGroups] = useState<FamilyGroup[]>([
    {
      id: 1,
      name: '김씨 가문',
      description: '김철수님과 이영희님을 추모하는 가족 그룹입니다',
      createdDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      memberCount: 5,
      memorialCount: 2,
      role: 'admin',
      members: [
        {
          id: 1,
          name: '김영수',
          email: 'kim@example.com',
          role: 'admin',
          joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        },
        {
          id: 2,
          name: '김민지',
          email: 'mj@example.com',
          role: 'member',
          joinDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
        },
        {
          id: 3,
          name: '김준호',
          email: 'junho@example.com',
          role: 'member',
          joinDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
        },
      ],
    },
    {
      id: 2,
      name: '이씨 가문',
      description: '이씨 가문 추모 그룹',
      createdDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      memberCount: 3,
      memorialCount: 1,
      role: 'member',
      members: [
        {
          id: 4,
          name: '이영희',
          email: 'lee@example.com',
          role: 'admin',
          joinDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
        },
        {
          id: 5,
          name: user?.name || '',
          email: user?.email || '',
          role: 'member',
          joinDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
        },
      ],
    },
  ]);

  const [selectedGroup, setSelectedGroup] = useState<FamilyGroup | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) {
      toast.error('그룹 이름을 입력해주세요');
      return;
    }

    const newGroup: FamilyGroup = {
      id: Date.now(),
      name: newGroupName,
      description: newGroupDescription,
      createdDate: new Date(),
      memberCount: 1,
      memorialCount: 0,
      role: 'admin',
      members: [
        {
          id: user?.id || 1,
          name: user?.name || '',
          email: user?.email || '',
          role: 'admin',
          joinDate: new Date(),
        }
      ],
    };

    setGroups([...groups, newGroup]);
    setNewGroupName('');
    setNewGroupDescription('');
    setIsCreateDialogOpen(false);
    toast.success('가족 그룹이 생성되었습니다');
  };

  const handleInviteMember = () => {
    if (!inviteEmail.trim()) {
      toast.error('초대할 이메일을 입력해주세요');
      return;
    }

    toast.success(`${inviteEmail}로 초대 이메일이 발송되었습니다`);
    setInviteEmail('');
    setIsInviteDialogOpen(false);
  };

  const handleDeleteGroup = (groupId: number) => {
    if (confirm('정말로 이 그룹을 삭제하시겠습니까?')) {
      setGroups(groups.filter(g => g.id !== groupId));
      setSelectedGroup(null);
      toast.success('그룹이 삭제되었습니다');
    }
  };

  const handleRemoveMember = (groupId: number, memberId: number) => {
    if (confirm('이 멤버를 그룹에서 제거하시겠습니까?')) {
      setGroups(groups.map(g => {
        if (g.id === groupId) {
          return {
            ...g,
            members: g.members.filter(m => m.id !== memberId),
            memberCount: g.memberCount - 1,
          };
        }
        return g;
      }));
      toast.success('멤버가 제거되었습니다');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-gray-900 mb-2">가족 그룹</h1>
            <p className="text-gray-600">가족 구성원과 함께 추억을 공유하세요</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                새 그룹 만들기
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>새 가족 그룹 만들기</DialogTitle>
                <DialogDescription>
                  가족 구성원들과 함께 추모관을 관리할 수 있는 그룹을 만드세요
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="group-name">그룹 이름</Label>
                  <Input
                    id="group-name"
                    placeholder="예: 김씨 가문"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="group-description">설명 (선택)</Label>
                  <Input
                    id="group-description"
                    placeholder="그룹에 대한 간단한 설명"
                    value={newGroupDescription}
                    onChange={(e) => setNewGroupDescription(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    취소
                  </Button>
                  <Button onClick={handleCreateGroup}>
                    생성
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Groups Grid */}
        {!selectedGroup && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map(group => (
              <Card 
                key={group.id}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedGroup(group)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-linear-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  {group.role === 'admin' && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGroup(group);
                      }}
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <h3 className="text-xl mb-2">{group.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{group.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>멤버 {group.memberCount}명</span>
                  <span>•</span>
                  <span>추모관 {group.memorialCount}개</span>
                </div>
              </Card>
            ))}

            {groups.length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl text-gray-900 mb-2">가족 그룹이 없습니다</h3>
                <p className="text-gray-600 mb-4">첫 번째 가족 그룹을 만들어보세요</p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  새 그룹 만들기
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Group Detail */}
        {selectedGroup && (
          <div>
            <Button 
              variant="ghost" 
              className="mb-6"
              onClick={() => setSelectedGroup(null)}
            >
              ← 그룹 목록으로
            </Button>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Group Info */}
              <div className="lg:col-span-1">
                <Card className="p-6">
                  <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl text-center mb-2">{selectedGroup.name}</h2>
                  <p className="text-gray-600 text-center text-sm mb-6">{selectedGroup.description}</p>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">멤버</span>
                      <span>{selectedGroup.memberCount}명</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">추모관</span>
                      <span>{selectedGroup.memorialCount}개</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">생성일</span>
                      <span>{selectedGroup.createdDate.toLocaleDateString('ko-KR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">내 권한</span>
                      <span>{selectedGroup.role === 'admin' ? '관리자' : '멤버'}</span>
                    </div>
                  </div>

                  {selectedGroup.role === 'admin' && (
                    <div className="mt-6 pt-6 border-t space-y-2">
                      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full">
                            <UserPlus className="w-4 h-4 mr-2" />
                            멤버 초대
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>멤버 초대</DialogTitle>
                            <DialogDescription>
                              초대할 사용자의 이메일을 입력하세요
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="invite-email">이메일</Label>
                              <Input
                                id="invite-email"
                                type="email"
                                placeholder="example@email.com"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                              />
                            </div>
                            <div className="flex justify-end gap-3">
                              <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                                취소
                              </Button>
                              <Button onClick={handleInviteMember}>
                                초대
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="destructive" 
                        className="w-full"
                        onClick={() => handleDeleteGroup(selectedGroup.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        그룹 삭제
                      </Button>
                    </div>
                  )}
                </Card>
              </div>

              {/* Members List */}
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <h3 className="text-xl mb-6">그룹 멤버</h3>
                  <div className="space-y-4">
                    {selectedGroup.members.map(member => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="flex items-center gap-2">
                              {member.name}
                              {member.role === 'admin' && (
                                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">관리자</span>
                              )}
                            </p>
                            <p className="text-sm text-gray-600">{member.email}</p>
                            <p className="text-xs text-gray-500">
                              가입일: {member.joinDate.toLocaleDateString('ko-KR')}
                            </p>
                          </div>
                        </div>
                        
                        {selectedGroup.role === 'admin' && member.id !== user?.id && (
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleRemoveMember(selectedGroup.id, member.id)}
                          >
                            제거
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
