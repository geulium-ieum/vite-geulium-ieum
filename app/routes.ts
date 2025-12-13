import {
    type RouteConfig,
    index,
    layout,
    route
} from "@react-router/dev/routes"

export default [
    layout("./components/layout.tsx", [
        index("./components/Home.tsx"),
        route("/login", "./components/Login.tsx"),
        route("/register", "./components/Register.tsx"),
        route("/search", "./components/SearchDeceased.tsx"),
        route("/memorial/:id", "./components/MemorialPage.tsx"),
        route("/mypage", "./components/UserMyPage.tsx"),
        route("/admin-dashboard", "./components/AdminDashboard.tsx"),
        route("/admin-mypage", "./components/AdminMyPage.tsx"),
        route("/family-groups", "./components/FamilyGroups.tsx"),
        route("/notifications", "./components/NotificationCenter.tsx"),
        route("/announcements", "./components/Announcements.tsx"),
        route("/help-board", "./components/HelpBoard.tsx"),
        route("/auth/verify-email", "./components/pages/VerifyEmail.tsx")
    ])
] satisfies RouteConfig
