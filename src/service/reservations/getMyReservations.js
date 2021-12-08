import api from '../api'
import { WS_MY_RESERVATIONS, WS_RESERVATIONS } from '../config'

export const getMyReservations = async (isAdmin, token) => {
    try {
        const result = await api.get(isAdmin ? WS_RESERVATIONS : WS_MY_RESERVATIONS, {
                headers: { Authorization: `Bearer ${token}`}
            })
        return result.data
    } catch (exception) {
        throw new Error('Não foi possível obter a lista de reservas!')
    }
}