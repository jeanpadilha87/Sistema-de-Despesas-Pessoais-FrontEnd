// Contexto de autenticação da aplicação.

import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {

    // Recupera usuário salvo na sessão.
    const [user, setUser] = useState(

        JSON.parse(localStorage.getItem("user"))

    );

    // Realiza o login.
    function login(userData, token) {

        localStorage.setItem("user", JSON.stringify(userData));

        localStorage.setItem("token", token);

        setUser(userData);

    }

    // Realiza o logout.
    function logout() {

        localStorage.removeItem("user");

        localStorage.removeItem("token");

        setUser(null);

    }

    return (

        <AuthContext.Provider

            value={{

                user,

                login,

                logout

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}

export default AuthProvider;