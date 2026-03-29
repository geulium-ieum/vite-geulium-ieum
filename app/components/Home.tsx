import {
  Search,
  Users,
  Calendar,
  NotebookPen,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Footer } from "~/components/Footer";
import { Card } from "~/components/ui/card";
import { Link, useNavigate } from "react-router";
import FlexDiv from "~/components/FlexDiv";
import { userContext } from "~/context/userContext";
import type { Route } from "./+types/Home";
import { memorialService } from "~/lib/services/memorial";
import { updatedTime } from "~/lib/utils";

export async function loader({ context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  if (user) {
    const { content } = await memorialService.get.memorialList({
      size: 3,
      sort: [{ field: 'updatedAt', direction: 'desc' }]
    });
    return { user, content };
  }
  return { user };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { user, content: featuredMemorials } = loaderData;

  const navigate = useNavigate();

  return (
    <div className="h-full">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-purple-900 via-purple-800 to-blue-900 text-white py-40">
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
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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
              <h2 className="text-xl md:text-3xl text-gray-900">
                최근 활동이 있는 추모관
              </h2>
              <Button
                variant="ghost"
                onClick={() => navigate("/search")}
              >
                전체보기
              </Button>
            </div>
            {featuredMemorials.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredMemorials.map((memorial) => (
                  <Card
                    key={memorial.id}
                    className="py-0 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigate(`/memorial/${memorial.id}`)}
                  >
                    <div className="aspect-square relative overflow-hidden bg-gray-200">
                      {memorial.photoUrl && (
                        <img
                          src={memorial.photoUrl}
                          alt={memorial.deceasedName}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl mb-2">
                        {memorial.deceasedName}
                      </h3>
                      <p className="text-gray-600 text-sm mb-1">
                        {memorial.birthDate} ~{" "}
                        {memorial.deathDate}
                      </p>
                      <p className="text-purple-600 text-sm">
                        {updatedTime(memorial.updatedAt)}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="size-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="size-8 text-gray-400" />
                </div>
                <h3 className="text-lg md:text-xl text-gray-900 mb-2">
                  최근 활동이 있는 추모관이 없습니다
                </h3>
              </div>
            )}
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
