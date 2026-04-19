import { useState } from 'react';
import { Users, Plus, Settings } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { toast } from 'sonner';
import { Footer } from '~/components/Footer';
import type { Route } from './+types/FamilyGroups';
import { userContext } from '~/context/userContext';
import { Form, Link, redirect } from 'react-router';
import { familyGroupService } from '~/lib/services/familyGroup';
import { getSession } from '~/lib/sessions.server';

export async function loader({ request, context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  const cookie = request.headers.get("Cookie");
  const session = await getSession(cookie);
  const token = session.get("token");
  if (!user || !token) {
    return redirect('/login');
  }
  const { content: familyGroupContent } = await familyGroupService.get.familyGroupList({
    sort: [{ field: 'updatedAt', direction: 'desc' }],
    token
  })
  const memberContent = await Promise.all(
    familyGroupContent.map(async (group) => {
      const { content: memberContent } = await familyGroupService.get.familyGroupMemberList({
        id: group.id,
        token
      })
      return {
        ...group,
        members: memberContent
      }
    })
  )
  const memorialContent = await Promise.all(
    familyGroupContent.map(async (group) => {
      const { content: memorialContent } = await familyGroupService.get.familyGroupMemorialList({
        id: group.id,
        token
      })
      return {
        ...group,
        memorials: memorialContent
      }
    })
  )

  return { user, memberContent, memorialContent };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const cookie = request.headers.get("Cookie");
  const session = await getSession(cookie);
  const token = session.get("token");
  if (!name || !token) return { ok: false };
  await familyGroupService.post.createFamilyGroup({
    token,
    name,
    description: description || ""
  });
  return { ok: true };
}

export default function FamilyGroups({ loaderData }: Route.ComponentProps) {
  const { user, memberContent, memorialContent } = loaderData;

  // const [selectedGroup, setSelectedGroup] = useState<FamilyGroup['content'] | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  // const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  // const [inviteEmail, setInviteEmail] = useState('');

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) {
      toast.error('그룹 이름을 입력해주세요');
      return;
    }
    setNewGroupName('');
    setNewGroupDescription('');
    setIsCreateDialogOpen(false);
    toast.success('가족 그룹이 생성되었습니다');
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto min-h-[calc(100vh-398px)] px-4 sm:px-6 lg:px-8 py-12">
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
              <Form method="POST" onSubmit={handleCreateGroup}>
                <div className="space-y-4">
                  <div className='space-y-2'>
                    <Label htmlFor="group-name">그룹 이름</Label>
                    <Input
                      id="group-name"
                      name="name"
                      placeholder="예: 김씨 가문"
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor="group-description">설명 (선택)</Label>
                    <Input
                      id="group-description"
                      name="description"
                      placeholder="그룹에 대한 간단한 설명"
                      value={newGroupDescription}
                      onChange={(e) => setNewGroupDescription(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      취소
                    </Button>
                    <Button type="submit">
                      생성
                    </Button>
                  </div>
                </div>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Groups Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memberContent.map(group => (
            <Link
              key={group.id}
              to={`/family-groups/${group.id}`}
            >
              <Card className="h-full p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-linear-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  {group.ownerId === user?.id && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        // setSelectedGroup(group);
                      }}
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <h3 className="text-xl mb-2">{group.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{group.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>멤버 {group.members.length}명</span>
                  <span>•</span>
                  <span>추모관 {memorialContent.find(memorial => memorial.id === group.id)?.memorials.length}개</span>
                </div>
              </Card>
            </Link>
          ))}

          {memberContent.length === 0 && (
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
      </div>

      <Footer />
    </div>
  );
}
