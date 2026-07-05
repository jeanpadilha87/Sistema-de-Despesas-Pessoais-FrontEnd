// Hook responsável por consumir o contexto de autenticação.

import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";

function useAuth() {

    return useContext(AuthContext);

}

export default useAuth;