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
     ScheduleGroup,
     SelectContainer,
     LabelSelect,
     Select,
    ButtonContainer } from './styles';

import Input from '../Input';
import colors from '../../assets/styles/colors';
import Button from '../Button';
import { IUser } from '../../pages/Landing';
import api from '../../services/api';

interface IFormProps {
    buttonText: string,
    user: IUser,
    param: string,
    classItem?: IClass,
    Schedule?: ScheduleItem[]
}

export interface IClass {
    subject: string,
    cost: string,
}

export interface ScheduleItem {
    week_day: number,
    from: string,
    to: string,
    id?: number,
    class_id?: number
}

const Form: React.FC<IFormProps> = ({children,
     buttonText,
     user,
     classItem,
     Schedule,
     param}) => {

    const [classInfos, setClassInfos] = useState<IClass>({
        subject: '',
        cost: '',
    })

    const [schedule, setSchedule] = useState<ScheduleItem[]>([{
            week_day: 1,
            from: '',
            to: ''
    }])

    const [userState, setUserState] = useState<IUser>(user)

    useEffect(() => {

        Schedule && setSchedule(Schedule)
        classItem && setClassInfos(classItem)

        if(userState.whatsapp)
         setUserState({...user, whatsapp: userState.whatsapp})
        
        else
         setUserState(user)

    }, [user, classItem, Schedule])
       

    function ChangeSchedule(index: number, campo: string, text: string | number){


        if(schedule.length === 1){
            
             const AlteredSchedule = [{...schedule[0], [campo]: text}]
             setSchedule(AlteredSchedule)

        } else {

             const AlteredSchedule = schedule.map((scheduleItem, indexItem) => 
                 indexItem !== index ? scheduleItem : {...scheduleItem, [campo]: text}
                )

             setSchedule(AlteredSchedule)
        }
        
    }

    async function deleteTime(Item: ScheduleItem, index: number){

        if(Item.id)
            await api.delete(`/class/${Item.id}`)

        const newSchedule = schedule.filter((scheduleItem, indexItem) => indexItem !== index ? true : false)

        setSchedule(newSchedule)
    }

    async function submitForm(){
        const requesParams = {
            whatsapp: userState.whatsapp,
            bio: userState.bio,
            subject: classInfos.subject,
            cost: classInfos.cost,
            scheduleItems: schedule
        }

        const {data} = param === 'create' ? 
            await api.post('classes', requesParams) :
            await api.put('updateInfos', requesParams)

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
            <ScheduleGroup key={index}>

                <LabelSelect>Dia da semana</LabelSelect>
                <SelectContainer>
                    <Select
                    selectedValue={ScheduleItem.week_day.toString()}
                    onValueChange={itemValue => ChangeSchedule(index, 'week_day', itemValue)}>
                        <Select.Item label="Segunda" value="1" />
                        <Select.Item label="Terça" value="2" />
                        <Select.Item label="Quarta" value="3" />
                        <Select.Item label="Quinta" value="4" />
                        <Select.Item label="Sexta" value="5" />
                    </Select>
                </SelectContainer>


                <InputGroup>

                    <DeleteTime onPress={() => deleteTime(ScheduleItem, index)}>
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
                    onChangeText={text => ChangeSchedule(index, 'to', text)}/>
                    </InputBlock>

                </InputGroup>
            </ScheduleGroup>
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