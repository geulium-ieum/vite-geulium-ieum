import { createCookie, createCookieSessionStorage } from "react-router";

type sessionData = {
    token: string;
};

type SessionFlashData = {
    error: string;
}

export const session = createCookie("token", {
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    maxAge: 60 * 60 * 6,
    secure: import.meta.env.PROD,
    secrets: [import.meta.env.VITE_SECRET_KEY],
});

export const {
    getSession,
    commitSession,
    destroySession
} = createCookieSessionStorage<sessionData, SessionFlashData>({
    cookie: session
});

getSession(request.headers.get("Cookie"));
