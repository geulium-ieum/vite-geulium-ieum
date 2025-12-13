import Header from "~/components/organisms/Header";
import { Outlet, useLocation } from "react-router";

export default function RootLayout() {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <div className="min-h-screen bg-gray-50">
            {
                pathname !== '/login' && 
                pathname !== '/register' && 
                pathname !== '/auth/verify-email' && (
                    <Header />
                )
            }
            <main>
                <Outlet />
            </main>
        </div>
    )
}
