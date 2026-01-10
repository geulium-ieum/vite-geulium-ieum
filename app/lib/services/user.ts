import { getUser, postLogin, postRegister, postVerifyEmail } from "~/lib/apis/user";
import type { PostLoginParams, PostRegisterParams, PostVerifyEmailParams } from "~/types";

class UserService {
    private requireToken(): string {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("Token is required");
        return token;
    }

    public get = {
        user: async () => {
            const token = this.requireToken();
            return await getUser(token);
        }
    }
    
    public post = {
        register: async ({
            email,
            password,
            phone,
            name
        }: PostRegisterParams) => {
            return await postRegister({ email, password, phone, name });
        },
        verifyEmail: async ({ email, code }: PostVerifyEmailParams) => {
            return await postVerifyEmail({ email, code });
        },
        login: async ({ email, password }: PostLoginParams) => {
            return await postLogin({ email, password });
        }
    }
}

export const userService = new UserService();
