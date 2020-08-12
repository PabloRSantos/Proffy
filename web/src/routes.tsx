import React from "react"
import {BrowserRouter, Route} from "react-router-dom"

import Landing from "./pages/Landing"
import TeacherList from "./pages/TeacherList"
import TeacherForm from "./pages/TeacherForm"
import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"
import RecoverPassword from "./pages/RecoverPassword"



const Routes = () => {
    return (
        <BrowserRouter>
            <Route path="/" component={Landing} exact/>
            <Route path="/study" component={TeacherList}/>
            <Route path="/give-classes" component={TeacherForm}/>
            <Route path="/login" component={Login}/>
            <Route path="/cadastro" component={Cadastro}/>
            <Route path="/recover-password" component={RecoverPassword}/>
        </BrowserRouter>
    )
}

export default Routes