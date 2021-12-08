import { Alert, Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Add } from "@mui/icons-material"
import { useCallback, useEffect, useState } from "react"
import RegisterReservationDialog from "../register"
import { useStore } from "../../../store"
import { getMyReservations } from "../../../service/reservations"
import moment from 'moment'

const ListReservationsPage = () => {

    const [reservations, setReservations] = useState([])
    const [error, setError] = useState('')
    const [isDialogOpen, setDialogOpen] = useState(false)
    const [state] = useStore()
    const user = state.userData

    const getReservations = useCallback(async () => {
        try {
            let result = await getMyReservations(user.isAdmin, user.token)
            setReservations(result)
        } catch (exception) {
            setError(exception.message)
        }
    }, [user])
    
    useEffect(() => {
        const loadReservations = async () => {
            await getReservations()
        }

        loadReservations()

    }, [getReservations])

    const openRegister = () => {
        setDialogOpen(true)
    }

    const onCloseDialog = (shouldUpdate) => {
        setDialogOpen(false)
        
        if (shouldUpdate) {
            getReservations()
        }
    }

    return (
        <>
            <Typography variant="h5" style={{ marginBottom: "20px" }}>Minhas Reservas</Typography>

            {error !== '' ?
                <Alert severity="error">{error}</Alert> :

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Equipamento</TableCell>
                                {user.isAdmin && <TableCell>Professor</TableCell>}
                                <TableCell>Tipo</TableCell>
                                <TableCell>Data</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                reservations.map(reservation =>
                                    <TableRow key={reservation.id}>
                                        <TableCell>{reservation.equipment}</TableCell>
                                        {user.isAdmin && <TableCell>{reservation.user}</TableCell>}
                                        <TableCell>{reservation.equipmentType}</TableCell>
                                        <TableCell>{moment(reservation.date).format('DD/MM/YYYY')}</TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            }

            {
                !user.isAdmin &&
                <>
                    <Fab color="primary"
                        style={{ position: 'absolute', bottom: '20px', right: '20px' }}
                        onClick={openRegister}>
                        <Add />
                    </Fab>
                    <RegisterReservationDialog isOpen={isDialogOpen} onClose={onCloseDialog} />
                </>
            }

        </>
    )
}

export default ListReservationsPage