import React, { useState, FormEvent } from 'react';
import Background from '../../components/Background';
import Input from '../../components/Input';
import Button from '../../components/Button';

import "./style.css"
import { useAuth } from '../../contexts/auth';

const Cadastro: React.FC = () => {
    const [name, setName] = useState("")
    const [sobrenome, setSobrenome] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {SignUp} = useAuth()

    async function submitForm(e: FormEvent){
        e.preventDefault()

        const data = await SignUp({name, sobrenome, email, password})
      
        console.log(data)
    }

  return (
        <main id="page-cadastro">
        
         <section className="left">
    
             <form className="inputs" onSubmit={submitForm}>
                <div className="top">
                    <h1>Cadastro</h1>
                    <span>Preenche os dados abaixo
                        para começar
                    </span>
                </div>
    
                <Input
                placeholder="Nome"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}/>

                <Input
                placeholder="Sobrenome"
                name="sobrenome"
                value={sobrenome}
                onChange={e => setSobrenome(e.target.value)}/>

                <Input
                placeholder="Email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}/>

                <Input
                placeholder="Senha"
                name="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}/>
    
                {email.length > 0 ||
                password.length > 0 ||
                name.length > 0 ||
                sobrenome.length > 0 ? (
                    <Button
                    text="Concluir cadastro"
                    type="submit"
                    className="active"/>
                ): (
                    <Button
                    text="Concluir cadastro"
                    type="submit"/>
                )}
            </form>
    
         </section>
        
         <Background />
        
        </main>
  )
}

export default Cadastro;