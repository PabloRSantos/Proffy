import React, {InputHTMLAttributes} from 'react';
import "./style.css"

interface InputPops extends InputHTMLAttributes<HTMLInputElement>{
    label?: string;
    name: string;
    type?: string;
}

const Input: React.FC<InputPops> = ({label, type = 'text', name, ...rest}) => {
  return (
    <div className="input-block">
        <label htmlFor={name}>{label}</label>
        <input type={type} id={name} {...rest} />
  </div>
  )
}

export default Input;