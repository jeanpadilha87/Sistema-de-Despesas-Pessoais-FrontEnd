// Página de gerenciamento de despesas do SGP.

import { useEffect, useState } from "react";
import api from "../../services/api";

function Expenses() {

    // Lista de despesas.
    const [expenses, setExpenses] = useState([]);

    // Lista de categorias.
    const [categories, setCategories] = useState([]);

    // Campos do formulário.
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("PENDENTE");
    const [categoryId, setCategoryId] = useState("");

    // Controla o formulário.
    const [showForm, setShowForm] = useState(false);

    // Controla edição.
    const [editingId, setEditingId] = useState(null);

    // Carrega despesas.
  async function loadExpenses() {

    try {

        const response = await api.get("/expenses");

        console.log("RETORNO DA API:");

        console.log(response.data);

        setExpenses(response.data);

    }

    catch (error) {

        console.error(error);

        alert("Erro ao carregar despesas.");

        }

    }

    // Carrega categorias para o select.
    async function loadCategories() {

        try {

            const response = await api.get("/categories");

            setCategories(response.data);

        }

        catch (error) {

            console.error(error);

        }

    }

    useEffect(() => {

        loadExpenses();

        loadCategories();

    }, []);

    // Limpa formulário.
    function clearForm() {

        setDescription("");

        setAmount("");

        setDate("");

        setStatus("PENDENTE");

        setCategoryId("");

        setEditingId(null);

        setShowForm(false);

    }

    // Salva despesa.
    async function saveExpense() {

        try {

            const expense = {

                description,
                amount: Number(amount),
                date,
                status,
                categoryId: Number(categoryId),
                userId: 1

            };

            if (editingId === null) {

                await api.post("/expenses", expense);

            }

            else {

                await api.put(

                    `/expenses/${editingId}`,

                    expense

                );

            }

            clearForm();

            loadExpenses();

        }

           catch (error) {

           console.error(error);

           console.log(error.response);

           console.log(error.response?.data);

           alert("Erro ao salvar despesa.");

        }

    }

    // Edita despesa.
    function editExpense(expense) {

        setEditingId(expense.id);

        setDescription(expense.description);

        setAmount(expense.amount);

        setDate(expense.date);

        setStatus(expense.status);

        setCategoryId(expense.categoryId);

        setShowForm(true);

    }

    // Exclui despesa.
    async function deleteExpense(id) {

        if (!window.confirm("Deseja excluir esta despesa?")) {

            return;

        }

        try {

            await api.delete(`/expenses/${id}`);

            loadExpenses();

        }

        catch (error) {

            console.error(error);

            alert("Erro ao excluir despesa.");

        }

    }

    return (

        <div className="container py-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>

                    Despesas

                </h2>

                <button

                    className="btn btn-success"

                    onClick={() => {

                        clearForm();

                        setShowForm(true);

                    }}

                >

                    Nova Despesa

                </button>

            </div>

            {

                showForm && (

                    <div className="card shadow-sm mb-4">

                        <div className="card-body">

                            <div className="mb-3">

                                <label className="form-label">

                                    Descrição

                                </label>

                                <input

                                    className="form-control"

                                    value={description}

                                    onChange={(e) => setDescription(e.target.value)}

                                />

                            </div>

                            <div className="row">

                                <div className="col-md-6">

                                    <label className="form-label">

                                        Valor

                                    </label>

                                    <input

                                        type="number"

                                        className="form-control"

                                        value={amount}

                                        onChange={(e) => setAmount(e.target.value)}

                                    />

                                </div>

                                <div className="col-md-6">

                                    <label className="form-label">

                                        Data

                                    </label>

                                    <input

                                        type="date"

                                        className="form-control"

                                        value={date}

                                        onChange={(e) => setDate(e.target.value)}

                                    />

                                </div>

                            </div>

                            <div className="row mt-3">
                              <div className="col-md-6">

                                    <label className="form-label">

                                        Status

                                    </label>

                                    <select

                                        className="form-select"

                                        value={status}

                                        onChange={(e) => setStatus(e.target.value)}

                                    >

                                        <option value="PENDENTE">

                                            Pendente

                                        </option>

                                        <option value="PAGA">

                                            Paga

                                        </option>

                                    </select>

                                </div>

                                <div className="col-md-6">

                                    <label className="form-label">

                                        Categoria

                                    </label>

                                    <select

                                        className="form-select"

                                        value={categoryId}

                                        onChange={(e) => setCategoryId(e.target.value)}

                                    >

                                        <option value="">

                                            Selecione...

                                        </option>

                                        {

                                            categories.map((category) => (

                                                <option

                                                    key={category.id}

                                                    value={category.id}

                                                >

                                                    {category.name}

                                                </option>

                                            ))

                                        }

                                    </select>

                                </div>

                            </div>

                            <div className="d-flex gap-2 mt-4">

                                <button

                                    className="btn btn-primary"

                                    onClick={saveExpense}

                                >

                                    {

                                        editingId === null

                                            ? "Salvar"

                                            : "Atualizar"

                                    }

                                </button>

                                <button

                                    className="btn btn-secondary"

                                    onClick={clearForm}

                                >

                                    Cancelar

                                </button>

                            </div>

                        </div>

                    </div>

                )

            }

            <table className="table table-striped table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>

                        <th>Descrição</th>

                        <th>Valor</th>

                        <th>Data</th>

                        <th>Status</th>

                        <th>Categoria</th>

                        <th width="180">

                            Ações

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        expenses.map((expense) => (

                            <tr key={expense.id}>

                                <td>

                                    {expense.id}

                                </td>

                                <td>

                                    {expense.description}

                                </td>

                                <td>

                                    {Number(expense.amount).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                    })}

                                </td>

                                <td>

                                    {new Date(expense.date).toLocaleDateString("pt-BR")}

                                </td>

                                <td>

                                    {expense.status}

                                </td>

                                <td>

                                    {expense.categoryId}

                                </td>

                                <td>

                                    <button

                                        className="btn btn-warning btn-sm me-2"

                                        onClick={() => editExpense(expense)}

                                    >

                                        Editar

                                    </button>

                                    <button

                                        className="btn btn-danger btn-sm"

                                        onClick={() => deleteExpense(expense.id)}

                                    >

                                        Excluir

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default Expenses;