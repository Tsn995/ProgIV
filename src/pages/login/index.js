import { Alert, Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState } from "react"
import { useHistory } from "react-router"
import { login } from "../../store/reducers/auth"
import { executeLogin } from "../../service/auth"
import { useStore } from "../../store"

const useStyles = makeStyles(theme => ({
    loginWrapper: {
        display: 'flex',
        flex: 1,
        height: '100%',
        direction: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginCard: {
        width: '300px'
    }
}))

const LoginPage = () => {
    const history = useHistory()
    const loginStyles = useStyles()
    const [, dispatch] = useStore()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const loginUser = async () => {
        try {
            let result = await executeLogin({ login: username, password })
            dispatch(login(result))
            history.push('/app')
        } catch (exception) {
            setError(exception.message)
        }
    }

    return (
        <div className={loginStyles.loginWrapper}>
            <Card className={loginStyles.loginCard}>
                <CardContent>
                    <Typography variant="h6" align="center">Tech Manager</Typography>
                    <form>
                        <TextField label="Login" variant="outlined" margin="normal" fullWidth
                            value={username} onChange={event => setUsername(event.target.value)} />
                        <TextField label="Senha" type="password" margin="normal" fullWidth
                            value={password} onChange={event => setPassword(event.target.value)} />
                    </form>

                    {error !== '' && <Alert severity="error">{error}</Alert>}
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained" fullWidth onClick={loginUser}>
                        Entrar
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default LoginPage