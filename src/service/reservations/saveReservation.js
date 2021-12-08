import api from "../api"
import { WS_RESERVATIONS } from "../config"

export const saveReservation = async (reservation, token) => { 
    try { 
        await api.post(WS_RESERVATIONS, reservation, {
            headers: { Authorization: `Bearer ${token}`}
        })
    } catch(exception) {
        throw new Error('Não foi possível realizar a reserva do equipamento!')
    }
}