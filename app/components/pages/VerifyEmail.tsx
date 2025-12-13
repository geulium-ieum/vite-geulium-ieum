import Loading from "~/components/atoms/Loading";
import FlexDiv from "~/components/FlexDiv";
import { userService } from "~/lib/services/user";
import { getSession } from "~/lib/sessions.server";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import type { Route } from "./+types/VerifyEmail";

export async function loader({ request }: Route.LoaderArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    return session.data.token;
}

export default function VerifyEmail({ loaderData }: Route.ComponentProps) {
    // TODO: token 저장
    const token = loaderData;
    const [email, setEmail] = useState<string | null>(null);

    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');

    useEffect(() => {
        const emailFromSessionStorage = window.sessionStorage.getItem('email');
        if (emailFromSessionStorage) {
            setEmail(emailFromSessionStorage);
        }
    }, []);

    useEffect(() => {
        if (!email || !code) return;
        (async () => {
            try {
                const token = await userService.post.verifyEmail({ email, code });
                //set token
            } catch (error) {
                console.error(error);
            }
        })
    }, [email, code]);

    return (
        <FlexDiv className="w-full h-dvh justify-center items-center">
            <Loading />
        </FlexDiv>
    )
}
