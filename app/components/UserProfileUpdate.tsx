import type { Route } from "./+types/Logout";
import  { userService } from "~/lib/services/user";
import { toast } from "sonner";
import { useState } from "react";
import { userContext } from "~/context/userContext";
import { redirect } from "react-router";

export async function action({ request, context }: Route.ActionArgs){
    const user = context.get(userContext);
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const marketingAgreed = formData.get('marketingAgreed') as unknown as boolean;
    console.log("name", name);
    console.log("phone", phone);
    console.log("marketingAgreed", marketingAgreed);
    console.log("userId", user?.id);
    if(!user) {
        return redirect('/login');
    }
    if (!name || !phone || !marketingAgreed) {
        toast.error('필수 항목을 모두 입력해주세요');
        return;
    }
    try {
        await userService.put.userProfile({ name, phone, marketingAgreed, userId: user.id });
        return redirect('/mypage');
    } catch (error) {
        console.error(error);
}
}

export default function UserProfileUpdate() {
    return null;
}