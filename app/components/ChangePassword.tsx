import type { Route } from "./+types/ChangePassword";
import { userService } from "~/lib/services/user";
import { toast } from "sonner";
import { redirect } from "react-router";
import type { User } from "~/types";

export async function action({ request }: Route.ActionArgs, { user }: { user: User }) {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    if (email !== user.email) {
        toast.error('이메일 주소가 계정 주소와 일치하지 않습니다');
        return;
    }
    try {
        await userService.post.changePassword({ email });
        toast.success('이메일 전송이 완료되었습니다');
        return redirect('/login');
    } catch (error) {
        console.error(error);
    }
}

export default function ChangePassword() {
    return null;
}