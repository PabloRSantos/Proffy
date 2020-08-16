import React, { FormEvent, useState } from 'react';
import Background from '../../components/Background';
import Button from '../../components/Button';
import Input from '../../components/Input';

import "./style.css"
import api from '../../services/api';
import { RouteComponentProps } from 'react-router-dom';

interface MatchParams {
    token: string;
}

interface PropsResetPassword extends RouteComponentProps<MatchParams> {
}

const ResetPassword: React.FC<PropsResetPassword> = (props) => {
    const [password, setPassword] = useState('')


    async function submitForm(e: FormEvent){
        e.preventDefault()

        const token = props.match.params.token

        const {data} = await api.put(`/resetPassword`, {
            password,
            token
        })

        console.log(data)

    }

    return (
        <main id="page-recoverPassword">
        
         <section className="left">
    
             <form onSubmit={submitForm} className="inputs">
                <div className="top">
                    <h1>Sua nova senha</h1>
                </div>
    
                <Input
                placeholder="Senha"
                name="senha"
                type='pasword'
                value={password}
                onChange={e => setPassword(e.target.value)}/>
    
                <Button text="Enviar" type="submit"/>
            </form>
    
         </section>
        
         <Background />
        
        </main>
  )
}

export default ResetPassword;