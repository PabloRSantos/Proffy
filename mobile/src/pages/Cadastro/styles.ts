import styled from 'styled-components/native';
import colors from '../../assets/styles/colors';
import statusBarHeight from '../../assets/styles/statusBarHeight';
import backIcon from '../../assets/images/icons/back.png'

interface IProgressItem {
    active: boolean
}

export const Container = styled.KeyboardAvoidingView.attrs({
    behavior: 'height'
})`
  flex: 1;
  background-color: ${colors["color-background"]};
  padding: ${statusBarHeight + 10}px 32px 0;

`;

export const TopScreen = styled.View`
    flex: 1;
    justify-content: space-between;
    padding-bottom: 40px;
`

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const BackIcon = styled.Image.attrs({
    source: backIcon
})`
`

export const ProgressStatus = styled.View`
    flex-direction: row;
`

export const ProgressItem = styled.View<IProgressItem>`
    width: 4px;
    height: 4px;
    border-radius: 2px;
    background-color: ${props => props.active ? colors.primary : colors.disabled};
    margin: 0 3px;
`

export const InfosTop = styled.View`
`

export const TitleTop = styled.Text`
    font-size: 32px;
    font-family: 'Poppins_600SemiBold';
    color: ${colors["text-title"]};
    line-height: 42px;
    margin-bottom: 16px;
`

export const Span = styled.Text`
    font-size: 14px;
    font-family: 'Poppins_400Regular';
    color: ${colors["text-base"]};
    line-height: 24px;
`


export const BottomScreen = styled.View`
    flex: 1.6;
`

export const TitleForm = styled.Text`
  font-size: 24px;
    font-family: 'Poppins_600SemiBold';
    color: ${colors["text-title"]};
`

export const Form = styled.View`
    margin: 25px 0;

`

export const Button = styled.TouchableOpacity`
    margin-top: 25px;

`

export const TextButton = styled.Text`
`
