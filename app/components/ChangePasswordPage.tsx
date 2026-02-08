import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Form } from 'react-router';
import { Button } from '~/components/ui/button';

export default function ChangePasswordPage() {
    return (
        <div className="bg-gray-50 max-w-7xl mx-auto">
            <div className="min-h-[calc(100vh-398px)] mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <h1 className="text-3xl text-gray-900 mb-2">
                    비밀번호 변경
                </h1>
            </div>
            <Card>
                <CardContent>
                    <Form 
                        method="POST" 
                        action="/auth/password-reset/request" 
                        className="flex flex-col gap-4"
                    >
                        <Label htmlFor="email">이메일 계정</Label>
                        <Input id="email"name="email" type="email" placeholder="이메일 계정을 입력하세요" />
                        <Button type="submit" className="w-full">이메일 전송</Button>
                    </Form>
                </CardContent>
            </Card>
            </div>
        </div>
    )
}