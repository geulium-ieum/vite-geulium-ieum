import { userService } from "~/lib/services/user";
import type { Children, User } from "~/types";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
    isLoading: true
});

export default function AuthProvider({ children }: { children: Children }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (user) return;
        (async () => {
            try {
                const user = await userService.get.user();
                setUser(user);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [user]);
    
    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
