// Serviço responsável pela comunicação com a API.

import axios from "axios";

const api = axios.create({

    baseURL: "http://localhost:3000"

});

export default api;