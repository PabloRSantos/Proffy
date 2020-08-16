import React, { useState, FormEvent } from 'react';
import Background from '../../components/Background';

import "./style.css"
import Input from '../../components/Input';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

import heart from "../../assets/images/icons/purple-heart.svg"
import { useAuth } from '../../contexts/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const {SignIn} = useAuth()

  async function submitForm(e: FormEvent){
    e.preventDefault()
    const data = await SignIn({email, password, remember})

    console.log(data)
  }

  return (

    <main id="page-login">

      <Background />

     <section className="right">

         <form onSubmit={submitForm} className="inputs">
            <h1>Fazer login</h1>

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
            onChange={e => setPassword(e.target.value)}
            />

            <div className="bottom">
                <div className="remember">
                    <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    onChange={() => remember ? setRemember(false) : setRemember(true)}
                    />

                    <span>Lembrar-me</span>
                </div>

                <Link to='/recoverPassword'>Esqueci minha senha</Link>
            </div>
              {email.length > 0 || password.length > 0 ? (
                <Button text="Entrar" type="submit" className="active"/>
              ): (
                <Button text="Entrar" type="submit"/>
              )}
        </form>

        <footer>
            <p>
              Não tem conta? <br/>
              <Link to="/cadastro">Cadastra-se</Link>
            </p>

            <span>
              É de graça
              <img src={heart} alt="Coração"/>
            </span>
        </footer>

     </section>
    </main>
  )
}

export default Login;