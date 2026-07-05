// Página de Login do SGP.

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import useAuth from "../../hooks/useAuth";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {

        try {

            const response = await api.post("/users/login", {

                email,
                password

            });

            // Salva usuário e token utilizando o Context API.
            login(

                response.data.user,

                response.data.token

            );

            navigate("/dashboard");

        }

        catch (error) {

            console.log("===== ERRO =====");

            console.log(error);

            console.log(error.response);

            console.log(error.response?.data);

            console.log(error.response?.status);

            alert("Erro no login.");

        }

    }

    return (

        <div className="container">

            <div className="row justify-content-center mt-5">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-body">

                            <h1 className="text-center mb-2">

                                SGP

                            </h1>

                            <h4 className="text-center mb-4">

                                Sistema de Gestão Pessoal

                            </h4>

                            <div className="mb-3">

                                <label className="form-label">

                                    E-mail

                                </label>

                                <input

                                    type="email"

                                    className="form-control"

                                    value={email}

                                    onChange={(e) => setEmail(e.target.value)}

                                />

                            </div>

                            <div className="mb-4">

                                <label className="form-label">

                                    Senha

                                </label>

                                <input

                                    type="password"

                                    className="form-control"

                                    value={password}

                                    onChange={(e) => setPassword(e.target.value)}

                                />

                            </div>

                            <button

                                className="btn btn-success w-100"

                                onClick={handleLogin}

                            >

                                Entrar

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;