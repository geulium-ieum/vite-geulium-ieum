import type { Route } from "./+types/ChangePassword";
import { userService } from "~/lib/services/user";
import { redirect } from "react-router";
import FlexDiv from "./FlexDiv";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    if (!email) {
        alert('이메일 주소가 계정 주소와 일치하지 않습니다');
        return;
    }
    try {
        await userService.post.changePassword({ email });
        alert('이메일 전송이 완료되었습니다');
        return redirect('/login');
    } catch (error) {
        console.error(error);
    }
}

export default function ChangePassword() {
    return(
        <FlexDiv className="min-h-dvh items-center justify-center bg-linear-to-br from-purple-900 via-purple-800 to-blue-900 py-12 px-4">
            <Card>
                <CardHeader className="flex flex-row flex-wrap items-center gap-2">
                    <CardTitle className="text-2xl font-bold">인증 이메일이 발송되었습니다</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>인증 이메일을 확인해주세요</p>
                </CardContent>
            </Card>
        </FlexDiv>
    )
}