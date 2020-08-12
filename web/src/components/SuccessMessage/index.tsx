import React from 'react';

import "./style.css"

import successIcon from "../../assets/images/icons/success-check-icon.svg"
import Button from '../Button';

interface SucessMessageProps {
  title: string;
  span: string;
  textButton: string;
}

const SucessMessage: React.FC<SucessMessageProps> = ({title, span, textButton}) => {
  return (
    <main id="sucess-background">
          <section className="sucessMessage">
              <img src={successIcon} alt="Check"/>
              <h1>{title}</h1>
              <p>{span}</p>

              <Button className="active" text={textButton}/>
          </section>
    </main>
  )
}

export default SucessMessage;