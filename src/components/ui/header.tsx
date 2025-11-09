import { Button } from "./button"

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
            {/* 로고 이미지 */}
                <img src="/logo.png" alt="그리움 이음" width={100} height={100} />
            {/* 로고 텍스트 */}
                <h1 className="text-xl text-gray-900">그리움 이음</h1>
        </div>
        <div className="flex items-center gap-2 p-4">
            {/* 로그인 버튼 */}
                <Button className="text-gray-700 text-white transition-colors">
                    로그인
                </Button>
            {/* 회원가입 버튼 */}
                <Button className="text-gray-700 text-white transition-colors">
                    회원가입
                </Button>
        </div>
      </div>
    </header>
  )
}