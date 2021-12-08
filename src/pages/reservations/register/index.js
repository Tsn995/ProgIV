import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Select, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { getEquipments } from '../../../service/equipments'
import { saveReservation } from "../../../service/reservations"
import { useStore } from "../../../store"

const RegisterReservationDialog = ({ isOpen, onClose }) => {

    const [equipments, setEquipments] = useState([])

    const [equipment, setEquipment] = useState('')
    const [date, setDate] = useState('')
    const [state] = useStore()
    const { userData } = state

    useEffect(() => {
        const loadEquipments = async () => {
            try {
                let result = await getEquipments(userData.token)
                setEquipments(result)
            } catch (exception) {
                console.log(exception.message)
            }
        }

        loadEquipments()
    }, [userData])

    const clearState = () => {
        setDate('')
        setEquipment('')        
    }

    const save = async () => {
        try {
            let reservation = {
                equipment, 
                date
            }
            
            await saveReservation(reservation)
            clearState()
            onClose(true)
        } catch (exception) {
            alert(exception.message)
        }
    }

    const cancel = () => { 
        clearState()
        onClose(false)
    }

    return (
        <Dialog open={isOpen} fullWidth>
            <DialogTitle>
                Nova Reserva
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={7}>
                        <Select fullWidth 
                            value={equipment}
                            onChange={event => setEquipment(event.target.value)}>
                            {
                                equipments.map(equipment =>
                                    <MenuItem key={equipment.id} value={equipment.id}>{equipment.name}</MenuItem>)
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            type="date"
                            fullWidth
                            value={date}
                            onChange={event => setDate(event.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={save}>Salvar</Button>
                <Button onClick={cancel}>Cancelar</Button>
            </DialogActions>
        </Dialog>
    )
}

export default RegisterReservationDialog