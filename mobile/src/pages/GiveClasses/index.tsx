import React from 'react';

import { Container,
    BackgroundImage,
    Title,
    Description,
    Button,
    TextButton} from './styles';

import giveClassesBgImage from '../../assets/images/give-classes-background.png'
import { useNavigation } from '@react-navigation/native';

const GiveClasses: React.FC = () => {

    const {goBack} = useNavigation()

    function handleNavigationBack(){
        goBack()
    }

  return (
    <Container>
        <BackgroundImage
        resizeMode="contain"
        source={giveClassesBgImage}>

            <Title>Quer ser um Proffy?</Title>
            <Description>Para começar, você precisa se 
                cadastrar como professor na nossa plataforma
                web
            </Description>

        </BackgroundImage>

        <Button onPress={handleNavigationBack}>
            <TextButton>Tudo bem</TextButton>
        </Button>

    </Container>
  )
}

export default GiveClasses;