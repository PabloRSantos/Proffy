import React, {ButtonHTMLAttributes} from 'react';
import "./style.css"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    text: string;
}

const Button: React.FC<ButtonProps> = ({text, ...rest}) => {
  return <button {...rest}>{text}</button>
}

export default Button;