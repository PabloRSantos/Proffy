import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native'

import { Container, Lista } from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';
import { View, ActivityIndicator } from 'react-native';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState([])


  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  )

  async function loadFavorites() {

    const { data } = await api.get(`favorites`)

    setFavorites(data.classes)

  }

  const renderFavorites = (item: Teacher) => (
    <TeacherItem
      key={item.classItem.class_id}
      teacher={item}
      favorited
    />
  )

  return (
    <Container>
      <PageHeader pageName='Favoritos' title="Meus proffys favoritos" extraCss='padding-bottom: 50px;' />

      <Lista
        data={favorites}
        renderItem={({ item }) => renderFavorites(item as Teacher)}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      />

    </Container>
  )
}

export default Favorites;