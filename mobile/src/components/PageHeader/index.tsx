import React, { ReactNode } from 'react';

import { Container,
     TopBar,
     Button,
     ImageButton,
     Logo,
     Title,
     Header} from './styles';

import backIcon from "../../assets/images/icons/back.png"
import logoImg from "../../assets/images/logo.png"
import { useNavigation } from '@react-navigation/native';


interface PageHeaderProps {
    title: string;
    headerRight?: ReactNode; //component react
}


const PageHeader: React.FC<PageHeaderProps> = ({title, children, headerRight}) => {

    const {navigate} = useNavigation()

    function handleGoBack(){
        navigate("Landing")
    }

  return (
  <Container>

    <TopBar>
        <Button onPress={handleGoBack}>
            <ImageButton source={backIcon} resizeMode="contain" />
        </Button>

        <Logo source={logoImg} resizeMode="contain" />
    </TopBar>


    <Header>
         <Title>{title}</Title>
        {headerRight}
    </Header>
    

    {children}

  </Container>
  )
}

export default PageHeader;