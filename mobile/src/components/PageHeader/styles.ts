import styled, {css} from 'styled-components/native';
import {BorderlessButton} from 'react-native-gesture-handler'
import colors from '../../assets/styles/colors';
import statusBarHeight from '../../assets/styles/statusBarHeight';
import {ScreenWidth, ScreenHeight} from '../../assets/styles/screenSize';

interface IContainerStyledProps{
    extraCss: string
}

export const Container = styled.View<IContainerStyledProps>`
    background-color: #8257e5;
    padding: ${statusBarHeight}px 0 0;

    ${props => props.extraCss != 'null' && css`${props.extraCss}`}
`;


export const TopBar = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    
    background-color: ${colors["primary-dark"]};
    padding: 12px ${ScreenWidth(.1)};
`
export const Button = styled(BorderlessButton)``

export const ImageButton = styled.Image``

export const PageName = styled.Text`
    color: ${colors["text-in-primary"]};
`

export const Logo = styled.Image``

export const Bottom = styled.View`
    padding: 0 ${ScreenWidth(.1)};
`

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
    margin: ${ScreenHeight(.06)} 0 ${ScreenHeight(.03)};
`


