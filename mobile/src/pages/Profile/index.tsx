import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'

import { Container,
    Scroll,
    BackgroundImage,
    User,
    ImagemContainer,
    Imagem,
    UpdateImagem,
    Camera,
    Name,
    Subject,

  } from './styles';

import giveClassesBgImage from '../../assets/images/give-classes-background.png'
import { useNavigation } from '@react-navigation/native';
import PageHeader from '../../components/PageHeader';
import Form, { IClass, ScheduleItem } from '../../components/Form';
import Input from '../../components/Input';
import { IUser } from '../Landing';
import api from '../../services/api';

const GiveClasses: React.FC = () => {

  const [user, setUser] = useState<IUser>({name: '', sobrenome: '', avatar: ''})
  const [classes, setClasses] = useState<IClass>()
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>()

  useEffect(() => {
    loadDatas()
    getPermissionAsync();
  }, [])

async function loadDatas(){
  const user = await api.get('user')
  const {data} = await api.get('class')

  setUser(user.data)

  data.classes && setClasses(data.classes)
  data.classes && setScheduleItems(data.scheduleClasses)
}

  async function getPermissionAsync (){
    if (Constants.platform?.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Desculpe, mas precisamos da permissão para acessar a galeria');
      }
    }
  };

  async function pickImage(){
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      if (!result.cancelled) {
        try {
          let localUri: string = result.uri;
          let filename: any = localUri.split('/').pop();
        
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;
        
          const dataForm: any = new FormData()
          
          dataForm.append('imagem', { uri: localUri, name: filename, type });

          await api.put('profilePic', dataForm)

          loadDatas()

        } catch(e){
          alert('Erro ao alterar foto, tente novamente')
        }

          
      }

      console.log(result);
    } catch (e) {
      console.log(e);
      alert('Erro ao alterar foto, tente novamente')
    }
  }


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

                <UpdateImagem onPress={pickImage}>
                  <Camera />
                </UpdateImagem>

                <Imagem source={{uri: `http://10.0.0.106:3333/uploads/users/${user.avatar}`}}/>

              </ImagemContainer>

              <Name>{user.name} {user.sobrenome}</Name>
              <Subject>Geografia</Subject>
            </User>
          </BackgroundImage>

          <Form 
            buttonText='Salvar alterações'
            user={user}
            classItem={classes}
            Schedule={scheduleItems}
            param='update'>
              
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