import Loading from "@/components/atoms/Loading";
import FlexDiv from "@/components/FlexDiv";
import { userService } from "@/lib/services/user";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export default function VerifyEmail() {
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
