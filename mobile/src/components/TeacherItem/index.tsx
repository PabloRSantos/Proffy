import React, { useState } from 'react';
import {Linking} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import { Container,
     Profile,
     Avatar,
     ProfileInfo,
     Nome,
     Subject,
     Bio,
     Footer,
     Price,
     PriceValue,
     ButtonsContainer,
     FavoriteButton,
     IconFavorite,
     ContactButton,
     IconContact,
    TextContact} from './styles';

 import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'    
 import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'    
 import whatsappIcon from '../../assets/images/icons/whatsapp.png'    
import api from '../../services/api';


 export interface Teacher {
    classItem: {
        id: number
        avatar: string
        bio: string
        cost: number
        name: string
        subject: string
        whatsapp: string
    },
    schedule?: {
        day: number,
        hour: string,
    }
  }

interface TeacherItemProps {
    teacher: Teacher
    favorited: boolean
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher, favorited}) => {
    const [isFavorited, setIsFavorited] = useState(favorited)


    function handleToWhatsapp(){
        api.post('connections', {
            user_id: teacher.classItem.id
        })
        Linking.openURL(`whatsapp://send?phone=${teacher.classItem.whatsapp}`)
    }

    async function handleToggleFavorited(){

        const favorites = await AsyncStorage.getItem('favorites')

        let favoritesArray = []

        if(favorites)
        favoritesArray = JSON.parse(favorites)

        if(isFavorited) {

            const favoritedIndex = favoritesArray
            .findIndex((teacherItem: Teacher) =>
            teacherItem.classItem.id === teacher.classItem.id) //se for true retorna o id

            favoritesArray.splice(favoritedIndex, 1)
            setIsFavorited(false)

        } else {

            favoritesArray.push(teacher)
            setIsFavorited(true)

        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))

    }

  return (
      <Container>
          <Profile>
              <Avatar source={{uri: `http://10.0.0.104:3333/uploads/users/${teacher.classItem.avatar}`}}/>
              <ProfileInfo>
                  <Nome>{teacher.classItem.name}</Nome>
                  <Subject>{teacher.classItem.subject}</Subject>
              </ProfileInfo>
          </Profile>

          <Bio>
            {teacher.classItem.bio}
          </Bio>

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
                      ? <IconFavorite source={unfavoriteIcon}/>
                      : <IconFavorite source={heartOutlineIcon}/>}

                  </FavoriteButton>

                  <ContactButton onPress={handleToWhatsapp}>
                      <IconContact source={whatsappIcon}/>
                      <TextContact>Entrar em contato</TextContact>
                  </ContactButton>

                  
              </ButtonsContainer>
          </Footer>
      </Container>
  )
}

export default TeacherItem;