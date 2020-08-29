import React, { useState, useEffect } from 'react';

import { Container,
    Scroll,
    BackgroundImage,
    User,
    ImagemContainer,
    Imagem,
    UpdateImagem,
    Name,
    Subject,

  } from './styles';

import giveClassesBgImage from '../../assets/images/give-classes-background.png'
import { useNavigation } from '@react-navigation/native';
import PageHeader from '../../components/PageHeader';
import Form from '../../components/Form';
import Input from '../../components/Input';
import { IUser } from '../Landing';
import api from '../../services/api';

const GiveClasses: React.FC = () => {

  const [user, setUser] = useState<IUser>({name: '', sobrenome: '', avatar: ''})

  useEffect(() => {
    
    async function loadDatas(){
      const user = await api.get('user')
      const {data} = await api.get('class')

      setUser(user.data)

      // data.classes && setClasses(data.classes)
      // data.classes && setScheduleItems(data.scheduleClasses)
    }

    loadDatas()
  }, [])

  return (
    <>
      <PageHeader pageName='Meu perfil'/>
       
      <Container>
        <Scroll>

        <BackgroundImage
          resizeMode="cover"
          source={giveClassesBgImage}>
          <User>
              <ImagemContainer>
                <Imagem source={{uri: `http://10.0.0.106:3333/uploads/users/default.png`}}/>
                <UpdateImagem></UpdateImagem>
              </ImagemContainer>

              <Name>Pablo</Name>
              <Subject>Geografia</Subject>
            </User>
          </BackgroundImage>

          <Form buttonText='Salvar alterações' user={user}>
           <Input
            label='Nome'
            classInput="unique"
            value={user.name}
            onChangeText={text => setUser({...user, name: text})}/>

            <Input
            label='Sobrenome'
            classInput="unique"
            value={user.sobrenome}
            onChangeText={text => setUser({...user, sobrenome: text})}/>

           <Input
            label='E-mail'
            classInput="unique"
            value={user.email}
            onChangeText={text => setUser({...user, email: text})}/>
          </Form>

        </Scroll>
        
      </Container>
    </>
  )
}

export default GiveClasses;