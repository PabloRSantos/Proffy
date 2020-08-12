import React from 'react';
import "./style.css"
import Logo from "../../assets/images/logo.svg"

// import { Container } from './styles';

const Background: React.FC = () => {
  return (
      <main className="background-component">
          <div className="titulo">
              <img src={Logo} alt="Proffy"/>
              <span>Sua plataforma de <br/> estudos online</span>
          </div>
      </main>
  )
}

export default Background;