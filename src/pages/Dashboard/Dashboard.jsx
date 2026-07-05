// Dashboard do SGP.

import { useEffect, useState } from "react";

import api from "../../services/api";

import useAuth from "../../hooks/useAuth";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const COLORS = [

    "#0d6efd",
    "#198754",
    "#ffc107",
    "#dc3545",
    "#6f42c1",
    "#fd7e14",
    "#20c997"

];

function Dashboard() {

    const { user } = useAuth();

    const [total, setTotal] = useState(0);

    const [quantidade, setQuantidade] = useState(0);

    const [categorias, setCategorias] = useState([]);

    // Últimas despesas cadastradas.
    const [ultimasDespesas, setUltimasDespesas] = useState([]);

    useEffect(() => {

        carregarDashboard();

    }, []);

    async function carregarDashboard() {

        try {

            const totalResponse = await api.get("/dashboard/total-expenses");

            const quantidadeResponse = await api.get("/dashboard/expenses-count");

            const categoriaResponse = await api.get("/dashboard/expenses-by-category");

            // Busca todas as despesas.
            const despesasResponse = await api.get("/expenses");

            setTotal(totalResponse.data.total);

            setQuantidade(quantidadeResponse.data.quantidade);

            setCategorias(categoriaResponse.data);

            // Ordena da mais recente para a mais antiga
            // e mantém apenas as 5 últimas.
            const ultimas = despesasResponse.data

                .sort(

                    (a, b) => new Date(b.date) - new Date(a.date)

                )

                .slice(0, 5);

            setUltimasDespesas(ultimas);

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
<div className="card shadow border-0 mt-4">

    <div className="card-body">

        <h5 className="mb-4">

            Distribuição dos Gastos por Categoria

        </h5>

        <div className="row align-items-center">

            <div className="col-md-5" style={{ height: "320px" }}>

                <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                        <Pie

                            data={categorias}

                            dataKey="total"

                            nameKey="categoria"

                            cx="50%"

                            cy="50%"

                            outerRadius={110}

                            innerRadius={60}

                            label={({ percent }) => `${(percent * 100).toFixed(1)}%`}

                        >

                            {

                                categorias.map((entry, index) => (

                                    <Cell

                                        key={index}

                                        fill={COLORS[index % COLORS.length]}

                                    />

                                ))

                            }

                        </Pie>

                        <Tooltip />

                    </PieChart>

                </ResponsiveContainer>

            </div>

            <div className="col-md-7">

                {

                    categorias.map((categoria, index) => (

                        <div

                            key={categoria.categoria}

                            className="d-flex justify-content-between border-bottom py-2"

                        >

                            <div>

                                <span

                                    style={{

                                        display: "inline-block",

                                        width: "14px",

                                        height: "14px",

                                        backgroundColor: COLORS[index % COLORS.length],

                                        borderRadius: "50%",

                                        marginRight: "10px"

                                    }}

                                />

                                <strong>

                                    {categoria.categoria}

                                </strong>

                            </div>

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
            <div className="card shadow border-0 mt-4">

                <div className="card-body">

                    <h5 className="mb-3">

                        Últimas Despesas Cadastradas

                    </h5>

                    <table className="table table-striped table-hover">

                        <thead className="table-dark">

                            <tr>

                                <th>Data</th>

                                <th>Categoria</th>

                                <th>Descrição</th>

                                <th className="text-end">

                                    Valor

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                ultimasDespesas.map((expense) => (

                                    <tr key={expense.id}>

                                        <td>

                                            {

                                                new Date(expense.date)

                                                    .toLocaleDateString("pt-BR")

                                            }

                                        </td>

                                        <td>

                                            {expense.category?.name}

                                        </td>

                                        <td>

                                            {expense.description}

                                        </td>

                                        <td className="text-end">

                                            {

                                                Number(expense.amount)

                                                    .toLocaleString(

                                                        "pt-BR",

                                                        {

                                                            style: "currency",

                                                            currency: "BRL"

                                                        }

                                                    )

                                            }

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;