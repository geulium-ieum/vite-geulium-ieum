import { getUser, postLogin, postRegister, postVerifyEmail, postChangePassword } from "~/lib/apis/user";
import type { PostLoginParams, PostRegisterParams, PostVerifyEmailParams, PostChangePasswordParams } from "~/types";

class UserService {
    public get = {
        user: async (token: string) => {
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
        },
        changePassword: async ({ email }: PostChangePasswordParams) => {
            return await postChangePassword({ email });
        }
    }
}

export const userService = new UserService();
