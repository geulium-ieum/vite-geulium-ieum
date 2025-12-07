import {
  Search,
  Users,
  Calendar,
  NotebookPen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router";
import FlexDiv from "@/components/FlexDiv";
import { useAuth } from "@/context/AuthContext";

const featuredMemorials = [
  {
    id: "1",
    name: "김철수",
    birthDate: "1945.03.15",
    deathDate: "2024.08.20",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    recentActivity: "2일 전 추모글",
  },
  {
    id: "2",
    name: "이영희",
    birthDate: "1950.07.22",
    deathDate: "2024.09.10",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop",
    recentActivity: "5일 전 헌화",
  },
  {
    id: "3",
    name: "박민수",
    birthDate: "1960.11.30",
    deathDate: "2024.10.01",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
    recentActivity: "1주 전 방명록",
  },
];

export default function Home() {
  const navigate = useNavigate();

  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-purple-900 via-purple-800 to-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl mb-6">
              그리움을 이어가는 특별한 공간
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              언제 어디서나 사랑하는 분을 추모하고, 소중한
              추억을 영원히 간직하세요
            </p>
            {!user && (
              <FlexDiv className="gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => navigate("/register")}
                >
                  시작하기
                </Button>
              </FlexDiv>
            )}
            {user && (
              <Button
                size="lg"
                onClick={() => navigate("/search")}
              >
                고인 검색하기
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center mb-12 text-gray-900">
            주요 기능
          </h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <Link to="/search">
              <Card className="h-full p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-lg mb-2">간편한 검색</h3>
                <p className="text-gray-600 text-sm">
                  고인명, 생년월일 등으로 쉽게 추모관을 찾을 수
                  있습니다
                </p>
              </Card>
            </Link>

            <Link to={user ? "/family-groups" : "/login"}>
              <Card className="h-full p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-lg mb-2">가족 그룹</h3>
                <p className="text-gray-600 text-sm">
                  가족 구성원과 함께 추억을 공유하고 관리할 수
                  있습니다
                </p>
              </Card>
            </Link>

            <Link to={user ? "/mypage" : "/login"}>
              <Card className="h-full p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="text-lg mb-2">기일 알림</h3>
                <p className="text-gray-600 text-sm">
                  소중한 날을 잊지 않도록 알림을 받을 수 있습니다
                </p>
              </Card>
            </Link>

            <Link to={user ? "/mypage" : "/login"}>
              <Card className="h-full p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <NotebookPen className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="text-lg mb-2">추모글 작성</h3>
                <p className="text-gray-600 text-sm">
                  고인을 향한 마음을 글로 남겨보세요.
                </p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Memorials */}
      {user && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl text-gray-900">
                최근 활동이 있는 추모관
              </h2>
              <Button
                variant="ghost"
                onClick={() => navigate("/search")}
              >
                전체보기
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredMemorials.map((memorial) => (
                <Card
                  key={memorial.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/memorial/${memorial.id}`)}
                >
                  <div className="aspect-square relative overflow-hidden bg-gray-200">
                    <img
                      src={memorial.image}
                      alt={memorial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl mb-2">
                      {memorial.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-1">
                      {memorial.birthDate} ~{" "}
                      {memorial.deathDate}
                    </p>
                    <p className="text-purple-600 text-sm">
                      {memorial.recentActivity}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!user && (
        <section className="py-16 bg-purple-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl mb-6 text-gray-900">
              지금 시작하세요
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              무료로 회원가입하고 소중한 분들을 위한 추모 공간을
              만들어보세요
            </p>
            <Link to="/register">
              <Button size="lg">
                무료 회원가입
              </Button>
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
