// Dashboard do SGP.

import { useEffect, useState } from "react";

import api from "../../services/api";

function Dashboard() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [total, setTotal] = useState(0);
    const [quantidade, setQuantidade] = useState(0);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {

        carregarDashboard();

    }, []);

    async function carregarDashboard() {

        try {

            const totalResponse = await api.get("/dashboard/total-expenses");

            const quantidadeResponse = await api.get("/dashboard/expenses-count");

            const categoriaResponse = await api.get("/dashboard/expenses-by-category");

            setTotal(totalResponse.data.total);

            setQuantidade(quantidadeResponse.data.quantidade);

            setCategorias(categoriaResponse.data);

        }

        catch (error) {

            console.error(error);

        }

    }

    return (

        <div className="container mt-4">

            <h2 className="mb-4">

                Bem-vindo, {user?.name}

            </h2>

            <div className="row">

                <div className="col-md-4">

                    <div className="card text-center shadow">

                        <div className="card-body">

                            <h5>Total de Despesas</h5>

                            <h2>

                                R$ {total}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card text-center shadow">

                        <div className="card-body">

                            <h5>Quantidade</h5>

                            <h2>

                                {quantidade}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow">

                        <div className="card-body">

                            <h5>Categorias</h5>

                            {

                                categorias.map((categoria, index) => (

                                    <p key={index}>

                                        Categoria {categoria.categoria}: R$ {categoria.total}

                                    </p>

                                ))

                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;