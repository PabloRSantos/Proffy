import styled, {css} from "styled-components/native"
import {RectButton} from 'react-native-gesture-handler'


export const Container = styled.View`
    flex: 1;
    justify-content: center;

    padding: 40px;

    background-color: #8257E5;
`

export const Imagem = styled.Image`
    width: 100%;
`

export const Texto = styled.Text`
    color: #FFF;
    font-size: 20px;
    line-height: 30px;
    margin-top: 80px;
    font-family: "Poppins_400Regular";
`
export const TextoBold  = styled.Text`
    font-family: "Poppins_600SemiBold";
        
`

export const ContainerButtons = styled.View`
    flex-direction: row;
    margin-top: 40px;
    justify-content: space-between;

`
const Buttons = css`
    height: 150px;
    width: 48%; 
    background-color: #333;
    border-radius: 8px;
    padding: 24px;
    justify-content: space-between;
`

export const Button1 = styled(RectButton)`
    ${Buttons}
    background-color: #9871F5;
`

export const Button2 = styled(RectButton)`
    ${Buttons}
    background-color: #04D361;

`

export const ImagemButton = styled.Image`
`

export const TextoButton = styled.Text`
    font-family: "Archivo_700Bold";
    color: #FFF;
    font-size: 20px;
`

export const Connections = styled.Text`
    font-family: "Poppins_400Regular";
    color: #d4c2ff;
    font-size: 12px;
    line-height: 20px;
    max-width: 140px;
    margin-top: 40px;
`

export const Heart = styled.Image`
`