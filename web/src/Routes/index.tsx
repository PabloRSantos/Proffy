import React from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Landing from '../pages/Landing'
import TeacherList from '../pages/TeacherList'
import TeacherForm from '../pages/TeacherForm'
import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro'

import { useAuth } from '../contexts/auth'




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
                 </>
            ): (
                <>
                <Route path="/" component={Login} exact/>
                <Route path="/login" component={Login} />
                <Route path="/cadastro" component={Cadastro}/>
                </>
            )}
          </Switch>
        </BrowserRouter>
    )
}

export default Routes