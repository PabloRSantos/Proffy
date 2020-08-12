import React, { useEffect, useState } from 'react';
import {useNavigation} from '@react-navigation/native'


import { Container,
     Imagem,
     Texto,
     TextoBold,
     ContainerButtons,
     Button1,
     Button2,
     ImagemButton,
     TextoButton,
     Connections,
     Heart} from './style';

import LandingImg from "../../assets/images/landing.png"
import studyIcon from "../../assets/images/icons/study.png"
import giveClassesIcon from "../../assets/images/icons/give-classes.png"
import heartIcon from "../../assets/images/icons/heart.png"
import api from '../../services/api';

const Landing: React.FC = () => {
    const navigation = useNavigation()
    
    const [totalConnections, setTotalConnections] = useState(0)

    useEffect(() => {
        
        api.get('connections')
        .then(response => setTotalConnections(response.data.total))

    }, [])


    function handleNavigateToClassesPage(){
        navigation.navigate('GiveClasses')
    }


    function handleNavigateToStudyPages(){
        navigation.navigate('Study')
    }

  return (
     <Container>
         <Imagem
         style={{resizeMode: "contain"}}
         source={LandingImg}/>

        <Texto>
            Seja bem-vindo, {'\n'} 
            <TextoBold>O que deseja fazer?</TextoBold>
        </Texto>

        <ContainerButtons>
            <Button1 onPress={handleNavigateToStudyPages}>
                <ImagemButton source={studyIcon}/>
                <TextoButton>Estudar</TextoButton>
            </Button1>

            <Button2 onPress={handleNavigateToClassesPage}>
                <ImagemButton source={giveClassesIcon}/>
                <TextoButton>Dar aulas</TextoButton>
            </Button2>
        </ContainerButtons>

        <Connections>
            Total de {totalConnections} conexões já realizadas {' '}
            <Heart source={heartIcon}/>
        </Connections>
     </Container>
  )
}

export default Landing;