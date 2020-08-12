import React from 'react';
import Background from '../../components/Background';
import Button from '../../components/Button';
import Input from '../../components/Input';

import "./style.css"

const RecoverPassword: React.FC = () => {
    return (
        <main id="page-recoverPassword">
        
         <section className="left">
    
             <form className="inputs">
                <div className="top">
                    <h1>Eita, esqueceu <br/> sua senha?</h1>
                    <span>Não esquenta, vamos dar um jeito nisso</span>
                </div>
    
                <Input placeholder="Email" name="email"/>
    
                <Button text="Enviar" type="submit"/>
            </form>
    
         </section>
        
         <Background />
        
        </main>
  )
}

export default RecoverPassword;