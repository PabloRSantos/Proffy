import React from 'react';

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
ForgotPassword,
Submit,
TextButton } from './styles';

import Background from '../../assets/images/give-classes-background.png'
import LogoProffy from '../../assets/images/logo.png'
import Input from '../../components/Input';

const Login: React.FC = () => {
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

          <Span>
            Criar uma conta
          </Span>
        </InfosTop>

        <Form>
          <Input classInput={'first'}/>
          <Input classInput={'last'}/>
        </Form>

        <InfosBottom>
          <RememberMe>
            <Check>

            </Check>
            <Text>
              Lembrar-me
            </Text>
          </RememberMe>

          <ForgotPassword>
            Esqueci minha senha
          </ForgotPassword>
        </InfosBottom>

        <Submit>
          <TextButton>
            Entrar
          </TextButton>
        </Submit>


      </FormContainer>
    </Container>
  )
}

export default Login;