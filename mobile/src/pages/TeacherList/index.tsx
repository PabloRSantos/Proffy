import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native'

import { Feather } from '@expo/vector-icons'

import {
  Container,
  Lista,
  Filtros,
  InputGroup,
  InputBlock,
  BorderButton,
  Loading
} from './styles';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';
import colors from '../../assets/styles/colors';
import { View } from 'react-native';
import { ScreenHeight } from '../../assets/styles/screenSize';



const TeacherList: React.FC = () => {
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(2)
  const [filterVisible, setFilterVisible] = useState(false)
  const [subject, setSubject] = useState('')
  const [week_day, setWeek_day] = useState('')
  const [time, setTime] = useState('')
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  let favoritedsId: number[] = []



  useFocusEffect(
    useCallback(() => {
      setTeachers([])
      loadDatas(1)
      loadFavorites()
    }, [])
  )

  async function loadFavorites() {
    const { data } = await api.get('favorites')

    favoritedsId = data.classes.map((dataItem: Teacher) => dataItem.classItem.class_id)

    setFavorites(favoritedsId)

  }

  function handleFiltersVisible() {
    setFilterVisible(!filterVisible)
  }

  async function loadDatas(pageParameter: number) {
    if (totalPages < pageParameter) return

    setPage(pageParameter)
    setLoading(true)

    const { data } = await api.get(`classes`, {
      params: {
        time,
        subject,
        week_day,
        page: pageParameter
      }
    })

    if (pageParameter === 1) {
      setTeachers(data.classes)
      setTotalPages(data.pages)
    }

    else {
      const uploadTeachers = teachers.concat(data.classes)
      setTeachers(uploadTeachers)
    }

    setLoading(false)
    setFilterVisible(false)

  }

  const renderTeacher = (item: Teacher) => (
    <TeacherItem
      teacher={item}
      favorited={favorites.includes(item.classItem.class_id)}
    />
  )

  const renderFooter = () => {
    if (!loading) return null
    return (
      <View>
        <Loading page={page}
          color={colors.primary}
          size={30}
        />
      </View>
    );
  }

  return (
    <Container>
      <PageHeader title="Proffys disponiveis"
        pageName='Estudar'
        headerRight={(
          <BorderButton onPress={handleFiltersVisible}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderButton>
        )}
        extraCss='padding-bottom: 40px;'
      >
        {filterVisible && (
          <Filtros>
            <Input
              classInput='unique'
              label='Matéria'
              labelColor={colors["text-in-primary"]}
              value={subject}
              onChangeText={text => setSubject(text)}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc" />

            <InputGroup>
              <InputBlock>
                <Input
                  classInput='unique'
                  label='Dia da semana'
                  labelColor={colors["text-in-primary"]}
                  value={week_day}
                  onChangeText={text => setWeek_day(text)}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc" />
              </InputBlock>

              <InputBlock>
                <Input
                  classInput='unique'
                  label='Horário'
                  labelColor={colors["text-in-primary"]}
                  value={time}
                  onChangeText={text => setTime(text)}
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bccc" />
              </InputBlock>
            </InputGroup>

            <Button onPress={() => loadDatas(1)} text='Filtrar' color={colors.secundary} />

          </Filtros>
        )}
      </PageHeader>

      <Lista
        data={teachers}
        renderItem={({ item }) => renderTeacher(item as Teacher)}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={() => loadDatas(page + 1)}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      />

    </Container>
  )
}

export default TeacherList;