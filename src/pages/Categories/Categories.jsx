// Página de gerenciamento de categorias.

import { useEffect, useState } from "react";
import api from "../../services/api";

function Categories() {

    // Lista de categorias.
    const [categories, setCategories] = useState([]);

    // Campos do formulário.
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    // Controla a exibição do formulário.
    const [showForm, setShowForm] = useState(false);

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

    // Salva uma nova categoria.
    async function saveCategory() {

        try {

            await api.post("/categories", {

                name,
                description

            });

            // Limpa os campos.
            setName("");
            setDescription("");

            // Fecha o formulário.
            setShowForm(false);

            // Atualiza a lista.
            loadCategories();

        }

        catch (error) {

            console.error(error);

            alert("Erro ao cadastrar categoria.");

        }

    }

    // Executa apenas uma vez ao abrir a página.
    useEffect(() => {

        loadCategories();

    }, []);

    return (

        <div className="container py-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>

                    Categorias

                </h2>

                <button

                    className="btn btn-success"

                    onClick={() => setShowForm(!showForm)}

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

                            <button

                                className="btn btn-primary"

                                onClick={saveCategory}

                            >

                                Salvar

                            </button>

                        </div>

                    </div>

                )

            }

            <table className="table table-striped table-bordered">

                <thead>

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

                                    <button className="btn btn-warning btn-sm me-2">

                                        Editar

                                    </button>

                                    <button className="btn btn-danger btn-sm">

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