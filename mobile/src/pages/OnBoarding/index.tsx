import React, { useState } from 'react';
import { useAuth } from '../../contexts/auth'
import { useNavigation } from '@react-navigation/native';

import { Container,
  Background,
  Icon,
  Bottom,
  WelcomeText,
  Footer,
  NumberPage,
  Text,
  ProgressContent,
  ProgressStatus,
  ButtonArrowRight,
  ArrowRight} from './styles';

import StudyIcon from "../../assets/images/icons/study.png"
import GiveClassesIcon from "../../assets/images/icons/give-classes.png"
import { BackHandler } from 'react-native';


const OnBoarding: React.FC = () => {
  const [page, setPage] = useState(1)
  const [textState, setTextState] = useState("Encontre vários professores para ensinar você")


  const {FreeAcess} = useAuth()
  const { goBack } = useNavigation()

  BackHandler.addEventListener('hardwareBackPress', () => {
    page === 1 ? goBack() : backPage()
    return true
  })

  function backPage(){
    setTextState("Encontre vários professores para ensinar você")
    setPage(1)
}

  function nextPage(){
    if(page === 1) {
      setTextState("Ou dê aulas sobre o que você mais conhece")
      setPage(2)
    }

    else {
      FreeAcess()
    }
  }

  return (
    <Container>
      <Background page={page}>
        <Icon source={page === 1 ? StudyIcon : GiveClassesIcon}/>
      </Background>

      <Bottom>
        <WelcomeText>
            <NumberPage>
              {page}.
            </NumberPage>

            <Text>
              {textState}
            </Text>
          </WelcomeText>

        <Footer>

          <ProgressContent>
            <ProgressStatus active={page === 1 ? true : false}/>
            <ProgressStatus active={page === 2 ? true : false}/>
          </ProgressContent>

          <ButtonArrowRight onPress={nextPage}>
             <ArrowRight />
          </ButtonArrowRight>
        </Footer>

      </Bottom>
    </Container>
  )
}

export default OnBoarding;