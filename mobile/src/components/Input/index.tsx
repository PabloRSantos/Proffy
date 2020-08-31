import React, { InputHTMLAttributes, useEffect } from 'react';

import { Container, InputCustomized, Label } from './styles';
import { TextInputProps } from 'react-native';

interface InputStlye extends TextInputProps {
    classInput: string;
    label?: string;
    labelColor?: string;
}

const Input: React.FC<InputStlye> = ({ classInput, label, labelColor, ...rest }) => {

    return (
        <Container>
            {label && <Label labelColor={labelColor}>{label}</Label>}
            <InputCustomized classInput={classInput} {...rest} />
        </Container>
    )
}

export default Input;