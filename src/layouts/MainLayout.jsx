// Layout principal da aplicação.
// Todas as páginas protegidas utilizarão esta estrutura.

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {

    return (

        <>

            <Navbar />

            <main className="container mt-4">

                <Outlet />

            </main>

        </>

    );

}

export default MainLayout;