import styled, {css} from 'styled-components/native';
import { ScreenHeight, ScreenWidth } from '../../assets/styles/screenSize';
import colors from '../../assets/styles/colors';


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
`

export const Imagem = styled.Image`
    width: ${ScreenWidth(.24)};
    height: ${ScreenWidth(.24)};
    border-radius: ${ScreenWidth(.24 / 2)};
    margin-bottom: 5px;
`

export const UpdateImagem = styled.View`
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



