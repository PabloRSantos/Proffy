import styled from 'styled-components/native';
import { ScreenWidth, ScreenHeight } from '../../assets/styles/screenSize';
import colors from '../../assets/styles/colors';

export const Container = styled.View`
   flex: 1;
     align-items: center;
    background-color: ${colors["color-background"]};
`;

export const Scroll = styled.ScrollView`
     width: ${ScreenWidth()};

`

export const Header = styled.View`
    background-color: ${colors.primary};
    height: ${ScreenHeight(.38)};
    padding: 0 ${ScreenWidth(0.05)} 30px;
    justify-content: center;
`

export const TitleHeader = styled.Text`
    font-size: ${ScreenWidth(0.07)};
    font-family: 'Archivo_700Bold';
    color: ${colors["title-in-primary"]};
    margin-bottom: ${ScreenHeight(0.02)};

`

export const DescriptionHeader = styled.Text`
    font-size: ${ScreenWidth(0.038)};
    font-family: 'Poppins_400Regular';
    color: ${colors["text-in-primary"]};
`

export const User = styled.View`
    flex-direction: row;
    align-items: center;
    margin: 12px 0;
`

export const UserAvatar = styled.Image`
    height: ${ScreenWidth(0.17)};
    width: ${ScreenWidth(0.17)};
    border-radius: ${ScreenWidth(0.17 / 2)};
`

export const UserInfos = styled.View`
    margin-left: 8px;
`

export const UserName = styled.Text`
    font-size: ${ScreenWidth(0.055)};
    font-family: 'Archivo_700Bold';
    color: ${colors["text-title"]};
`

export const UserSubject = styled.Text`
    font-size: ${ScreenWidth(0.032)};
    font-family: 'Poppins_400Regular';
    color: ${colors["text-base"]};
`
