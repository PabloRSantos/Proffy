import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import colors from '../../assets/styles/colors';

interface BtnStyleProps {
    color: string,
}

export const Btn = styled(RectButton)<BtnStyleProps>`
    width: 100%;
    height: 65px;
    background-color: ${props => props.color};

    align-items: center;
    justify-content: center;

    border-radius: 8px;
`
export const TextBtn = styled.Text`
    color: ${colors["button-text"]};
    font-family: 'Archivo_700Bold';
    font-size: 16px;

`



