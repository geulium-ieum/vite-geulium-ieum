import type { Route } from "./+types/ResetPassword";

// export async function action({ request }: Route.ActionArgs) {
//     const formData = await request.formData();
//     const email = formData.get('email') as string;
//     if (!email) {
//         alert('이메일을 입력해주세요');
//         return;
//     }
//     try {
//         http.post('/auth/password-reset-request', {
//             email,
//         });
//     } catch (error) {
//         console.error(error);
//     }
// }

export default function ResetPassword() {
    return null;
}