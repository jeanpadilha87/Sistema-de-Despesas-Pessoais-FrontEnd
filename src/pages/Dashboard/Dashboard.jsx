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

                Bem-vindo, {user?.name}! 👋

            </h2>

            <div className="row g-4">

                <div className="col-md-4">

                    <div className="card shadow border-0">

                        <div className="card-body text-center">

                            <h6 className="text-muted">

                                Total de Despesas

                            </h6>

                            <h2 className="text-danger">

                                {

                                    Number(total).toLocaleString(

                                        "pt-BR",

                                        {

                                            style: "currency",

                                            currency: "BRL"

                                        }

                                    )

                                }

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow border-0">

                        <div className="card-body text-center">

                            <h6 className="text-muted">

                                Quantidade de Despesas

                            </h6>

                            <h2 className="text-primary">

                                {quantidade}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow border-0">

                        <div className="card-body">

                            <h6 className="text-center mb-3 text-muted">

                                Gastos por Categoria

                            </h6>

                            {

                                categorias.length === 0 ? (

                                    <p className="text-center">

                                        Nenhuma despesa cadastrada.

                                    </p>

                                )

                                :

                                categorias.map((categoria) => (

                                    <div
                                        key={categoria.categoria}
                                        className="d-flex justify-content-between border-bottom py-2"
                                    >

                                        <strong>

                                            {categoria.categoria}

                                        </strong>

                                        <span>

                                            {

                                                Number(categoria.total).toLocaleString(

                                                    "pt-BR",

                                                    {

                                                        style: "currency",

                                                        currency: "BRL"

                                                    }

                                                )

                                            }

                                        </span>

                                    </div>

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