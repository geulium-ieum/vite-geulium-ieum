import { redirect } from "react-router";
import { userService } from "~/lib/services/user";
import type { Route } from "./+types/VerifyChangePassword";
import { toast } from "sonner";

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const code = formData.get('code') as string;
    const email = formData.get('email') as string;
    const newPassword = formData.get('newPassword') as string;
    if (!code || !email || !newPassword) {
        toast.error('필수 항목을 모두 입력해주세요');
        return;
    }
    try {
        await userService.post.verifyChangePassword({ code, email, newPassword });
        return redirect(`/`);
    } catch (error) {
        console.error(error);
    }
}

export default function VerifyChangePassword() {
    return null;
}