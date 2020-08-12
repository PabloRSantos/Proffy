import React from 'react';
import Background from '../../components/Background';
import Input from '../../components/Input';
import Button from '../../components/Button';

import "./style.css"

const Cadastro: React.FC = () => {
  return (
        <main id="page-cadastro">
        
         <section className="left">
    
             <form className="inputs">
                <div className="top">
                    <h1>Cadastro</h1>
                    <span>Preenche os dados abaixo
                        para começar
                    </span>
                </div>
    
                <Input placeholder="Nome" name="name"/>
                <Input placeholder="Sobrenome" name="sobrenome"/>
                <Input placeholder="Email" name="email"/>
                <Input placeholder="Senha" name="password"/>
    
               
                <Button text="Concluir cadastro" type="submit"/>
            </form>
    
         </section>
        
         <Background />
        
        </main>
  )
}

export default Cadastro;