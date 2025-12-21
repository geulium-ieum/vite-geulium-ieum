import { http } from "~/lib/utils"
import * as v from 'valibot';
import { TokenSchema, UserSchema } from "~/constants/user";
import type { PostRegisterParams, PostVerifyEmailParams } from "~/types";

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

export async function postRegister({
    email,
    password,
    phone,
    name
}: PostRegisterParams) {
    await http.post('auth/register', {
        json: {
            email,
            password,
            phone,
            name
        }
    }).json();
}

export async function postVerifyEmail({
    email,
    code
}: PostVerifyEmailParams) {
    try {
        const response = await http.post('auth/verify-email', {
            json: {
                email,
                code
            }
        }).json();
        return v.parse(TokenSchema, response);
    } catch (error) {
        throw error;
    }
}
