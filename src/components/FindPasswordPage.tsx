import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useState } from 'react';

export function FindPasswordPage() {
  const [email, setEmail] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('비밀번호 찾기 링크를 보내드립니다.');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-purple-900 via-purple-800 to-blue-900 py-12 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🕊️</span>
          </div>
          <h1 className="text-2xl text-gray-900 mb-2">그리움 이음</h1>
          <p className="text-gray-600">비밀번호를 찾으려는 이메일을 입력해주세요</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">이메일</Label>
              <Input id="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <Button type="submit">비밀번호 찾기</Button>
          </form>
        </div>
      </Card>
    </div>
  );
}