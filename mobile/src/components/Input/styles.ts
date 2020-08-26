import styled, {css} from 'styled-components/native';
import colors from '../../assets/styles/colors'

interface InputPropsStyle {
   classInput: string,
}

export const Container = styled.View`
  min-width: 100%;
  height: 65px;
`

export const InputCustomized = styled.TextInput<InputPropsStyle>`
  
  background-color: ${colors["box-footer"]};
  border: .5px solid ${colors["line-in-white"]};
  height: 100%;
  padding: 2px 20px;

  ${props => props.classInput === 'first' && css`
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  `}

  ${props => props.classInput === 'last' && css`
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  `}

  ${props => props.classInput === 'unique' && css`
    border-radius: 8px
  `}

`
