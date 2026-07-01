// Layout principal da aplicação.
// Todas as páginas protegidas utilizarão esta estrutura.

import { Outlet } from "react-router-dom";

function MainLayout() {

    return (

        <main className="container mt-4">

            <Outlet />

        </main>

    );

}

export default MainLayout;