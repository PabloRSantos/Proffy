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

export const Formulario = styled.View`
    margin: 0 ${ScreenWidth(0.05)};
    padding: ${ScreenWidth(0.05)};
    margin-top: -${ScreenHeight(0.07)};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    background-color: ${colors["box-base"]};

`

export const Fieldset = styled.View`
`

interface ITitle {
    first?: boolean,
}

export const Title = styled.Text<ITitle>`
    color: ${colors["text-title"]};
    font-size: 23px;
    font-family: 'Archivo_700Bold';

    padding-bottom: 8px;
    border-bottom-color: ${colors["line-in-white"]};
    border-bottom-width: 1px;

    margin-top: 16px;

    ${props => props.first && 'margin-top: 0'};
`

export const InputBlock = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const ButtonContainer = styled.View`
    background-color: ${colors["box-footer"]};

    margin: 0 ${ScreenWidth(0.05)};
    padding: ${ScreenWidth(0.05)};

    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

`

