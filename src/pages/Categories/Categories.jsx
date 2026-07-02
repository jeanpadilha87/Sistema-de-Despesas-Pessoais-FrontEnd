// Página de gerenciamento de categorias do SGP.

import { useEffect, useState } from "react";
import api from "../../services/api";

function Categories() {

    // Lista de categorias.
    const [categories, setCategories] = useState([]);

    // Campos do formulário.
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    // Controla o formulário.
    const [showForm, setShowForm] = useState(false);

    // Armazena a categoria em edição.
    const [editingId, setEditingId] = useState(null);

    // Carrega todas as categorias.
    async function loadCategories() {

        try {

            const response = await api.get("/categories");

            setCategories(response.data);

        }

        catch (error) {

            console.error(error);

            alert("Erro ao carregar categorias.");

        }

    }

    // Executa quando a página abre.
    useEffect(() => {

        loadCategories();

    }, []);

    // Limpa o formulário.
    function clearForm() {

        setName("");

        setDescription("");

        setEditingId(null);

        setShowForm(false);

    }

    // Salva uma categoria.
    async function saveCategory() {

        try {

            if (editingId === null) {

                await api.post("/categories", {

                    name,
                    description

                });

            } else {

                await api.put(

                    `/categories/${editingId}`,

                    {

                        name,
                        description

                    }

                );

            }

            clearForm();

            loadCategories();

        }

        catch (error) {

            console.error(error);

            alert("Erro ao salvar categoria.");

        }

    }

    // Preenche o formulário para edição.
    function editCategory(category) {

        setEditingId(category.id);

        setName(category.name);

        setDescription(category.description);

        setShowForm(true);

    }

    // Remove uma categoria.
    async function deleteCategory(id) {

        const confirmDelete = window.confirm(

            "Deseja realmente excluir esta categoria?"

        );

        if (!confirmDelete) {

            return;

        }

        try {

            await api.delete(`/categories/${id}`);

            loadCategories();

        }

        catch (error) {

            console.error(error);

            alert("Erro ao excluir categoria.");

        }

    }

    return (

        <div className="container py-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>

                    Categorias

                </h2>

                <button

                    className="btn btn-success"

                    onClick={() => {

                        clearForm();

                        setShowForm(true);

                    }}

                >

                    Nova Categoria

                </button>

            </div>

            {

                showForm && (

                    <div className="card shadow-sm mb-4">

                        <div className="card-body">

                            <div className="mb-3">

                                <label className="form-label">

                                    Nome

                                </label>

                                <input

                                    type="text"

                                    className="form-control"

                                    value={name}

                                    onChange={(e) => setName(e.target.value)}

                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">

                                    Descrição

                                </label>

                                <input

                                    type="text"

                                    className="form-control"

                                    value={description}

                                    onChange={(e) => setDescription(e.target.value)}

                                />

                            </div>

                            <div className="d-flex gap-2">

                                <button

                                    className="btn btn-primary"

                                    onClick={saveCategory}

                                >

                                    {editingId === null ? "Salvar" : "Atualizar"}

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
            <th>Nome</th>
            <th>Descrição</th>
            <th width="180">Ações</th>

        </tr>

    </thead>

    <tbody>

        {

            categories.map((category) => (

                <tr key={category.id}>

                    <td>{category.id}</td>

                    <td>{category.name}</td>

                    <td>{category.description}</td>

                    <td>

                        <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => editCategory(category)}
                        >
                            Editar
                        </button>

                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteCategory(category.id)}
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

export default Categories;
                