import styled, {css} from "styled-components/native"
import {RectButton, BorderlessButton} from 'react-native-gesture-handler'
import colors from "../../assets/styles/colors"
import { Feather } from '@expo/vector-icons'; 
import statusBarHeight from "../../assets/styles/statusBarHeight";
import {ScreenHeight, ScreenWidth} from '../../assets/styles/screenSize'


export const Container = styled.View`
    flex: 1;
    justify-content: center;

    padding: ${statusBarHeight + ScreenHeight(.01)} ${ScreenWidth(.1)};

    background-color: ${colors.primary};
`

export const TopScreen = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;

    width: ${ScreenWidth(.8)};
`

export const User = styled(BorderlessButton)`
    flex-direction: row;
    align-items: center;
`

export const ProfileImage = styled.Image`
    width: ${ScreenHeight(.06)};
    height: ${ScreenHeight(.06)};
    border-radius: ${ScreenHeight(.03)};
    margin-right: 6px;
`

export const NameUser = styled.Text`
    font-family: 'Poppins_400Regular';
    font-size: 12px;
    color: ${colors["text-in-primary"]};
`

export const LogOut = styled(BorderlessButton)`
    background-color: ${colors["primary-darker"]};
    width: ${ScreenHeight(.06)};
    height: ${ScreenHeight(.06)};
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;
`


export const OffIcon = styled(Feather).attrs({
    name: 'power',
    size: 20,
    color: colors["text-in-primary"]
})`
`


export const Imagem = styled.Image`
    width: 100%;
`

export const Texto = styled.Text`
    color: #FFF;
    font-size: 20px;
    line-height: 30px;
    margin-top: ${ScreenWidth(.03)};
    font-family: "Poppins_400Regular";
`
export const TextoBold  = styled.Text`
    font-family: "Poppins_600SemiBold";
        
`

export const ContainerButtons = styled.View`
    flex-direction: row;
    margin-top: 20px;
    justify-content: space-between;

`
const Buttons = css`
    height: ${ScreenWidth(.35)};
    width: 48%; 
    background-color: #333;
    border-radius: 8px;
    padding: 7%;
    justify-content: space-between;
    align-items: flex-start;
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
    margin-top: ${ScreenHeight(.02)};
`

export const Heart = styled.Image`
`