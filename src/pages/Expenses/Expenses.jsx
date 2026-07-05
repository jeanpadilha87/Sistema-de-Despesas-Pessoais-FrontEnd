// Página de gerenciamento de despesas do SGP.

import { useEffect, useState } from "react";
import api from "../../services/api";

function Expenses() {

    // Lista de despesas.
    const [expenses, setExpenses] = useState([]);

    // Controla o carregamento da tela.
    const [loading, setLoading] = useState(true);

    // Lista de categorias.
    const [categories, setCategories] = useState([]);
    
    // Campos dos filtros.
    const [filterCategoryId, setFilterCategoryId] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterStartDate, setFilterStartDate] = useState("");
    const [filterEndDate, setFilterEndDate] = useState("");
    const [filterMinAmount, setFilterMinAmount] = useState("");
    const [filterMaxAmount, setFilterMaxAmount] = useState("");

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
                setLoading(true);
                const params = {};

        if (filterStatus) {

            params.status = filterStatus;

        }

        if (filterCategoryId) {

            params.categoryId = filterCategoryId;

        }

        if (filterStartDate) {

            params.startDate = filterStartDate;

        }

        if (filterEndDate) {

            params.endDate = filterEndDate;

        }

        if (filterMinAmount) {

            params.minAmount = filterMinAmount;

        }

        if (filterMaxAmount) {

            params.maxAmount = filterMaxAmount;

        }

        const response = await api.get("/expenses", {

            params

        });

        console.log("RETORNO DA API:");

        console.log(response.data);

        setExpenses(response.data);
        setLoading(false);

    }

    catch (error) {

        console.error(error);
        setLoading(false);

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
            setLoading(false);

        }

    }

  useEffect(() => {

    loadExpenses();

}, [

    filterStatus,

    filterCategoryId,

    filterStartDate,

    filterEndDate,

    filterMinAmount,

    filterMaxAmount

]);

useEffect(() => {

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
            // Validação dos campos obrigatórios.
            if (!description.trim()) {

                alert("Informe a descrição da despesa.");

                return;

            }

            if (!amount || Number(amount) <= 0) {

                alert("Informe um valor maior que zero.");

                return;

            }

            if (!date) {

                alert("Informe a data da despesa.");

                return;

            }

            if (!categoryId) {

                alert("Selecione uma categoria.");

                return;

            }
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
           setLoading(false);

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
            setLoading(false);

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
<div className="card shadow-sm mb-4">

    <div className="card-body">

        <h5 className="mb-3">

            Filtros

        </h5>

        <div className="row">

            <div className="col-md-3">

                <label className="form-label">

                    Categoria

                </label>

                <select

                    className="form-select"

                    value={filterCategoryId}

                    onChange={(e) => setFilterCategoryId(e.target.value)}

                >

                    <option value="">

                        Todas

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

            <div className="col-md-3">

                <label className="form-label">

                    Status

                </label>

                <select

                    className="form-select"

                    value={filterStatus}

                    onChange={(e) => setFilterStatus(e.target.value)}

                >

                    <option value="">

                        Todos

                    </option>

                    <option value="PENDENTE">

                        Pendente

                    </option>

                    <option value="PAGA">

                        Paga

                    </option>

                </select>

            </div>

            <div className="col-md-3">

                <label className="form-label">

                    Data Inicial

                </label>

                <input

                    type="date"

                    className="form-control"

                    value={filterStartDate}

                    onChange={(e) => setFilterStartDate(e.target.value)}

                />

            </div>

            <div className="col-md-3">

                <label className="form-label">

                    Data Final

                </label>

                <input

                    type="date"

                    className="form-control"

                    value={filterEndDate}

                    onChange={(e) => setFilterEndDate(e.target.value)}

                />

            </div>

        </div>

        <div className="row mt-3">

            <div className="col-md-3">

                <label className="form-label">

                    Valor Mínimo

                </label>

                <input

                    type="number"

                    className="form-control"

                    value={filterMinAmount}

                    onChange={(e) => setFilterMinAmount(e.target.value)}

                />

            </div>

            <div className="col-md-3">

                <label className="form-label">

                    Valor Máximo

                </label>

                <input

                    type="number"

                    className="form-control"

                    value={filterMaxAmount}

                    onChange={(e) => setFilterMaxAmount(e.target.value)}

                />

            </div>

            <div className="col-md-6 d-flex align-items-end">

                <button

                    className="btn btn-secondary"

                    onClick={() => {

                        setFilterCategoryId("");

                        setFilterStatus("");

                        setFilterStartDate("");

                        setFilterEndDate("");

                        setFilterMinAmount("");

                        setFilterMaxAmount("");

                    }}

                >

                    Limpar Filtros

                </button>

            </div>

        </div>

    </div>

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

        loading ? (

            <tr>

                <td colSpan="7" className="text-center py-5">

                    <div
                        className="spinner-border text-primary mb-3"
                        role="status"
                    >

                        <span className="visually-hidden">

                            Carregando...

                        </span>

                    </div>

                    <br />

                    Carregando despesas...

                </td>

            </tr>

        ) : (

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

                        {expense.category?.name}

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

        )

    }

</tbody>

            </table>

        </div>

    );

}

export default Expenses;