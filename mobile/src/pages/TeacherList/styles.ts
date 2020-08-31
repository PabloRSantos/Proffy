import styled from 'styled-components/native';
import {BorderlessButton} from 'react-native-gesture-handler'
import {FlatList} from 'react-native';
import { ScreenHeight} from '../../assets/styles/screenSize';

interface LoadingPropsStyled {
  page: number;
}

export const Container = styled.View`
  flex: 1;
  background-color: #f0f0f7;
`;

export const Lista = styled(FlatList)`
  margin-top: -40px;
  flex: 1;
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

export const Loading = styled.ActivityIndicator<LoadingPropsStyled>`
  margin-top: ${props => props.page === 1 ? ScreenHeight(.3) : 0};
`


