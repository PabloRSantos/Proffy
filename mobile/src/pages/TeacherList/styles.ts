import styled from 'styled-components/native';
import {BorderlessButton, RectButton} from 'react-native-gesture-handler'

export const Container = styled.View`
  flex: 1;
  background-color: #f0f0f7;
`;

export const Scroll = styled.ScrollView`
  margin-top: -40px;
`

export const BorderButton = styled(BorderlessButton)``

export const Filtros = styled.View`
  margin-bottom: 24px;

`
export const Label = styled.Text`
  color: #d4c2ff;
  font-family: 'Poppins_400Regular';
`

export const InputGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;

`
export const InputBlock = styled.View`
  width: 48%;
`


