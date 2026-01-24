import { useState } from "react";
import {
  Search,
  Calendar,
  MapPin,
  User,
  Plus,
  Globe,
  Lock,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card } from "~/components/ui/card";
import type { User as UserType } from "~/types";
import { Footer } from "~/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { toast } from "sonner";
import { Badge } from "~/components/ui/badge";
import { Form } from "react-router";
import type { Route } from "./+types/SearchDeceased";

interface SearchDeceasedProps {
  user: UserType | null;
  onViewMemorial: (memorialId: string) => void;
}

const mockDeceasedList = [
  {
    id: "1",
    name: "김철수",
    birthDate: "1945-03-15",
    deathDate: "2024-08-20",
    location: "서울추모공원 A동 101호",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    visibility: "public" as const,
    members: [],
  },
  {
    id: "2",
    name: "이영희",
    birthDate: "1950-07-22",
    deathDate: "2024-09-10",
    location: "서울추모공원 B동 205호",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop",
    visibility: "public" as const,
    members: [],
  },
  {
    id: "3",
    name: "박민수",
    birthDate: "1960-11-30",
    deathDate: "2024-10-01",
    location: "서울추모공원 A동 303호",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
    visibility: "private" as const,
    members: ["user-1", "user-2"],
  },
  {
    id: "4",
    name: "최순자",
    birthDate: "1942-05-18",
    deathDate: "2024-07-15",
    location: "서울추모공원 C동 150호",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    visibility: "public" as const,
    members: [],
  },
];

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name")
  const birthDate = formData.get("birthDate")
  const deathDate = formData.get("deathDate")
  if (!name || !birthDate || !deathDate) {
    return;
  }
  
}

