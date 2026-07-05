import { Link, useLocation, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const { logout } = useAuth();

    function handleLogout() {

        logout();

        navigate("/");

    }

    return (

        <nav className="navbar navbar-expand-lg navbar-dark navbar-sgp">

            <div className="container">

                <Link className="navbar-brand fw-bold fs-4" to="/dashboard">

                    SGP

                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menu"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                <div className="collapse navbar-collapse" id="menu">

                    <ul className="navbar-nav me-auto">

                        <li className="nav-item">

                            <Link
                                to="/dashboard"
                                className={`nav-link ${
                                    location.pathname === "/dashboard"
                                        ? "active fw-bold text-white"
                                        : ""
                                }`}
                            >

                                Dashboard

                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                to="/categories"
                                className={`nav-link ${
                                    location.pathname === "/categories"
                                        ? "active fw-bold text-white"
                                        : ""
                                }`}
                            >

                                Categorias

                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                to="/expenses"
                                className={`nav-link ${
                                    location.pathname === "/expenses"
                                        ? "active fw-bold text-white"
                                        : ""
                                }`}
                            >

                                Despesas

                            </Link>

                        </li>

                    </ul>

                    <button
                        className="btn btn-outline-light"
                        onClick={handleLogout}
                    >

                        Sair

                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;