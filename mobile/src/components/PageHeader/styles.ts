import styled from 'styled-components/native';
import {BorderlessButton} from 'react-native-gesture-handler'

export const Container = styled.View`

    padding: 40px;
    background-color: #8257e5;
  
`;


export const TopBar = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
export const Button = styled(BorderlessButton)``
export const ImageButton = styled.Image``
export const Logo = styled.Image``

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`


export const Title = styled.Text`
    font-family: "Archivo_700Bold";
    color: #fff;
    line-height: 32px;
    font-size: 24px;
    max-width: 160px;
    margin: 40px 0;
`


