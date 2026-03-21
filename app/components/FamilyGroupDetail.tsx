import { userContext } from "~/context/userContext";
import type { Route } from "./+types/FamilyGroupDetail";
import { getSession } from "~/lib/sessions.server";
import { redirect, useNavigate } from "react-router";
import { familyGroupService } from "~/lib/services/familyGroup";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Trash2, UserPlus, Users } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import moment from "moment";
import { useState } from "react";
import { userService } from "~/lib/services/user";
import { toast } from "sonner";
import type { User } from "~/types";

export async function loader({ request, context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  const cookie = request.headers.get("Cookie");
  const session = await getSession(cookie);
  const token = session.get("token");
  if (!user || !token) {
    return redirect("/login");
  }
  const pathname = new URL(request.url).pathname;
  const id = pathname.split("/").pop();
  if (!id) {
    return redirect("/family-groups");
  }
  const familyGroupDetail = await familyGroupService.get.familyGroupDetail({
    id,
    token
  });
  const { content: memberContent } = await familyGroupService.get.familyGroupMemberList({
    id,
    token
  });
  const members = await Promise.all(
    memberContent.map(async (member) => {
      const user = await userService.get.user({
        id: member.userId,
        token
      })
      return {
        ...member,
        user
      }
    })
  )
  const { content: memorialContent } = await familyGroupService.get.familyGroupMemorialList({
    id,
    token
  });

  return {
    user,
    token,
    familyGroupDetail,
    members,
    memorialContent
  };
}

export default function FamilyGroupDetail({ loaderData }: Route.ComponentProps) {
  const {
    user,
    token,
    familyGroupDetail,
    members,
    memorialContent
  } = loaderData;

  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedMember, setSelectedMember] = useState<User | null>(null);
  const [isDeleteMemberDialogOpen, setIsDeleteMemberDialogOpen] = useState(false);
  const [isDeleteGroupDialogOpen, setIsDeleteGroupDialogOpen] = useState(false);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleInviteMember = async () => {
    if (!inviteEmail.trim()) {
      toast.error('초대할 이메일을 입력해주세요');
      return;
    }

    try {
      await familyGroupService.post.inviteFamilyGroupMember({
        id: familyGroupDetail.id,
        token,
        email: inviteEmail,
        role: 'member',
        relationship: "family"
      });
      toast.success(`${inviteEmail}로 초대 이메일이 발송되었습니다`);
      setInviteEmail('');
      setIsInviteDialogOpen(false);
    } catch (error) {
      toast.error('초대 이메일 발송에 실패했습니다');
      console.error(error);
    }
  };

  const handleSelectedDeleteMember = (member: User) => {
    setSelectedMember(member);
    setIsDeleteMemberDialogOpen(true);
  }

  const handleCancelDeleteMember = () => {
    setSelectedMember(null);
    setIsDeleteMemberDialogOpen(false);
  }

  // TODO: 멤버 제거 후 그룹 멤버 목록 갱신
  const handleDeleteMember = async () => {
    if (!selectedMember) return;
    try {
      await familyGroupService.delete.familyGroupMember({
        id: familyGroupDetail.id,
        userId: selectedMember.id,
        token
      });
      toast.success(`${selectedMember.name}님이 그룹에서 제거되었습니다`);
      setSelectedMember(null);
      setIsDeleteMemberDialogOpen(false);
    } catch (error) {
      toast.error('멤버 제거에 실패했습니다');
      console.error(error);
    }
  }

  const handleDeleteGroup = async () => {
    try {
      await familyGroupService.delete.familyGroup({
        id: familyGroupDetail.id,
        token
      });
      toast.success('그룹이 삭제되었습니다');
      setIsDeleteGroupDialogOpen(false);
      navigate('/family-groups', { replace: true });
    } catch (error) {
      toast.error('그룹 삭제에 실패했습니다');
      console.error(error);
    }
  }

  return (
    <div className="p-6">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={handleBack}
      >
        ← 그룹 목록으로
      </Button>

      <Dialog open={isDeleteGroupDialogOpen} onOpenChange={setIsDeleteGroupDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>그룹 삭제</DialogTitle>
            <DialogDescription>
              정말 이 그룹을 삭제하시겠습니까?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDeleteGroupDialogOpen(false)}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleDeleteGroup}>
              삭제
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Group Info */}
        <div className="md:col-span-1">
          <Card className="p-6">
            <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl text-center mb-2">{familyGroupDetail.name}</h2>
            <p className="text-gray-600 text-center text-sm mb-6">{familyGroupDetail.description}</p>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">멤버</span>
                <span>{members.length}명</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">추모관</span>
                <span>{memorialContent.length}개</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">생성일</span>
                <span>{moment(familyGroupDetail.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">내 권한</span>
                <span>{user.id === familyGroupDetail.ownerId ? '관리자' : '멤버'}</span>
              </div>
            </div>

            {user.id === familyGroupDetail.ownerId && (
              <div className="mt-6 pt-6 border-t space-y-2">
                <Dialog
                  open={isInviteDialogOpen}
                  onOpenChange={setIsInviteDialogOpen}
                >
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
                      <div className="space-y-2">
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
                        <Button
                          variant="outline"
                          onClick={() => setIsInviteDialogOpen(false)}
                        >
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
                  onClick={() => setIsDeleteGroupDialogOpen(true)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  그룹 삭제
                </Button>
              </div>
            )}
          </Card>
        </div>

        <Dialog open={isDeleteMemberDialogOpen} onOpenChange={setIsDeleteMemberDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>멤버 제거</DialogTitle>
              <DialogDescription>
                정말 {selectedMember?.name}님을 그룹에서 제거하시겠습니까?
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleCancelDeleteMember}>
                취소
              </Button>
              <Button variant="destructive" onClick={handleDeleteMember}>
                제거
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Members List */}
        <div className="md:col-span-2">
          <Card className="p-6">
            <h3 className="text-xl mb-6">그룹 멤버</h3>
            <div className="space-y-4">
              {members.map(member => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="flex items-center gap-2">
                        {member.user.name}
                        {member.role === 'admin' && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">관리자</span>
                        )}
                      </p>
                      <p className="text-sm text-gray-600">{member.user.email}</p>
                      <p className="text-xs text-gray-500">
                        {/* 가입일: {member.user.toLocaleDateString('ko-KR')} */}
                      </p>
                    </div>
                  </div>

                  {user.id === familyGroupDetail.ownerId && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleSelectedDeleteMember(member.user)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
