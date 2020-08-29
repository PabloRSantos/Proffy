import styled, {css} from 'styled-components/native';
import colors from '../../assets/styles/colors';
import { FontAwesome } from '@expo/vector-icons'; 

interface IContainerStyledProps {
    hasHour: boolean
}

export const Container = styled.View<IContainerStyledProps>`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding: 15px;
    margin: 5px;
    
    border-width: 1px;
    border-color: ${colors["line-in-white"]};
    border-radius: 8px;
    
    background-color: ${colors["box-footer"]};

    ${props => props.hasHour === false &&
        css`opacity: .3;`}
    `;

const Texts = css`
    font-size: 16px;
    font-family: 'Archivo_700Bold';
    color: ${colors["text-base"]};
    width: 30%;
`

export const Day = styled.Text`
    ${Texts}
`

export const Arrow = styled(FontAwesome).attrs({
    name: "long-arrow-right",
    size: 25,
    color: colors["line-in-white"]
})`
`

export const Hour = styled.Text`
    ${Texts};
`

