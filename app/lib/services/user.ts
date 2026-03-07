import { getUser, postLogin, postRegister, postVerifyEmail, postChangePassword, postVerifyChangePassword, getMe } from "~/lib/apis/user";
import type { PostLoginParams, PostRegisterParams, PostVerifyEmailParams, PostChangePasswordParams, PostVerifyChangePasswordParams } from "~/types";

class UserService {
    public get = {
        me: async ({ token }: { token: string }) => {
            return await getMe({ token });
        },
        user: async ({
            id,
            token
        }: {
            id: string
            token: string
        }) => {
            return await getUser({ id, token });
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
        },
        verifyChangePassword: async ({ code, email, newPassword }: PostVerifyChangePasswordParams) => {
            return await postVerifyChangePassword({ code, email, newPassword });
        }
    }
}

export const userService = new UserService();
