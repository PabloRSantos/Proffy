import React, { useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native'

import AsyncStorage from '@react-native-community/async-storage'
import {Feather} from '@expo/vector-icons'

import { Container,
  Scroll,
  Filtros,
  Label,
  Input,
  InputGroup,
  InputBlock,
  BorderButton,
  SubmitButton,
  SubmitText} from './styles';
  
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';



const TeacherList: React.FC = () => {
  const [filterVisible, setFilterVisible] = useState(false)
  const [subject, setSubject] = useState('')
  const [week_day, setWeek_day] = useState('')
  const [time, setTime] = useState('')
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [favorites, setFavorites] = useState<number[]>([])

 

  useFocusEffect(
    useCallback(() => {
      loadDatas()
    }, [])
  )

  function loadFavorites(){
    AsyncStorage.getItem(`favorites`)
    .then(response => {
      if(response) {
       const favoritedTeachers = JSON.parse(response)
       const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => teacher.classItem.id)

       setFavorites(favoritedTeachersIds)
      }
    })
  }

  function handleFiltersVisible(){
    setFilterVisible(!filterVisible)
  }

  async function loadDatas(){
    loadFavorites()

    const {data} = await api.get(`classes`, {
      params: {
      time,
      subject,
      week_day,
      page: 1
    }})

    setFilterVisible(false)
    setTeachers(data.classes)

  }

  return (
    <Container>
       <PageHeader title="Proffys disponiveis"
        pageName='Estudar'
        headerRight={(
          <BorderButton onPress={handleFiltersVisible}>
              <Feather name="filter" size={20} color="#fff"/>
          </BorderButton>
        )}
       >
         { filterVisible && (
          <Filtros>
            <Label>Matéria</Label>
            <Input 
            value={subject}
            onChangeText={text => setSubject(text)}
            placeholder="Qual a matéria?" 
            placeholderTextColor="#c1bccc"/>

            <InputGroup>
              <InputBlock>
                  <Label>Dia da semana</Label>
                <Input
                 value={week_day}
                 onChangeText={text => setWeek_day(text)} 
                placeholder="Qual o dia?" 
                placeholderTextColor="#c1bccc"/>
              </InputBlock>

              <InputBlock>
                  <Label>Horário</Label>
                <Input 
                 value={time}
                 onChangeText={text => setTime(text)}
                placeholder="Qual horário?" 
                placeholderTextColor="#c1bccc"/>
              </InputBlock>
            </InputGroup>

            <SubmitButton onPress={loadDatas}>
              <SubmitText>Filtrar</SubmitText>
            </SubmitButton>
            
          </Filtros>
         )}
       </PageHeader>

      <Scroll
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 16
      }}
      >
       
       {teachers && teachers.map(teacher => 
         <TeacherItem
           key={teacher.classItem.id}
           teacher={teacher}
           favorited={favorites.includes(teacher.classItem.id)}
         />
       )}

      </Scroll>
    </Container>
  )
}

export default TeacherList;