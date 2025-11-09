import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Page } from '@/types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [activeDialog, setActiveDialog] = useState<'faq' | 'inquiry' | 'guide' | 'terms' | 'privacy' | 'accessibility' | null>(null);

  return (
    <>
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-linear-to-br from-purple-600 to-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-sm">🕊️</span>
                </div>
                <span className="text-white">그리움 이음</span>
              </div>
              <p className="text-sm text-gray-400">
                언제 어디서나 사랑하는 분을 추모하는 특별한 공간
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white mb-4">바로가기</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button 
                    onClick={() => onNavigate('home')} 
                    className="hover:text-white transition-colors"
                  >
                    홈
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('search')} 
                    className="hover:text-white transition-colors"
                  >
                    고인 검색
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('announcements')} 
                    className="hover:text-white transition-colors"
                  >
                    공지사항
                  </button>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white mb-4">고객지원</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button 
                    onClick={() => setActiveDialog('faq')}
                    className="hover:text-white transition-colors"
                  >
                    자주 묻는 질문
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveDialog('inquiry')}
                    className="hover:text-white transition-colors"
                  >
                    1:1 문의
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveDialog('guide')}
                    className="hover:text-white transition-colors"
                  >
                    이용 가이드
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white mb-4">약관 및 정책</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button 
                    onClick={() => setActiveDialog('terms')}
                    className="hover:text-white transition-colors"
                  >
                    이용약관
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveDialog('privacy')}
                    className="hover:text-white transition-colors"
                  >
                    개인정보처리방침
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveDialog('accessibility')}
                    className="hover:text-white transition-colors"
                  >
                    웹 접근성 정책
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-400 text-center">
            <p>© 2025 그리움 이음. All rights reserved.</p>
            <p className="mt-2 flex items-center justify-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500" /> for remembrance
            </p>
          </div>
        </div>
      </footer>

      {/* FAQ Dialog */}
      <Dialog open={activeDialog === 'faq'} onOpenChange={() => setActiveDialog(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>자주 묻는 질문</DialogTitle>
            <DialogDescription>그리움 이음 서비스 이용 시 자주 묻는 질문들입니다</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <h3 className="mb-2">Q. 추모관은 어떻게 만드나요?</h3>
              <p className="text-gray-600 text-sm">
                로그인 후 "고인 검색" 메뉴에서 "새 추모관 등록" 버튼을 클릭하여 추모관을 생성할 수 있습니다. 
                관리자 승인 후 이용 가능합니다.
              </p>
            </div>
            <div>
              <h3 className="mb-2">Q. 추모관은 무료인가요?</h3>
              <p className="text-gray-600 text-sm">
                기본 추모관은 무료로 제공됩니다. 프리미엄 기능(확장 저장공간, 특별 템플릿)은 유료입니다.
              </p>
            </div>
            <div>
              <h3 className="mb-2">Q. 가족 그룹은 어떻게 사용하나요?</h3>
              <p className="text-gray-600 text-sm">
                "가족 그룹" 메뉴에서 새 그룹을 만들고 가족 구성원을 초대할 수 있습니다. 
                그룹 멤버들은 함께 추모관을 관리하고 추억을 공유할 수 있습니다.
              </p>
            </div>
            <div>
              <h3 className="mb-2">Q. 비공개 추모글은 누가 볼 수 있나요?</h3>
              <p className="text-gray-600 text-sm">
                비공개로 설정한 추모글은 본인과 해당 추모관의 가족 그룹 관리자만 볼 수 있습니다.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Inquiry Dialog */}
      <Dialog open={activeDialog === 'inquiry'} onOpenChange={() => setActiveDialog(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>1:1 문의</DialogTitle>
            <DialogDescription>문의사항을 남겨주시면 빠르게 답변드리겠습니다</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>고객센터 연락처</strong><br />
                이메일: support@grieum.com<br />
                전화: 1588-1234 (평일 09:00-18:00)<br />
                카카오톡: @그리움이음
              </p>
            </div>
            <p className="text-sm text-gray-600">
              * 온라인 문의 양식은 개발 중입니다. 당분간 위 연락처로 문의해주시기 바랍니다.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Guide Dialog */}
      <Dialog open={activeDialog === 'guide'} onOpenChange={() => setActiveDialog(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>이용 가이드</DialogTitle>
            <DialogDescription>그리움 이음 서비스 이용 방법을 안내합니다</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <h3 className="mb-3">1. 회원가입 및 로그인</h3>
              <p className="text-gray-600 text-sm mb-2">
                이메일 또는 소셜 계정(카카오, 네이버)으로 간편하게 가입할 수 있습니다.
              </p>
            </div>
            <div>
              <h3 className="mb-3">2. 추모관 이용하기</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                <li>고인 검색: 이름, 생년월일로 추모관을 찾을 수 있습니다</li>
                <li>온라인 성묘: 헌화, 분향, 헌촛을 할 수 있습니다</li>
                <li>추모글 남기기: 공개 또는 비공개로 추모글을 작성할 수 있습니다</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3">3. 가족 그룹 만들기</h3>
              <p className="text-gray-600 text-sm">
                가족 그룹을 만들어 구성원들과 함께 추모관을 관리하고 추억을 공유하세요.
              </p>
            </div>
            <div>
              <h3 className="mb-3">4. 기일 알림 설정</h3>
              <p className="text-gray-600 text-sm">
                마이페이지에서 알림을 설정하여 소중한 날을 잊지 않도록 하세요.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Terms Dialog */}
      <Dialog open={activeDialog === 'terms'} onOpenChange={() => setActiveDialog(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>이용약관</DialogTitle>
            <DialogDescription>그리움 이음 서비스 이용약관입니다</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h3 className="mb-2">제1조 (목적)</h3>
              <p>
                본 약관은 그리움 이음(이하 "회사")이 제공하는 온라인 추모 서비스의 이용과 
                관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </div>
            <div>
              <h3 className="mb-2">제2조 (정의)</h3>
              <p>
                1. "서비스"란 온라인 추모관 운영 및 관련 부가서비스를 말합니다.<br />
                2. "회원"이란 본 약관에 동의하고 회사와 서비스 이용계약을 체결한 자를 말합니다.<br />
                3. "추모관"이란 고인을 추모하기 위한 온라인 공간을 말합니다.
              </p>
            </div>
            <div>
              <h3 className="mb-2">제3조 (서비스 이용)</h3>
              <p>
                1. 회원은 본 약관과 관련 법령을 준수하여야 합니다.<br />
                2. 회사는 관련 법령이 정하는 바에 따라 서비스를 제공합니다.<br />
                3. 회원은 타인의 명예를 훼손하거나 부적절한 콘텐츠를 게시해서는 안 됩니다.
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-6">
              * 전체 약관 내용은 개발 중이며, 정식 서비스 시 제공됩니다.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Privacy Dialog */}
      <Dialog open={activeDialog === 'privacy'} onOpenChange={() => setActiveDialog(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>개인정보처리방침</DialogTitle>
            <DialogDescription>그리움 이음의 개인정보 처리 방침입니다</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h3 className="mb-2">1. 개인정보의 수집 및 이용 목적</h3>
              <p>
                회사는 다음의 목적을 위하여 개인정보를 처리합니다:<br />
                - 회원 가입 및 관리<br />
                - 서비스 제공 및 개선<br />
                - 고객 문의 응대<br />
                - 서비스 관련 공지사항 전달
              </p>
            </div>
            <div>
              <h3 className="mb-2">2. 수집하는 개인정보 항목</h3>
              <p>
                - 필수항목: 이름, 이메일, 비밀번호<br />
                - 선택항목: 휴대폰 번호, 프로필 사진
              </p>
            </div>
            <div>
              <h3 className="mb-2">3. 개인정보의 보유 및 이용기간</h3>
              <p>
                회원 탈퇴 시까지 보유하며, 관련 법령에 따라 일정 기간 보관할 수 있습니다.
              </p>
            </div>
            <div>
              <h3 className="mb-2">4. 개인정보의 안전성 확보조치</h3>
              <p>
                회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:<br />
                - 개인정보 암호화<br />
                - 해킹 등에 대비한 기술적 대책<br />
                - 접근 권한 관리
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-6">
              * 전체 개인정보처리방침은 개발 중이며, 정식 서비스 시 제공됩니다.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Accessibility Dialog */}
      <Dialog open={activeDialog === 'accessibility'} onOpenChange={() => setActiveDialog(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>웹 접근성 정책</DialogTitle>
            <DialogDescription>그리움 이음의 웹 접근성 정책입니다</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h3 className="mb-2">접근성 준수</h3>
              <p>
                그리움 이음은 모든 사용자가 서비스를 원활하게 이용할 수 있도록 
                한국형 웹 콘텐츠 접근성 지침(KWCAG) 2.1을 준수하기 위해 노력하고 있습니다.
              </p>
            </div>
            <div>
              <h3 className="mb-2">주요 접근성 기능</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>스크린 리더 호환성</li>
                <li>키보드만으로 모든 기능 이용 가능</li>
                <li>명확한 콘텐츠 구조 및 헤딩</li>
                <li>충분한 색상 대비</li>
                <li>반응형 디자인으로 다양한 기기 지원</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2">접근성 개선 노력</h3>
              <p>
                저희는 지속적으로 서비스의 접근성을 개선하고 있습니다. 
                접근성 관련 문제를 발견하시면 고객센터로 문의해 주시기 바랍니다.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p>
                <strong>접근성 문의</strong><br />
                이메일: accessibility@grieum.com
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
