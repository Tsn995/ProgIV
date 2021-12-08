import api from '../api'
import { WS_LOGIN } from '../config'

export const executeLogin = async (loginData) => {
    try {
        let response = await api.post(WS_LOGIN, loginData)
        return response.data
    } catch (exception) {
        throw new Error('Dados inválidos para o login!')
    }
}