import React, { InputHTMLAttributes } from 'react';

import { Container, InputCustomized, Label} from './styles';
import { TextInputProps } from 'react-native';

interface InputStlye extends TextInputProps{
    classInput: string;
    label?: string;
}   

const Input: React.FC<InputStlye> = ({classInput, label, ...rest}) => {

  return (

      <Container>
          {label && <Label>{label}</Label>}
          <InputCustomized classInput={classInput} {...rest}/>
      </Container>
  )
}

export default Input;