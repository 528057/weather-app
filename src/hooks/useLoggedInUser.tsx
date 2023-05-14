import { FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { onAuthChanged } from "../utils/firebase";
import { User } from "firebase/auth";
import React from "react";

type AuthState = User | undefined;
const AuthContext = React.createContext<AuthState>([undefined] as never);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<User>();

    // Setup onAuthChanged once when component is mounted
    useEffect(() => {
        onAuthChanged((u) => setUser(u ?? undefined));
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

// Hook providing logged in user information
const useLoggedInUser = () => {
    const user = useContext(AuthContext);
    return user;
};

// eslint-disable-next-line react-refresh/only-export-components
export default useLoggedInUser;
