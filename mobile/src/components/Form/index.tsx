import React, { useState, useEffect } from 'react';

import { 
    Container,
    Formulario,
    Fieldset,
    Title,
    InputGroup,
    InputBlock,
    DeleteTime,
    DeleteTimeText,
    HeaderFieldSet,
    TitleHeaderFieldSet,
     NewTime,
     NewTimeText,
     ScheuduleGroup,
    ButtonContainer } from './styles';
import Input from '../Input';
import colors from '../../assets/styles/colors';
import Button from '../Button';
import { IUser } from '../../pages/Landing';
import api from '../../services/api';

interface IFormProps {
    buttonText: string,
    user: IUser
}

export interface IClass {
    subject: string,
    cost: string,
}

interface ScheduleItem {
    week_day: number,
    from: string,
    to: string,
}

const Form: React.FC<IFormProps> = ({children, buttonText, user}) => {
    const [classInfos, setClassInfos] = useState<IClass>({
        subject: '',
        cost: '',
    })
    const [schedule, setSchedule] = useState<ScheduleItem[]>([{
            week_day: 0,
            from: '',
            to: ''
    }])
    const [userState, setUserState] = useState<IUser>(user)


    useEffect(() => {
        async function loadDatas(){
            await api.get('user')
        }

        loadDatas()
    }, [])

    useEffect(() => {

        setUserState({...user, whatsapp: userState.whatsapp})

    }, [user])


    function ChangeSchedule(index: number, campo: string, text: string){
        
        const AlteredSchedule = [...schedule, {...schedule[index], [campo]: text}]

        console.log(AlteredSchedule)

        setSchedule(AlteredSchedule)

    }

    function deleteTime(index: number){

        const newSchedule = schedule.filter((scheduleItem, indexItem) => indexItem !== index ? true : false)

        setSchedule(newSchedule)
    }

    async function submitForm(){
        const {data} = await api.post('classes', {
            whatsapp: userState.whatsapp,
            bio: userState.bio,
            subject: classInfos.subject,
            cost: classInfos.cost,
            schedule,
        })

        console.log(data)
    }



  return (
      <Container>
        <Formulario>
        <Fieldset>
        <Title first={true}>Seus dados</Title>

       {children}

        <Input
        label='Whatsapp'
        classInput="unique"
        value={userState.whatsapp}
        onChangeText={text => setUserState({...userState, 'whatsapp': text})}
        />

        </Fieldset>

        <Fieldset>
        <Title>Sobre a aula</Title>

        <Input
        label='Matéria'
        classInput="unique"
        value={classInfos.subject}
        onChangeText={text => setClassInfos({...classInfos, 'subject': text})}/>

        <Input
        label='Custo da sua hora por aula'
        classInput="unique"
        value={classInfos.cost}
        onChangeText={text => setClassInfos({...classInfos, 'cost': text})}/>

        </Fieldset>

        <Fieldset>
            <HeaderFieldSet>
             <TitleHeaderFieldSet>Horários disponíveis</TitleHeaderFieldSet>
             <NewTime onPress={() => setSchedule([...schedule, {week_day: 0, to: '', from: ''}])}>
                 <NewTimeText>
                    + Novo
                 </NewTimeText>
             </NewTime>

            </HeaderFieldSet>

        {schedule.map((ScheduleItem, index) => (
            <ScheuduleGroup key={index}>
                <Input
                label='Dia da semana'
                classInput="unique"
                onChangeText={text => ChangeSchedule(index, 'week_day', text)}/>

                <InputGroup>

                    <DeleteTime onPress={() => deleteTime(index)}>
                        <DeleteTimeText>
                             Excluir horário
                        </DeleteTimeText>
                    </DeleteTime>

                    <InputBlock>
                    <Input
                    label='Das'
                    classInput="unique"
                    value={ScheduleItem.from}
                    onChangeText={text => ChangeSchedule(index, 'from', text)}/>
                    </InputBlock>

                    <InputBlock>
                    <Input
                    label='Até'
                    classInput="unique"
                    value={ScheduleItem.to}
                    onChangeText={(text) => ChangeSchedule(index, 'to', text)}/>
                    </InputBlock>

                </InputGroup>
            </ScheuduleGroup>
        ))}

        </Fieldset>

    </Formulario>
    
    <ButtonContainer>
        <Button
            onPress={submitForm}
            text={buttonText}
            color={colors.secundary}/>
        </ButtonContainer>
    </Container>
  )
}

export default Form;