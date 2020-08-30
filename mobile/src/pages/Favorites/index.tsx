import React, { useState, useCallback} from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import {useFocusEffect} from '@react-navigation/native'

import { Container, Scroll } from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState([])

  async function loadFavorites(){
   const {data} = await api.get(`favorites`, {
     params: {
       page: 1
     }
   })

   setFavorites(data.classes)
  }

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  )

  return (
    <Container>
    <PageHeader pageName='Favoritos' title="Meus proffys favoritos" extraCss='padding-bottom: 50px;'/>

    <Scroll
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 16
      }}
      >
     
      {favorites.map((teacher: Teacher) => (
        <TeacherItem 
        key={teacher.classItem.id}
        teacher={teacher}
        favorited
        />
      ))}

      </Scroll>
 </Container>
  )
}

export default Favorites;