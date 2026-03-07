import { userContext } from "~/context/userContext";
import type { Route } from "./+types/FamilyGroupDetail";
import { getSession } from "~/lib/sessions.server";
import { redirect } from "react-router";
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
    familyGroupDetail,
    members,
    memorialContent
  };
}

export default function FamilyGroupDetail({ loaderData }: Route.ComponentProps) {
  const {
    user,
    familyGroupDetail,
    members,
    memorialContent
  } = loaderData;

  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  return (
    <div>
      <Button
        variant="ghost"
        className="mb-6"
        // onClick={() => setSelectedGroup(null)}
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
                <span>{user.role === "ADMIN" ? '관리자' : '멤버'}</span>
              </div>
            </div>

            {user.role === 'ADMIN' && (
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
                        <Button
                          variant="outline"
                          // onClick={() => setIsInviteDialogOpen(false)}
                        >
                          취소
                        </Button>
                        <Button
                          // onClick={handleInviteMember}
                        >
                          초대
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="destructive"
                  className="w-full"
                  // onClick={() => handleDeleteGroup(selectedGroup.id)}
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
              {members.map(member => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>{member.user.name}</AvatarFallback>
                    </Avatar>
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

                  {member.user.role === "ADMIN" &&
                  member.user.id !== user?.id && (
                    <Button
                      size="sm"
                      variant="ghost"
                      // onClick={() => handleRemoveMember(selectedGroup.id, member.id)}
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
  )
}
