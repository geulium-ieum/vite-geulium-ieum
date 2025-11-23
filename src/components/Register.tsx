import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';

export function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error('필수 항목을 모두 입력해주세요');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다');
      return;
    }

    if (!agreements.terms || !agreements.privacy) {
      toast.error('필수 약관에 동의해주세요');
      return;
    }

    toast.success('회원가입이 완료되었습니다');
    navigate('/login');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAgreementChange = (field: string, checked: boolean) => {
    setAgreements(prev => ({ ...prev, [field]: checked }));
  };

  const handleAllAgree = (checked: boolean) => {
    setAgreements({
      terms: checked,
      privacy: checked,
      marketing: checked,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-900 via-purple-800 to-blue-900 py-12 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🕊️</span>
          </div>
          <h1 className="text-2xl text-gray-900 mb-2">회원가입</h1>
          <p className="text-gray-600">그리움 이음과 함께 시작하세요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">이름 *</Label>
            <Input
              id="name"
              placeholder="홍길동"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="email">이메일 *</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="phone">휴대폰 번호</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="010-1234-5678"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="password">비밀번호 *</Label>
            <Input
              id="password"
              type="password"
              placeholder="8자 이상 입력해주세요"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">비밀번호 확인 *</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            />
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="all-agree"
                checked={agreements.terms && agreements.privacy && agreements.marketing}
                onCheckedChange={handleAllAgree}
              />
              <Label htmlFor="all-agree" className="cursor-pointer">
                전체 동의
              </Label>
            </div>

            <div className="pl-6 space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreements.terms}
                  onCheckedChange={(checked) => handleAgreementChange('terms', checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm cursor-pointer">
                  이용약관 동의 (필수)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="privacy"
                  checked={agreements.privacy}
                  onCheckedChange={(checked) => handleAgreementChange('privacy', checked as boolean)}
                />
                <Label htmlFor="privacy" className="text-sm cursor-pointer">
                  개인정보 수집 및 이용 동의 (필수)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="marketing"
                  checked={agreements.marketing}
                  onCheckedChange={(checked) => handleAgreementChange('marketing', checked as boolean)}
                />
                <Label htmlFor="marketing" className="text-sm cursor-pointer">
                  마케팅 정보 수신 동의 (선택)
                </Label>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            회원가입
          </Button>

          <div className="text-center text-sm text-gray-600">
            이미 계정이 있으신가요?{' '}
            <Link
              to="/login"
              className="text-purple-600 hover:underline"
            >
              로그인
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
