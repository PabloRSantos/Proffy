import styled, {css} from 'styled-components/native';
import {BorderlessButton} from 'react-native-gesture-handler'


import backIcon from '../../assets/images/icons/back.png'
import background from '../../assets/images/give-classes-background.png'
import colors from '../../assets/styles/colors';
import statusBarHeight from '../../assets/styles/statusBarHeight';
import { ScreenHeight, ScreenWidth } from '../../assets/styles/screenSize';


interface BackgroundPropsStyle {
    page: number
}

interface ProgressStatus {
    active: boolean;
}


export const Container = styled.View`
  flex: 1;
`;

export const Background = styled.View<BackgroundPropsStyle>`
     padding-top: ${statusBarHeight + 10}px;

    height: ${ScreenHeight(.43)};
    align-items: center;
    justify-content: center;


    background-color: ${props => props.page === 1 ? colors.primary : colors.secundary};

`

export const Icon = styled.Image`
    height: ${ScreenHeight(.15)};
    width:  ${ScreenHeight(.15)};
`

export const Bottom = styled.View`
    flex: 1;
    justify-content: space-between;
    align-items: center;

    padding: ${ScreenHeight(.05)} ${ScreenWidth(.21)};
`

export const WelcomeText = styled.View`
`

export const NumberPage = styled.Text`
    font-family: 'Archivo_400Regular';
    font-size: 40px;
    color: ${colors["text-base"]};
    opacity: .4;
    margin-bottom: ${ScreenHeight(.03)};
`

export const Text = styled.Text`
    font-family: 'Poppins_400Regular';
    font-size: 24px;
    color: ${colors["text-base"]};
`

export const Footer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;
`

export const ProgressContent = styled.View`
    flex-direction: row;

`

export const ProgressStatus = styled.View<ProgressStatusPropsStyle>`
    width: 4px;
    height: 4px;
    border-radius: 2px;

    margin: 0 2px;

    background-color: ${props => props.active ? colors.primary : colors.disabled};
`

export const ButtonArrowRight = styled(BorderlessButton)`
`

export const ArrowRight = styled.Image.attrs({
    source: backIcon
})`
    transform: rotate(180deg);  
`

