import React from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Landing from '../pages/Landing'
import TeacherList from '../pages/TeacherList'
import TeacherForm from '../pages/TeacherForm'
import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro'

import { useAuth } from '../contexts/auth'
import RecoverPassword from '../pages/RecoverPassword'
import ResetPassword from '../pages/ResetPassword'
import Profile from '../pages/Profile'




const Routes = () => {
    const {signed} = useAuth()

    return (
        <BrowserRouter>
            <Switch>
            {signed ? (
                <>
                 <Route path="/" component={Landing} exact/>
                 <Route path="/study" component={TeacherList}/>
                 <Route path="/give-classes" component={TeacherForm}/>
                 <Route path="/profile" component={Profile}/>
                 </>
            ): (
                <>
                <Route path="/" component={Login} exact/>
                <Route path="/login" component={Login} />
                <Route path="/cadastro" component={Cadastro}/>
                <Route path="/recoverPassword" component={RecoverPassword}/>
                <Route path="/resetPassword/:token" component={ResetPassword}/>
                </>
            )}
          </Switch>
        </BrowserRouter>
    )
}

export default Routes