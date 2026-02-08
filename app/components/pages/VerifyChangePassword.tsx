import FlexDiv from "~/components/FlexDiv";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/components/ui/card";
import { Form } from "react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useState } from "react";

// export async function action({ request }: Route.ActionArgs) {
//     const formData = await request.formData();
//     const code = formData.get('code') as string;
//     if (!code) {
//         return;
//     }
//     return redirect(`/auth/password-reset/${code}`);
// }

export default function VerifyChangePassword() {
    const [code, setCode] = useState<string>("");
    return (
        <FlexDiv className="min-h-dvh items-center justify-center bg-linear-to-br from-purple-900 via-purple-800 to-blue-900 py-12 px-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">비밀번호 변경</CardTitle>
                    <CardDescription>비밀번호 변경을 위해 인증 코드를 입력해주세요.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form method="POST" className="flex flex-col gap-4 w-78">
                        <Input type="text" name="code" placeholder="인증 코드" />
                        <Button type="submit" className="w-full">인증</Button>
                    </Form>
                </CardContent>
            </Card>
        </FlexDiv>
    )
}