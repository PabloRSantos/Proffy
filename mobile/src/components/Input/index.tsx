import React from 'react';

import { Container, InputCustomized } from './styles';

interface InputStlye {
    classInput: string;
}

const Input: React.FC<InputStlye> = ({classInput}) => {

  return (

      <Container>
          <InputCustomized classInput={classInput}/>
      </Container>
  )
}

export default Input;