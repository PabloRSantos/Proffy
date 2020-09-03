import React, { useState, useEffect } from 'react';
import { Linking } from 'react-native'

import {
    Container,
    Profile,
    Avatar,
    ProfileInfo,
    Nome,
    Subject,
    Bio,
    Calendar,
    TopCalendar,
    Hour,
    Day,
    Footer,
    Price,
    PriceValue,
    ButtonsContainer,
    FavoriteButton,
    IconFavorite,
    ContactButton,
    IconContact,
    TextContact
} from './styles';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'
import api from '../../services/api';
import TeacherCalendar from '../TeacherCalendar';


export interface Teacher {
    classItem: {
        class_id: number
        user_id: number
        favorite_id?: number
        avatar: string
        bio: string
        cost: number
        name: string
        subject: string
        whatsapp: string
    },
    scheduleItem: [{
        day: number,
        hour: string,
    }]
}

interface TeacherItemProps {
    teacher: Teacher
    favorited: boolean
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
    const [isFavorited, setIsFavorited] = useState(favorited)

    useEffect(() => {
        setIsFavorited(favorited)
    }, [favorited, teacher])

    function handleToWhatsapp() {
        api.post('connections', {
            user_id: teacher.classItem.user_id
        })
        Linking.openURL(`whatsapp://send?phone=${teacher.classItem.whatsapp}`)
    }

    async function handleToggleFavorited() {

        if (isFavorited) {
            await api.delete(`favorite/${teacher.classItem.class_id}`)
            setIsFavorited(false)
        } else {
            await api.post(`favorite`, { class_id: teacher.classItem.class_id })
            setIsFavorited(true)
        }


    }

    return (
        <Container>
            <Profile>
                <Avatar source={{ uri: `https://profit-backend09.herokuapp.com/uploads/users/${teacher.classItem.avatar}` }} />
                <ProfileInfo>
                    <Nome>{teacher.classItem.name}</Nome>
                    <Subject>{teacher.classItem.subject}</Subject>
                </ProfileInfo>
            </Profile>

            <Bio>
                {teacher.classItem.bio}
            </Bio>


            <Calendar>
                <TopCalendar>
                    <Day>
                        Dia
                    </Day>

                    <Hour>
                        Horário
                    </Hour>
                </TopCalendar>

                {teacher.scheduleItem.map((scheduleItem, index) =>
                    <TeacherCalendar
                        key={index}
                        day={scheduleItem.day}
                        hour={scheduleItem.hour} />)}
            </Calendar>

            <Footer>
                <Price>
                    Preço/hora {'  '}
                    <PriceValue>R$ {teacher.classItem.cost}</PriceValue>
                </Price>

                <ButtonsContainer>

                    <FavoriteButton
                        onPress={handleToggleFavorited}
                        favorited={isFavorited}
                    >
                        {isFavorited
                            ? <IconFavorite source={unfavoriteIcon} />
                            : <IconFavorite source={heartOutlineIcon} />}

                    </FavoriteButton>

                    <ContactButton onPress={handleToWhatsapp}>
                        <IconContact source={whatsappIcon} />
                        <TextContact>Entrar em contato</TextContact>
                    </ContactButton>


                </ButtonsContainer>
            </Footer>
        </Container>
    )
}

export default TeacherItem;