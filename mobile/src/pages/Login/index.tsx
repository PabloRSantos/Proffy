import React, { useState } from 'react';

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


const Login: React.FC = () => {
  const [formData, setFormData] = useState<ISignIn>({email: '', password: ''})
  const navigation = useNavigation()
  const {SignIn} = useAuth()

  async function handleSubmit(){
   const data = await SignIn(formData)

   console.log(data)
  }

  return (
    <Container>
      <BackgroundImage resizeMode="cover" source={Background}>

      <TextsTop>
          <Logo source={LogoProffy} resizeMode='contain' />
          <SpanLogo>
            Sua plataforma de {'\n'}estudos online
          </SpanLogo>
      </TextsTop>
      </BackgroundImage>

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
            <Check>

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