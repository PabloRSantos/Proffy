import React from 'react';

import { Container,
    Scroll,
    BackgroundImage,
    User,
    ImagemContainer,
    Imagem,
    UpdateImagem,
    Name,
    Subject,
    Formulario,
    Fieldset,
    Title,
    InputBlock,
    ButtonContainer
  } from './styles';

import giveClassesBgImage from '../../assets/images/give-classes-background.png'
import { useNavigation } from '@react-navigation/native';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Button from '../../components/Button';
import colors from '../../assets/styles/colors';

const GiveClasses: React.FC = () => {

    const {goBack} = useNavigation()


  return (
    <>
      <PageHeader pageName='Meu perfil'/>
       
      <Container>
        <Scroll>

        <BackgroundImage
          resizeMode="cover"
          source={giveClassesBgImage}>
          <User>
              <ImagemContainer>
                <Imagem source={{uri: `http://10.0.0.106:3333/uploads/users/default.png`}}/>
                <UpdateImagem></UpdateImagem>
              </ImagemContainer>

              <Name>Pablo</Name>
              <Subject>Geografia</Subject>
            </User>
          </BackgroundImage>

          <Formulario>
            <Fieldset>
              <Title first={true}>Seus dados</Title>

              <Input
              label='Nome'
              classInput="unique"/>

              <Input
              label='Sobrenome'
              classInput="unique"/>

              <Input
              label='E-mail'
              classInput="unique"/>

              <Input
              label='Whatsapp'
              classInput="unique"/>

            </Fieldset>

            <Fieldset>
              <Title>Sobre a aula</Title>

              <Input
              label='Matéria'
              classInput="unique"/>

              <Input
              label='Custo da sua hora por aula'
              classInput="unique"/>

            </Fieldset>

            <Fieldset>
              <Title>Horários disponíveis</Title>

              <Input
              label='Dia da semana'
              classInput="unique"/>

              <InputBlock>
                <Input
                label='Das'
                classInput="unique"/>

                <Input
                label='Até'
                classInput="unique"/>
              </InputBlock>

            </Fieldset>

          </Formulario>
          
          <ButtonContainer>
              <Button
                text='Salvar alterações'
                color={colors.secundary}/>
            </ButtonContainer>

        </Scroll>
        
      </Container>
    </>
  )
}

export default GiveClasses;