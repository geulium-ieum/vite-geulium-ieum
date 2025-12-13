import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration
} from "react-router";
// import type { Route } from "./+types/root"

// export async function loader({ request }: Route.LoaderArgs) {
    
// }

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

export default function Root() {
    return <Outlet />
}
