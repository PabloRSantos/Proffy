import React from 'react';

import Whatsapp from "../../assets/images/icons/whatsapp.svg"

import "./styles.css"

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
    <header>
      <img src="https://avatars1.githubusercontent.com/u/64219605?s=460&v=4" alt="Pablo Rosa" />
      <div>
        <strong>Pablo Rosa</strong>
        <span>Quimica</span>
      </div>
    </header>

    <p>
        Entusiasta da Matemática Aplicada e Computacional
        <br/> <br/>
        Apaixonado por Ciência e Tecnologia.
    </p>

    <footer>
      <p>
        Preço/hora
        <strong>R$ 80,00</strong>
      </p>

      <button type="button">
        <img src={Whatsapp} alt="Whatsapp"/>
        Entrar em contato
      </button>
    </footer>

  </article>
    )
}

export default TeacherItem;