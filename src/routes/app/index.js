import { Route, Switch } from "react-router"
import { SecureRoute } from "../../components/router"
import AppHomePage from "../../pages/home"
import LoginPage from "../../pages/login"

const AppRoutes = () => {

    return (
        <Switch>
            <Route path="/login" component={LoginPage} />
            <SecureRoute path="/app">
                <AppHomePage />
            </SecureRoute>
            <Route path="/" exact component={LoginPage} />
        </Switch>
    )
}

export default AppRoutes