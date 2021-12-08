import { Redirect, Route } from "react-router"
import { useStore } from "../../store"

const SecureRoute = ({ children, ...otherProps}) => {
    const [state] = useStore()
    const { isAuth } = state
    
    return (
        <Route {...otherProps}>
            {
                isAuth ? 
                    children : 
                    <Redirect to="/login" />
            }
        </Route>
    )
}

export default SecureRoute