import { Button } from '~/components/ui/button';
import { ChevronDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "~/components/ui/dropdown-menu";
import { Link } from 'react-router';
import { useState } from 'react';
import type { User } from '~/types';

export default function ProfileDropDown({ user }: { user: User }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
//   const handleLogout = async () => {
//     if (isLoggingOut) return;
    
//     setIsLoggingOut(true);
//     try {
//       const session = await getSession(request.headers.get('Cookie'));
//       const token = session.get('token') as string;
//       alert('로그아웃되었습니다.');
//       // 페이지 리로드하여 세션 쿠키 삭제 반영
//       window.location.href = '/';
//     } catch (error) {
//       alert('로그아웃 중 오류가 발생했습니다.');
//     }
//   };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          {user.name} 님 <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
          <Link to={
            user.role === "ADMIN" ||
            user.role === "SUPER_ADMIN" ?
                '/admin-mypage'
                :
                '/mypage'
            }>
              마이페이지
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem 
            // onClick={handleLogout}
            // disabled={isLoggingOut}
            className="cursor-pointer"
          >
            로그아웃
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}