import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import FlexDiv from "@/components/FlexDiv";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
    const { user } = useAuth();

    return (
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <FlexDiv className="items-center justify-between">
                    <Link to={
                        user?.role === "ADMIN" ||
                            user?.role === "SUPER_ADMIN" ?
                            '/admin-dashboard'
                            :
                            '/home'
                    }>
                        <FlexDiv className="items-center gap-3 cursor-pointer">
                            <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white">🕊️</span>
                            </div>
                            <h1 className="text-xl text-gray-900">그리움 이음</h1>
                        </FlexDiv>
                    </Link>

                    <nav className="flex items-center gap-6">
                        {user && (
                            <>
                                {(user.role === "USER" || !user.role) && (
                                    <>
                                        <Link to="/home">
                                            <Button
                                                variant="ghost"
                                                className="text-gray-700 hover:text-gray-900 transition-colors"
                                            >
                                                홈
                                            </Button>
                                        </Link>
                                        <Link to="/search">
                                            <Button
                                                variant="ghost"
                                                className="text-gray-700 hover:text-gray-900 transition-colors"
                                            >
                                                고인 검색
                                            </Button>
                                        </Link>
                                        <Link to="/family-groups">
                                            <Button
                                                variant="ghost"
                                                className="text-gray-700 hover:text-gray-900 transition-colors"
                                            >
                                                가족 그룹
                                            </Button>
                                        </Link>
                                    </>
                                )}
                                {(user.role === "ADMIN" || user.role === "SUPER_ADMIN") && (
                                    <>
                                        <Link to="/admin-dashboard">
                                            <Button
                                                variant="ghost"
                                                className="text-gray-700 hover:text-gray-900 transition-colors"
                                            >
                                                대시보드
                                            </Button>
                                        </Link>
                                        <Link to="/announcements">
                                            <Button
                                                variant="ghost"
                                                className="text-gray-700 hover:text-gray-900 transition-colors"
                                            >
                                                공지사항 관리
                                            </Button>
                                        </Link>
                                    </>
                                )}

                                <div className="relative">
                                    <Link to="/notifications">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="relative"
                                        >
                                            <Bell className="h-5 w-5" />
                                            {unreadCount > 0 && (
                                                <Badge
                                                    variant="destructive"
                                                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                                                >
                                                    {unreadCount}
                                                </Badge>
                                            )}
                                        </Button>
                                    </Link>
                                </div>
                                <Link to={
                                    user.role === "ADMIN" ||
                                    user.role === "SUPER_ADMIN" ?
                                        '/admin-mypage'
                                        :
                                        '/mypage'
                                }>
                                    <Button className="text-gray-700 hover:text-gray-900 transition-colors">
                                        마이페이지
                                    </Button>
                                </Link>
                            </>
                        )}
                        {!user && (
                            <>
                                <Link to="/login">
                                    <Button className="text-gray-700 hover:text-gray-900 transition-colors">
                                        로그인
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button>
                                        회원가입
                                    </Button>
                                </Link>
                            </>
                        )}
                    </nav>
                </FlexDiv>
            </div>
        </header>
    )
}
