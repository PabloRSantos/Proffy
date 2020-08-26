import React from 'react';

import { Btn, TextBtn } from './styles';
import { ButtonProps, NativeTouchEvent } from 'react-native';
import { BaseButtonProperties } from 'react-native-gesture-handler'

interface IButtonProps extends BaseButtonProperties{
    text: string,
    color: string,
}

const Button: React.FC<IButtonProps> = ({text, color, ...rest}) => {
  return (
    <Btn color={color} {...rest}>
        <TextBtn>
         {text}
        </TextBtn>
    </Btn>
  )
}

export default Button;