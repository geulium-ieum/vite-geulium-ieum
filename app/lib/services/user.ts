import { getUser, postLogin, postRegister, postVerifyEmail, postChangePassword, postVerifyChangePassword, getUserNotificationList } from "~/lib/apis/user";
import type { PostLoginParams, PostRegisterParams, PostVerifyEmailParams, PostChangePasswordParams, PostVerifyChangePasswordParams, GetNotificationListParams } from "~/types";

class UserService {
    public get = {
        user: async (token: string) => {
            return await getUser(token);
        },
        notificationList: async ({size, content, number, sort, numberOfElements, pageable, first, last, empty }: GetNotificationListParams) => {
            return await getUserNotificationList({ size, content, number, sort, numberOfElements, pageable, first, last, empty });
        },
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
        },
    }
}

export const userService = new UserService();
