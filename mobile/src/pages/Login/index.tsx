import React, { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

import { Container,
BackgroundImage,
TextsTop,
Logo,
SpanLogo,
FormContainer,
InfosTop,
Title,
Span,
Form,
InfosBottom,
RememberMe,
Check,
Text,
ForgotPassword} from './styles';

import Background from '../../assets/images/give-classes-background.png'
import LogoProffy from '../../assets/images/logo.png'
import Input from '../../components/Input';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import colors from '../../assets/styles/colors';
import { useAuth, ISignIn } from '../../contexts/auth';
import { Feather } from '@expo/vector-icons'; 



const Login: React.FC = () => {
  const [formData, setFormData] = useState<ISignIn>({email: '', password: '', remember: false})
  const [checkActive, setCheckActive] = useState(false)
  const navigation = useNavigation()
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const {SignIn} = useAuth()

 useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  function handleCheck(){
   
    if(checkActive){
      setCheckActive(false)
      setFormData({...formData, 'remember': false})
    } else {
      setCheckActive(true)
      setFormData({...formData, 'remember': true})
    }
  }

  async function handleSubmit(){
   const data = await SignIn(formData)

   console.log(data)

  }

  return (
    <Container>
      {!isKeyboardVisible && (
        <BackgroundImage resizeMode="cover" source={Background}>

        <TextsTop>
            <Logo source={LogoProffy} resizeMode='contain' />
            <SpanLogo>
              Sua plataforma de {'\n'}estudos online
            </SpanLogo>
        </TextsTop>
        </BackgroundImage>
      )}

      <FormContainer>
        <InfosTop>
          <Title>
            Fazer Login
          </Title>

          <Span onPress={() => navigation.navigate('Cadastro')}>
            Criar uma conta
          </Span>
        </InfosTop>

        <Form>
          <Input
          classInput={'first'} 
          placeholder='E-mail'
          onChangeText={text => setFormData({...formData, email: text})}
          />

          <Input
          classInput={'last'}
          placeholder='Senha'
          onChangeText={text => setFormData({...formData, password: text})}
          />

        </Form>

        <InfosBottom>
          <RememberMe>
            <Check
              active={checkActive}
              onPress={handleCheck}>
             <Feather name="check" size={13} color="white" />
            </Check>
            <Text>
              Lembrar-me
            </Text>
          </RememberMe>

          <ForgotPassword onPress={() => navigation.navigate('ForgotPassword')}>
            Esqueci minha senha
          </ForgotPassword>
        </InfosBottom>

        <Button text="Entrar" color={colors.secundary} onPress={handleSubmit}/>


      </FormContainer>
    </Container>
  )
}

export default Login;