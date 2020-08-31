import React, { useState, useEffect } from 'react';

import {
  Container,
  Scroll,
  Header,
  TitleHeader,
  DescriptionHeader,
  User,
  UserAvatar,
  UserInfos,
  UserName,
  UserSubject
} from './styles';

import PageHeader from '../../components/PageHeader';
import Form from '../../components/Form';
import { IUser } from '../Landing';
import api from '../../services/api';

const Profile: React.FC = () => {
  const [user, setUser] = useState<IUser>({ name: '', sobrenome: '', avatar: '', whatsapp: '' })

  useEffect(() => {

    async function loadDatas() {
      const { data } = await api.get('user')
      setUser(data)
    }

    loadDatas()
  }, [])

  return (
    <>
      <PageHeader pageName='Dar aulas' />
      <Container>
        <Scroll>
          <Header>
            <TitleHeader>Que incrível que você {'\n'}quer dar aulas.</TitleHeader>
            <DescriptionHeader>
              O primeiro passo, é preencher esse{'\n'}
              formulário de inscrição.
            </DescriptionHeader>
          </Header>

          <Form
            buttonText='Salvar cadastro'
            user={user}
            param='create'>

            <User>
              <UserAvatar source={{ uri: `http://10.0.0.106:3333/uploads/users/${user.avatar}` }} />
              <UserInfos>
                <UserName>{user.name} {user.sobrenome}</UserName>
                <UserSubject>Geografia</UserSubject>
              </UserInfos>
            </User>
          </Form>

        </Scroll>
      </Container>
    </>
  )
}

export default Profile;