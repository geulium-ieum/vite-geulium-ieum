import { getUser, postVerifyEmail } from "~/lib/apis/user";
import type { PostVerifyEmailParams } from "~/types";

class UserService {
    private requireToken(): string {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("Token is required");
        return token;
    }

    public get = {
        user: async () => {
            try {
                const token = this.requireToken();
                return await getUser(token);
            } catch (error) {
                throw error;
            }
        }
    }
    
    public post = {
        verifyEmail: async ({ email, code }: PostVerifyEmailParams) => {
            try {
                return await postVerifyEmail({ email, code });
            } catch (error) {
                throw error;
            }
        }
    }
}

export const userService = new UserService();
