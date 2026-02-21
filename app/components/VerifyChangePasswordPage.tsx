import { useState } from "react";
import { useEffect } from "react";
import FlexDiv from "./FlexDiv";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Form } from "react-router";

export default function VerifyChangePasswordPage() {
    const [code, setCode] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    useEffect(() => {
        const emailFromSessionStorage = window.sessionStorage.getItem('email');
        const codeFromSessionStorage = window.sessionStorage.getItem('code');
        const newPasswordFromSessionStorage = window.sessionStorage.getItem('newPassword');
        const confirmPasswordFromSessionStorage = window.sessionStorage.getItem('confirmPassword');
        if (emailFromSessionStorage) {
            setEmail(emailFromSessionStorage);
        }
        if (codeFromSessionStorage) {
            setCode(codeFromSessionStorage);
        }
        if (newPasswordFromSessionStorage) {
            setNewPassword(newPasswordFromSessionStorage);
        }
        if (confirmPasswordFromSessionStorage) {
            setConfirmPassword(confirmPasswordFromSessionStorage);
        }
    }, []);

    return (
        <FlexDiv className="min-h-dvh items-center justify-center bg-linear-to-br from-purple-900 via-purple-800 to-blue-900 py-12 px-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">비밀번호 변경</CardTitle>
                    <CardDescription>비밀번호 변경을 위해 인증 코드를 입력해주세요.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form method="POST" action="/auth/password-reset/verify" className="flex flex-col gap-4 w-78">
                        <Input type="text" name="code" placeholder="인증 코드" value={code} onChange={(e) => setCode(e.target.value)} />
                        <Input type="text" name="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input type="password" name="newPassword" placeholder="비밀번호" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        <Input type="password" name="confirmPassword" placeholder="비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        {newPassword !== confirmPassword && <p className="text-red-500">비밀번호가 일치하지 않습니다</p>}
                        <Button 
                            type="submit" 
                            className="w-full" 
                            disabled={newPassword !== confirmPassword 
                                || !email 
                                || !newPassword 
                                || !confirmPassword
                                || !code}>
                                    비밀번호 변경
                        </Button>
                    </Form>
                </CardContent>
            </Card>
        </FlexDiv>
    )
}