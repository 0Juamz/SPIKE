//Iporta o axios
import axios from 'axios'

//váriavel que faz a conexão com o servidor
const api = axios.create({
    baseURL: 'http://localhost:3000'
})

//exporta necessário para ser usado nos componentes
export default api