export default function SearchDeceased({
  user,
  onViewMemorial,
}: SearchDeceasedProps) {
  const [searchParams, setSearchParams] = useState({
    name: "",
    birthDate: "",
    deathDate: "",
    location: "",
  });
  const [searchResults, setSearchResults] =
    useState(mockDeceasedList);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] =
    useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    birthDate: "",
    deathDate: "",
    location: "",
    biography: "",
    visibility: "public" as "public" | "private",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const filtered = mockDeceasedList.filter((deceased) => {
      const nameMatch =
        !searchParams.name ||
        deceased.name.includes(searchParams.name);
      const birthMatch =
        !searchParams.birthDate ||
        deceased.birthDate.includes(searchParams.birthDate);
      const locationMatch =
        !searchParams.location ||
        deceased.location.includes(searchParams.location);

      return nameMatch && birthMatch && locationMatch;
    });

    setSearchResults(filtered);
  };

  const handleReset = () => {
    setSearchParams({
      name: "",
      birthDate: "",
      deathDate: "",
      location: "",
    });
    setSearchResults(mockDeceasedList);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("로그인이 필요합니다");
      return;
    }

    if (
      !registerData.name ||
      !registerData.birthDate ||
      !registerData.deathDate
    ) {
      toast.error("필수 항목을 모두 입력해주세요");
      return;
    }

    toast.success(
      "추모관 등록 신청이 완료되었습니다. 관리자 승인 후 이용 가능합니다.",
    );
    setIsRegisterDialogOpen(false);
    setRegisterData({
      name: "",
      birthDate: "",
      deathDate: "",
      location: "",
      biography: "",
      visibility: "public",
    });
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl min-h-[calc(100vh-398px)] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-gray-900 mb-2">
              고인 검색
            </h1>
            <p className="text-gray-600">
              고인의 정보를 입력하여 추모관을 찾아보세요
            </p>
          </div>
          {user && (
            <Button
              onClick={() => setIsRegisterDialogOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />새 추모관 등록
            </Button>
          )}
        </div>

        {/* Search Form */}
        <Card className="p-6 mb-8">
          <Form method="POST">
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label
                  htmlFor="search-name"
                  className="flex items-center gap-2 mb-2"
                >
                  <User className="w-4 h-4" />
                  고인명
                </Label>
                <Input
                  id="search-name"
                  name="name"
                  placeholder="예: 김철수"
                  value={searchParams.name}
                  onChange={(e) =>
                    setSearchParams((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <Label
                  htmlFor="search-birth"
                  className="flex items-center gap-2 mb-2"
                >
                  <Calendar className="w-4 h-4" />
                  생년월일
                </Label>
                <Input
                  id="search-birth"
                  name="birthDate"
                  type="date"
                  value={searchParams.birthDate}
                  onChange={(e) =>
                    setSearchParams((prev) => ({
                      ...prev,
                      birthDate: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <Label
                  htmlFor="search-death"
                  className="flex items-center gap-2 mb-2"
                >
                  <Calendar className="w-4 h-4" />
                  사망일
                </Label>
                <Input
                  id="search-death"
                  name="deathDate"
                  type="date"
                  value={searchParams.deathDate}
                  onChange={(e) =>
                    setSearchParams((prev) => ({
                      ...prev,
                      deathDate: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                className="flex-1 md:flex-initial"
              >
                <Search className="w-4 h-4 mr-2" />
                검색
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
              >
                초기화
              </Button>
            </div>
          </Form>
        </Card>

        {/* Search Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            총{" "}
            <span className="text-purple-600">
              {searchResults.length}
            </span>
            개의 추모관을 찾았습니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {searchResults.map((deceased) => (
            <Card
              key={deceased.id}
              className="overflow-hidden py-0 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onViewMemorial(deceased.id)}
            >
              <div className="aspect-square relative overflow-hidden bg-gray-200">
                <img
                  src={deceased.image}
                  alt={deceased.name}
                  className="w-full h-full object-cover"
                />
                {deceased.visibility === "private" && (
                  <div className="absolute top-3 right-3">
                    <Badge
                      variant="secondary"
                      className="bg-gray-900/80 text-white"
                    >
                      <Lock className="w-3 h-3 mr-1" />
                      비공개
                    </Badge>
                  </div>
                )}
                {deceased.visibility === "public" && (
                  <div className="absolute top-3 right-3">
                    <Badge
                      variant="secondary"
                      className="bg-white/80 text-gray-900"
                    >
                      <Globe className="w-3 h-3 mr-1" />
                      공개
                    </Badge>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl mb-3">
                  {deceased.name}
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {deceased.birthDate.replace(
                      /-/g,
                      ".",
                    )} ~ {deceased.deathDate.replace(/-/g, ".")}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {deceased.location}
                  </p>
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewMemorial(deceased.id);
                  }}
                >
                  추모관 방문
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {searchResults.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl text-gray-900 mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-gray-600">
              다른 검색어로 다시 시도해보세요
            </p>
          </div>
        )}
      </div>

      {/* Register Memorial Dialog */}
      <Dialog
        open={isRegisterDialogOpen}
        onOpenChange={setIsRegisterDialogOpen}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>새 추모관 등록</DialogTitle>
            <DialogDescription>
              추모관 정보를 입력해주세요. 관리자 승인 후 이용
              가능합니다.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleRegisterSubmit}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reg-name">
                  고인명 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="reg-name"
                  required
                  value={registerData.name}
                  onChange={(e) =>
                    setRegisterData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="예: 김철수"
                />
              </div>

              <div>
                <Label htmlFor="reg-location">안치 위치</Label>
                <Input
                  id="reg-location"
                  value={registerData.location}
                  onChange={(e) =>
                    setRegisterData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  placeholder="예: 서울추모공원 A동 101호"
                />
              </div>

              <div>
                <Label htmlFor="reg-birth">
                  생년월일{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="reg-birth"
                  type="date"
                  required
                  value={registerData.birthDate}
                  onChange={(e) =>
                    setRegisterData((prev) => ({
                      ...prev,
                      birthDate: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="reg-death">
                  사망일 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="reg-death"
                  type="date"
                  required
                  value={registerData.deathDate}
                  onChange={(e) =>
                    setRegisterData((prev) => ({
                      ...prev,
                      deathDate: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div>
              <Label htmlFor="reg-bio">약력 및 소개</Label>
              <Textarea
                id="reg-bio"
                rows={4}
                value={registerData.biography}
                onChange={(e) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    biography: e.target.value,
                  }))
                }
                placeholder="고인의 생애와 추억을 간단히 작성해주세요"
              />
            </div>

            <div>
              <Label htmlFor="reg-visibility">
                공개 설정{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Select
                value={registerData.visibility}
                onValueChange={(value: "public" | "private") =>
                  setRegisterData((prev) => ({
                    ...prev,
                    visibility: value,
                  }))
                }
              >
                <SelectTrigger id="reg-visibility">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      공개 - 모든 사용자가 볼 수 있습니다
                    </div>
                  </SelectItem>
                  <SelectItem value="private">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      비공개 - 가족 그룹 멤버만 볼 수 있습니다
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-2">
                {registerData.visibility === "public"
                  ? "누구나 추모관을 방문하고 추모글을 남길 수 있습니다."
                  : "가족 그룹에 초대된 멤버만 추모관에 접근할 수 있습니다."}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>안내사항</strong>
                <br />
                • 추모관 등록 신청 후 관리자 승인까지 1-2일
                소요됩니다.
                <br />
                • 승인 결과는 이메일과 알림으로 안내됩니다.
                <br />• 비공개 추모관은 가족 그룹 생성 후 멤버를
                초대할 수 있습니다.
              </p>
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsRegisterDialogOpen(false)}
              >
                취소
              </Button>
              <Button type="submit">등록 신청</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
