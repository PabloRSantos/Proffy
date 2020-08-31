import styled from "styled-components/native"
import { ScreenWidth, ScreenHeight } from "../../assets/styles/screenSize"
import colors from "../../assets/styles/colors"
import { BorderlessButton } from 'react-native-gesture-handler'
import {Picker} from '@react-native-community/picker';    

export const Container = styled.View`
    margin-bottom: 20px;
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
    font-size: ${ScreenWidth(0.058)};
    font-family: 'Archivo_700Bold';

    padding-bottom: 8px;
    border-bottom-color: ${colors["line-in-white"]};
    border-bottom-width: 1px;

    margin: 16px 0 8px;

    ${props => props.first && 'margin-top: 0'};
`

export const InputGroup = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;

    padding-bottom: 24px;

    border-bottom-color: ${colors["line-in-white"]};
    border-bottom-width: 1px;
`

export const InputBlock = styled.View`
    width: 48%;
`

export const DeleteTime = styled(BorderlessButton)`
    position: absolute;
   

    bottom: -8px;
    left: 32%;
    padding: 0 12px;

    background-color: white;
`


export const DeleteTimeText = styled.Text`
    color: #E33D3D;

    font-size: 12px;
    font-family: 'Archivo_700Bold';
`

export const HeaderFieldSet = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    border-bottom-color: ${colors["line-in-white"]};
    border-bottom-width: 1px;

    margin: 16px 0 0px;
    padding-bottom: 8px;

`

export const TitleHeaderFieldSet = styled(Title)`
    border-bottom-color: ${colors["line-in-white"]};
    border-bottom-width: 0px;

    margin: 0;
    padding-bottom: 0px;

`

export const NewTime = styled(BorderlessButton)`
    margin: 0;
    padding: 0;
`

export const NewTimeText = styled.Text`
    color: ${colors.primary};
    font-family: 'Archivo_700Bold';
    font-size: ${ScreenWidth(0.04)};
    margin: 0;
    padding: 0;

`

export const ScheduleGroup = styled.View`
    margin-top: 8px;
`

export const SelectContainer = styled.View`
    
    background-color: ${colors["box-footer"]};
    border-radius: 8px;
    border-width: 1px;
    border-color: ${colors["line-in-white"]};

    height: 60px;
    justify-content: center;

`

export const LabelSelect = styled.Text`
    margin: 10px 0 5px;
    font-size: 13px;
    color: ${colors["text-complement"]};
    font-family: 'Poppins_400Regular';
`

export const Select = styled(Picker)`
    width: 100%;
    padding: 2px 20px;
    font-size: ${ScreenWidth(0.04)};
    font-family: 'Poppins_400Regular';
    color: black;
`

export const ButtonContainer = styled.View`
    background-color: ${colors["box-footer"]};

    margin: 0 ${ScreenWidth(0.05)};
    padding: ${ScreenWidth(0.05)};

    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

`