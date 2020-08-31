import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'


import {
    Container,
    TopScreen,
    User,
    ProfileImage,
    NameUser,
    LogOut,
    OffIcon,
    Imagem,
    Texto,
    TextoBold,
    ContainerButtons,
    Button1,
    Button2,
    ImagemButton,
    TextoButton,
    Connections,
    Heart
} from './style';

import LandingImg from "../../assets/images/landing.png"
import studyIcon from "../../assets/images/icons/study.png"
import giveClassesIcon from "../../assets/images/icons/give-classes.png"
import heartIcon from "../../assets/images/icons/heart.png"
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';

export interface IUser {
    id?: number,
    name: string,
    sobrenome: string,
    password?: string,
    email?: string,
    avatar: string,
    whatsapp?: string,
    bio?: string,
    resetPassword?: string,
    resetPasswordTime?: Date
}

const Landing: React.FC = () => {
    const navigation = useNavigation()
    const { SignOut } = useAuth()

    const [totalConnections, setTotalConnections] = useState(0)
    const [user, setUser] = useState<IUser>({ avatar: '', name: '', sobrenome: '' })

    useEffect(() => {
        async function loadDatas() {
            const connectionsResponse = await api.get('connections')
            setTotalConnections(connectionsResponse.data.total)

            const userResponse = await api.get('user')
            setUser(userResponse.data)
        }

        loadDatas()

    }, [])


    function handleNavigateToClassesPage() {
        navigation.navigate('GiveClasses')
    }


    function handleNavigateToStudyPages() {
        navigation.navigate('Study')
    }

    function handleNavigateToProfile() {
        navigation.navigate('Profile')
    }

    return (
        <Container>
            <TopScreen>
                <User onPress={handleNavigateToProfile}>
                    <ProfileImage source={{ uri: `http://10.0.0.106:3333/uploads/users/${user.avatar}` }} />
                    <NameUser>{user.name} {user.sobrenome}</NameUser>
                </User>

                <LogOut onPress={() => SignOut()}>
                    <OffIcon />
                </LogOut>
            </TopScreen>

            <Imagem
                style={{ resizeMode: "contain" }}
                source={LandingImg} />

            <Texto>
                Seja bem-vindo, {'\n'}
                <TextoBold>O que deseja fazer?</TextoBold>
            </Texto>

            <ContainerButtons>
                <Button1 onPress={handleNavigateToStudyPages}>
                    <ImagemButton source={studyIcon} />
                    <TextoButton>Estudar</TextoButton>
                </Button1>

                <Button2 onPress={handleNavigateToClassesPage}>
                    <ImagemButton source={giveClassesIcon} />
                    <TextoButton>Dar aulas</TextoButton>
                </Button2>
            </ContainerButtons>

            <Connections>
                Total de {totalConnections} conexões já realizadas {' '}
                <Heart source={heartIcon} />
            </Connections>
        </Container>
    )
}

export default Landing;