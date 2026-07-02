// Serviço responsável pela comunicação com a API.

import axios from "axios";

const api = axios.create({

    baseURL: "http://localhost:3000"

});

// Adiciona automaticamente o token JWT em todas as requisições.
api.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");

        if (token) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;

    },

    (error) => {

        return Promise.reject(error);

    }

);

export default api;