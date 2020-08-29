import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler'
import colors from '../../assets/styles/colors';

export const Container = styled.View`
    background-color: #fff;
    border: 1px solid #e6e6f0;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 16px;
`;

export const Profile = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 24px;
`
export const Avatar = styled.Image`
    width: 64px;
    height: 64px;
    border-radius: 32px;
    background-color: #eee;

`
export const ProfileInfo = styled.View`
    margin-left: 16px;
`
export const Nome = styled.Text`
    font-family: "Archivo_700Bold";
    color: #32264d;
    font-size: 20px;
`

export const Subject = styled.Text`
    font-family: "Poppins_400Regular";
    color: #6a6180;
    font-size: 12px;
    margin-top: 4px;
`


export const Bio = styled.Text`
    margin: 0 24px;
    font-family: "Poppins_400Regular";
    font-size: 14px;
    line-height: 24px;
    color: #6a6180;
    margin-bottom: 8px;
`

export const Calendar = styled.View`
    padding: 15px 24px;


    border-top-width: 1px;
    border-bottom-width: 1px;
    border-color: ${colors["line-in-white"]};
`

export const TopCalendar = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between; 

    padding: 0 15px;
`

export const Hour = styled.Text`
    font-size: 10px;
    font-family: "Poppins_400Regular";
    color: ${colors["text-complement"]};
`
export const Day = styled.Text`
     font-size: 10px;
     font-family: "Poppins_400Regular";
     color: ${colors["text-complement"]};
`

export const Footer = styled.View`
    background-color: #fafafc;
    padding: 24px;
    align-items: center;

`
export const Price = styled.Text`
    font-family: "Poppins_400Regular";
    color: #6a6180;
    font-size: 14px;

`
export const PriceValue = styled.Text`
    font-family: "Archivo_700Bold";
    color: #8257e5;
    font-size: 16px;
    margin-top: 24px;
`
export const ButtonsContainer = styled.View`
    flex-direction: row;
    margin-top: 16px;
`

interface Favorited {
    favorited: boolean;
}

export const FavoriteButton = styled(RectButton)<Favorited>`
    background-color: ${props => props.favorited ? "#e33d3d" : "#8257e5"};
    width: 56px;
    height: 56px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    margin-right: 8px;

`
export const IconFavorite = styled.Image`
`
export const ContactButton = styled(RectButton)`
    background-color: #04d361;
    flex: 1;
    height: 56px;
    border-radius: 8px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
`
export const IconContact = styled.Image`
`
export const TextContact = styled.Text`
    color: #fff;
    font-family: "Archivo_700Bold";
    font-size: 16px;
    margin-left: 16px;
    `


export const a = styled.View``