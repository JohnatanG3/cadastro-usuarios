// Importa a biblioteca axios, que é utilizada para fazer requisições HTTP
import axios from 'axios'

// Cria uma instância do axios com uma configuração personalizada
// Esta configuração define a URL base para todas as requisições feitas com esta instância
const api = axios.create({
    baseURL: 'http://localhost:3000' // Define a URL base para a API
});

// Exporta a instância configurada do axios para que possa ser utilizada em outras partes da aplicação
export default api;