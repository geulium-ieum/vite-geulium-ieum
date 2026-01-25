import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration
} from "react-router";
import { getSession } from "./lib/sessions.server";
import type { Route } from "./+types/root";
import { userContext } from "./context/userContext";
import { getUser } from "./lib/apis/user";
import Header from "./components/organisms/Header";

async function authMiddleware({ request, context }: Route.LoaderArgs) {
    const unnecessarySessionPath = [
        "/login",
        "/register",
        "/auth/verify-email"
    ];
    const pathname = new URL(request.url).pathname;
    if (unnecessarySessionPath.includes(pathname)) {
        return;
    }
    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const token = session.get("token");
    if (!token) {
        context.set(userContext, null);
        return;
    }
    const user = await getUser(token);
    context.set(userContext, user);
}

export const middleware: Route.MiddlewareFunction[] = [
    async (_, next) => {
        const start = performance.now();
        await next();
        const duration = performance.now() - start;
        console.log(`Navigation took ${duration}ms`);
    },
    authMiddleware
];

export async function loader({ context }: Route.LoaderArgs) {
    const user = context.get(userContext);
    return { user };
}

export function Layout({
    children
}: {
    children: React.ReactNode | React.ReactNode[]
}) {
    return (
        <html lang="ko">
            <head>
                <meta charSet="UTF-8" />
                <link rel="icon" type="image/svg+xml" href="/vite.svg" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>그리움 이음</title>
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

export default function Root({ loaderData }: Route.ComponentProps) {
    const { user } = loaderData;

    return (
        <>
            <Header user={user} />
            <Outlet />
        </>
    )
}
