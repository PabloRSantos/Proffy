import styled, {css} from 'styled-components/native';
import { ScreenHeight, ScreenWidth } from '../../assets/styles/screenSize';
import colors from '../../assets/styles/colors';
import {RectButton} from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'; 


export const Container = styled.View`
     flex: 1;
     align-items: center;
    background-color: ${colors["color-background"]};

`;

export const Scroll = styled.ScrollView`
     width: ${ScreenWidth()};
`

export const BackgroundImage = styled.ImageBackground`
    background-color: ${colors.primary};
    padding: ${ScreenHeight(0.02)} 0  ${ScreenHeight(0.1)};
`

export const User = styled.View`
    align-items: center;
    margin-top: 12px;
`

export const ImagemContainer = styled.View`
    position: relative;
`

export const Imagem = styled.Image`
    width: ${ScreenWidth(.24)};
    height: ${ScreenWidth(.24)};
    border-radius: ${ScreenWidth(.24 / 2)};
    margin-bottom: 5px;
`

export const UpdateImagem = styled(RectButton)`
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 3;

    width: 35px;
    height: 35px;
    border-radius: ${35 / 2}px;

    align-items: center;
    justify-content: center;

    background-color: ${colors.secundary};

`

export const Camera = styled(Feather).attrs({
    name: 'camera',
    size: 20,
    color: 'white'
})`

`

export const Name = styled.Text`
    font-size: 24px;
    font-family: 'Archivo_700Bold';
    color: ${colors["button-text"]};
`

export const Subject = styled.Text`
    font-size: 13px;
    font-family: Poppins_400Regular;
    color: ${colors["text-in-primary"]};
`



