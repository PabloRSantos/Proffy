import styled from 'styled-components/native';
import colors from '../../assets/styles/colors'
import {Dimensions} from 'react-native'
import statusBarHeight from '../../assets/styles/statusBarHeight';
import { BorderlessButton } from 'react-native-gesture-handler';

const {width} = Dimensions.get('window')

interface CheckBox {
    active: boolean;
}


export const Container = styled.KeyboardAvoidingView.attrs({
    behavior: 'height'
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: ${statusBarHeight}px;
`;

export const BackgroundImage = styled.ImageBackground`
    flex: 1;
    align-items: center;
    justify-content: center;

    background-color: ${colors.primary};
    width: 100%;
`

export const TextsTop = styled.View`
    align-items: flex-start;
    justify-content: center;
`

export const Logo = styled.Image`
    width: 160px;
    height: 50px;
`
export const SpanLogo = styled.Text`
    color: ${colors["text-in-primary"]};
`

export const FormContainer = styled.View`
    flex: 1.4;
    background-color: ${colors["color-background"]};
    padding: 5% 0;

    align-items: center;
    justify-content: center;
    width: ${width * 0.8}px;
`
export const InfosTop = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 100%;
`
export const Title = styled.Text`
    font-family: "Poppins_600SemiBold";
    color: ${colors["text-title"]};
    font-size: 24px;

`
export const Span = styled.Text`
    font-family: "Poppins_400Regular";
    font-size: 12px;
    color: ${colors.primary};

`
export const Form = styled.View`
    margin: 5% 0;
`
export const InfosBottom = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    margin-bottom: 5%; 
`
export const RememberMe = styled.View`
    flex-direction: row;
    align-items: center;
`
export const Check = styled(BorderlessButton)<CheckBox>`
    background-color: ${props => props.active ? colors.secundary : 'white'};
    border-radius: 8px;
    height: 24px;
    width: 24px;
    margin-right: 6px;

    align-items: center;
    justify-content: center;

`
export const Text = styled.Text`
    color: ${colors["text-complement"]};
    font-size: 12px;
`
export const ForgotPassword = styled.Text`
    color: ${colors["text-complement"]};
    font-size: 12px;
`

