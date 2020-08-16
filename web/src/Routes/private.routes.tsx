import {Route, Redirect, RouteProps} from "react-router-dom"
import React from "react"
import {useAuth} from "../contexts/auth"




interface PrivateRoute extends RouteProps {
    component: any,
}

const PrivateRoute: React.FC<PrivateRoute> = ({component, ...rest}) => {
    const {signed} = useAuth()
    
    return (
    <Route {...rest} render={props => (
        signed ? (
            React.createElement(component, props)
        ) : (
            <Redirect to={{pathname: `/`, state: {from: props.location}}} />
        )
    )} />
    )
    }

export default PrivateRoute