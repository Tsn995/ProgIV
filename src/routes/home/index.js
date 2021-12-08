import { Route, Switch, useRouteMatch } from "react-router"
import { ListEquipmentsPage } from "../../pages/equipments"
import { ListReservationsPage } from "../../pages/reservations"

const HomeRoutes = () => {
    const { path } = useRouteMatch()

    return (
        <Switch>
            <Route path={`${path}/reservations`} component={ListReservationsPage} />
            <Route path={`${path}/equipments`} component={ListEquipmentsPage} />
        </Switch>
    )
}

export default HomeRoutes