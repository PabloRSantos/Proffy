import React, { InputHTMLAttributes } from 'react';

import { Container, InputCustomized } from './styles';
import { TextInputProps } from 'react-native';

interface InputStlye extends TextInputProps{
    classInput: string;
}

const Input: React.FC<InputStlye> = ({classInput, ...rest}) => {

  return (

      <Container>
          <InputCustomized classInput={classInput} {...rest}/>
      </Container>
  )
}

export default Input;