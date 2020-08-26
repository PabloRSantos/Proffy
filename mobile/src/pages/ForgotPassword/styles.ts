import styled from 'styled-components/native';
import statusBarHeight from '../../assets/styles/statusBarHeight';
import colors from '../../assets/styles/colors';
import {Dimensions} from 'react-native'

const {width, height} = Dimensions.get('window')

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
    align-items: flex-start;
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
    font-size: 14px;
    color: ${colors["text-base"]};
    margin-top: 5px;

`
export const Form = styled.View`
    margin: 5% 0;
`
