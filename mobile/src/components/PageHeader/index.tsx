import React, { ReactNode } from 'react';
import { StatusBar } from 'expo-status-bar';


import { Container,
     TopBar,
     Button,
     ImageButton,
     Logo,
     Title,
     Header,
    PageName,
    Bottom} from './styles';

import backIcon from "../../assets/images/icons/back.png"
import logoImg from "../../assets/images/logo.png"
import { useNavigation } from '@react-navigation/native';
import colors from '../../assets/styles/colors';


interface PageHeaderProps {
    title?: string;
    headerRight?: ReactNode; //component react
    pageName: string;
}


const PageHeader: React.FC<PageHeaderProps> = ({title, children, headerRight, pageName}) => {

    const {navigate} = useNavigation()

    function handleGoBack(){
        navigate("Landing")
    }

  return (
      <>
          <StatusBar style="light" backgroundColor={colors["primary-dark"]}/>
  <Container>

    <TopBar>
        <Button onPress={handleGoBack}>
            <ImageButton source={backIcon} resizeMode="contain" />
        </Button>

        <PageName>{pageName}</PageName>

        <Logo source={logoImg} resizeMode="contain" />
    </TopBar>

    <Bottom>


        <Header>
            {title && <Title>{title}</Title>}
            {headerRight}
        </Header>
        

        {children}
    </Bottom>


  </Container>
  </>
  )
}

export default PageHeader;