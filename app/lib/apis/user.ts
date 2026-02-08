import { http } from "~/lib/utils"
import * as v from 'valibot';
import { TokenSchema, UserSchema } from "~/constants/user";
import type { PostLoginParams, PostRegisterParams, PostVerifyEmailParams, PostChangePasswordParams } from "~/types";

export async function getUser(token: string) {
    try {
        const response = await http.get('user/me', {
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
    try {
        const response: { message: string } = await http.post('auth/register', {
            json: {
                email,
                password,
                phone,
                name
            }
        }).json();
        return response;
    } catch (error) {
        throw error;
    }
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

export async function postLogin({
    email,
    password
}: PostLoginParams) {
    try {
        const response = await http.post('auth/login', {
            json: {
                email,
                password
            }
        }).json();
        return v.parse(TokenSchema, response);
    } catch (error) {
        throw error;
    }
}

export async function postLogout() {
    try {
        const response = await http.post('auth/logout').json();
        return v.parse(TokenSchema, response);
    } catch (error) {
        throw error;
    }
}

export async function postChangePassword({
    email
}: PostChangePasswordParams) {
    try {
        const response = await http.post('auth/password-reset/request', {
            json: { email }
        }).json();
        return response;
    } catch (error) {
        throw error;
    }
}