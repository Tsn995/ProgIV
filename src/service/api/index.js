import axios from "axios"

const createApi = () => {
    let api = axios.create({
        baseURL: 'http://localhost:8080/'
    })

    return api
}

const api = createApi()

export default api