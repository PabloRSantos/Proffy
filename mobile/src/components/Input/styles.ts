import styled, { css } from 'styled-components/native';
import colors from '../../assets/styles/colors'

interface InputPropsStyle {
  classInput: string,
}

interface LabelPropsStyle {
  labelColor?: string;
}

export const Container = styled.View`
  min-width: 100%;
`

export const Label = styled.Text<LabelPropsStyle>`
  margin: 10px 0 5px;

  font-size: 13px;
  color: ${props => props.labelColor ? props.labelColor : colors["text-complement"]};
  font-family: 'Poppins_400Regular';
`

export const InputCustomized = styled.TextInput<InputPropsStyle>`
  
  background-color: ${colors["box-footer"]};
  border: .5px solid ${colors["line-in-white"]};
  min-height: 60px;
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
