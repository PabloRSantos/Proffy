import React from 'react';
import Background from '../../components/Background';

import "./style.css"
import Input from '../../components/Input';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

import heart from "../../assets/images/icons/purple-heart.svg"

const Login: React.FC = () => {
  return (

    <main id="page-login">

      <Background />

     <section className="right">

         <form className="inputs">
            <h1>Fazer login</h1>

            <Input placeholder="Nome" name="name"/>
            <Input placeholder="Senha" name="password"/>

            <div className="bottom">
                <div className="remember">
                    <input type="checkbox" name="remember" id="remember"/>
                    <span>Lembrar-me</span>
                </div>

                <span>Esqueci minha senha</span>
            </div>

            <Button text="Entrar" type="submit"/>
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