import React, { useState, useEffect, useCallback} from 'react';

import { Container,
  TopScreen,
  Header,
  BackIcon,
  ProgressStatus,
  ProgressItem,
  InfosTop,
  TitleTop,
  Span,
  BottomScreen,
  TitleForm,
  Form,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import colors from '../../assets/styles/colors';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useAuth } from '../../contexts/auth';
import { BackHandler, Keyboard } from 'react-native';

interface ICadastroForm {
  Nome: string,
  Sobrenome: string,
  Email: string,
  Senha: string,
}

const Cadastro: React.FC = () => {
  const [titleForm, setTitleForm] = useState('01. Quem é você')
  const [color, setColor] = useState(colors.primary)
  const [placeHolder, setPlaceHolder] = useState(['Nome', 'Sobrenome'])
  const [textButton, setTextButton] = useState('Próximo')
  const [page, setPage] = useState(1)
  const [formData, setFormData] = useState<ICadastroForm>({Nome: '', Sobrenome: '', Email: '', Senha: ''})
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const {goBack} = useNavigation()
  const {SignUp} = useAuth()

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',() => setKeyboardVisible(false))

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  
    BackHandler.addEventListener('hardwareBackPress', () => {
      page === 1 ? goBack() : handlePage()
      return true
    })


  async function handleButton(){
    if (page === 1) return handlePage()

    const data = await SignUp({
      name: formData.Nome,
      sobrenome: formData.Sobrenome,
      email: formData.Email,
      password: formData.Senha
    })

    console.log(data)

  }

  function handlePage(){

    if(page === 1){
      setTitleForm('02. Email e senha')
      setColor(colors.secundary)
      setPlaceHolder(['Email', 'Senha'])
      setTextButton('Concluir cadastro')
      setPage(2)

    } else {
      setTitleForm('01. Quem é você')
      setColor(colors.primary)
      setPlaceHolder(['Nome', 'Sobrenome'])
      setTextButton('Próximo')
      setPage(1)
    }
  }



  return (
    <Container>
      {!isKeyboardVisible && (
        <TopScreen>

          <Header>
            <BorderlessButton onPress={() => page === 1 ? goBack() : handlePage()}>
              <BackIcon/>
            </BorderlessButton>
            <ProgressStatus>
              <ProgressItem active={page === 1 ? true : false}/>
              <ProgressItem active={page === 2 ? true : false}/>
            </ProgressStatus>
          </Header>

          <InfosTop>
            <TitleTop>
              Crie sua{'\n'}conta gratuíta
            </TitleTop>
            <Span>
              Basta preencher esses dados{'\n'}e você estará conosco.
            </Span>
        </InfosTop>

        </TopScreen>
      )}


      <BottomScreen>
        <TitleForm>
          {titleForm}
        </TitleForm>
        <Form>
          <Input
          classInput={'first'}
          placeholder={placeHolder[0]}
          onChangeText={text => setFormData({...formData, [placeHolder[0]]: text})}/>

          <Input
          classInput={'last'}
          placeholder={placeHolder[1]}
          onChangeText={text => setFormData({...formData, [placeHolder[1]]: text})}/>

        </Form>
        <Button text={textButton} color={color} onPress={handleButton}/>
      </BottomScreen>

      
    </Container>
  )
}

export default Cadastro;