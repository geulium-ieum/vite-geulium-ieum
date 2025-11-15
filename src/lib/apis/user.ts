import { http } from "@/lib/utils"
import * as v from 'valibot';
import { UserSchema } from "@/constants/user";

export async function getUser(token: string) {
    try {
        const response = await http.get('/user/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).json();
        return v.parse(UserSchema, response);
    } catch (error) {
        throw error;
    }
}
