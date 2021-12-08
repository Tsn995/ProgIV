import api from "../api"
import { WS_EQUIPMENTS } from "../config"

export const getEquipments = async (token) => {
    try {
        let response = await api.get(WS_EQUIPMENTS, {
            headers: { Authorization: `Bearer ${token}`}
        })
        return response.data
    } catch (exception) {
        throw new Error('Não foi possível obter a lista de equipamentos!')
    }
}