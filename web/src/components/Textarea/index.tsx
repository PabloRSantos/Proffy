import React, {TextareaHTMLAttributes} from 'react';
import "./style.css"

interface TextareaPops extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    label: string;
    name: string;
}

const Textarea: React.FC<TextareaPops> = ({label, name, ...rest}) => {
  return (
    <div className="textarea-block">
        <label htmlFor={name}>{label}</label>
        <textarea id={name} {...rest} />
  </div>
  )
}

export default Textarea;