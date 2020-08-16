import React, { FormEvent, useState } from 'react';
import Background from '../../components/Background';
import Button from '../../components/Button';
import Input from '../../components/Input';

import "./style.css"
import api from '../../services/api';

const RecoverPassword: React.FC = () => {
    const [email, setEmail] = useState('')

    async function submitForm(e: FormEvent){
        e.preventDefault()

        const {data} = await api.get(`recover/password/${email}`)

        console.log(data)

    }

    return (
        <main id="page-recoverPassword">
        
         <section className="left">
    
             <form onSubmit={submitForm} className="inputs">
                <div className="top">
                    <h1>Eita, esqueceu <br/> sua senha?</h1>
                    <span>Não esquenta, vamos dar um jeito nisso</span>
                </div>
    
                <Input
                placeholder="Email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}/>

                {email.length > 0 ? (
                    <Button text="Enviar" type="submit" className='active'/>
                ) : (
                    <Button text="Enviar" type="submit"/>
                )}
    
            </form>
    
         </section>
        
         <Background />
        
        </main>
  )
}

export default RecoverPassword;