import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler'
import colors from '../../assets/GlobalStyle.json'
import {Dimensions} from 'react-native'

const {width} = Dimensions.get('window')


export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
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
    flex: 1.3;
    background-color: ${colors["color-background"]};
    padding: 5% 0;

    align-items: center;
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

`
export const Check = styled.View`
`
export const Text = styled.Text`
    color: ${colors["text-complement"]};
    font-size: 12px;
`
export const ForgotPassword = styled.Text`
    color: ${colors["text-complement"]};
    font-size: 12px;
`
export const Submit = styled(RectButton)`
    width: 100%;
    height: 65px;
    background-color: ${colors.secundary};

    align-items: center;
    justify-content: center;

    border-radius: 8px;
`
export const TextButton = styled.Text`
    color: ${colors["button-text"]};
    font-family: 'Archivo_700Bold';
    font-size: 16px;

`
