import { Container } from "@mui/material"
import AppToolbar from "../../components/toolbar"
import HomeRoutes from "../../routes/home"

const AppHomePage = () => {

    return (
        <div>
            <AppToolbar />
            <Container style={{ marginTop: '20px' }}>
                <HomeRoutes />
            </Container>
        </div>
    )
}

export default AppHomePage