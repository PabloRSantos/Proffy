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
    ButtonContainer
} from './styles';

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

const Form: React.FC<IFormProps> = ({ children,
    buttonText,
    user,
    classItem,
    Schedule,
    param }) => {

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

        if (!userState.whatsapp && !userState.bio)
            return setUserState(user)

        if (userState.whatsapp && !userState.bio)
            return setUserState({...user, whatsapp: userState.whatsapp})
        
        if (!userState.whatsapp && userState.bio)
            return setUserState({...user, bio: userState.bio})
    
        
        setUserState({ ...user, whatsapp: userState.whatsapp, bio: userState.bio})

    }, [user, classItem, Schedule])


    function ChangeSchedule(index: number, campo: string, text: string | number) {


        if (schedule.length === 1) {

            const AlteredSchedule = [{ ...schedule[0], [campo]: text }]
            setSchedule(AlteredSchedule)

        } else {

            const AlteredSchedule = schedule.map((scheduleItem, indexItem) =>
                indexItem !== index ? scheduleItem : { ...scheduleItem, [campo]: text }
            )

            setSchedule(AlteredSchedule)
        }

    }

    async function deleteTime(Item: ScheduleItem, index: number) {

        if (Item.id)
            await api.delete(`/class/${Item.id}`)

        const newSchedule = schedule.filter((scheduleItem, indexItem) => indexItem !== index ? true : false)

        setSchedule(newSchedule)
    }

    async function submitForm() {
        try {
            
            if(param === 'create') {
                const requestParams = {
                    whatsapp: userState.whatsapp,
                    bio: userState.bio,
                    subject: classInfos.subject,
                    cost: classInfos.cost,
                    scheduleItems: schedule
                }

                const { data } = await api.post('classes', requestParams)

                alert(data.message)
            } 

            else {
                const requestParams = {
                    user: userState,
                    classes: classInfos,
                    scheduleItems: schedule
                }
        
                const { data } = await api.put('updateInfos', requestParams)

                alert(data.message)
            }
        } catch (error) {
            alert('Erro ao cadastrar nova aula')
        }

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
                        onChangeText={text => setUserState({ ...userState, 'whatsapp': text })}
                    />

                    <Input
                        label='Bio'
                        classInput="unique"
                        multiline={true}
                        numberOfLines={14}
                        textAlignVertical= 'top'
                        style={{paddingTop: 12, paddingBottom: 12}}
                        value={userState.bio}
                        onChangeText={text => setUserState({ ...userState, 'bio': text })}
                    />

                </Fieldset>

                <Fieldset>
                    <Title>Sobre a aula</Title>

                    <LabelSelect>Matéria</LabelSelect>
                    <SelectContainer>
                        <Select
                            selectedValue={'Artes'}
                            onValueChange={itemValue =>  setClassInfos({...classInfos, 'subject': itemValue.toString() })}>
                            <Select.Item label="Artes" value="Artes" />
                            <Select.Item label="Biologia" value="Biologia" />
                            <Select.Item label="Ciências" value="Ciências" />
                            <Select.Item label="Educação Física" value="Educação Física"/>
                            <Select.Item label="Física" value="Física" />
                            <Select.Item label="Geografia" value="Geografia" />
                            <Select.Item label="História" value="História" />
                            <Select.Item label="Matemática" value="Matemática" />
                            <Select.Item label="Português" value="Português" />
                            <Select.Item label="Quimica" value="Quimica" />
                        </Select>
                    </SelectContainer>

                    <Input
                        label='Custo da sua hora por aula'
                        classInput="unique"
                        value={classInfos.cost}
                        onChangeText={text => setClassInfos({ ...classInfos, 'cost': text })} />

                </Fieldset>

                <Fieldset>
                    <HeaderFieldSet>
                        <TitleHeaderFieldSet>Horários disponíveis</TitleHeaderFieldSet>
                        <NewTime onPress={() => setSchedule([...schedule, { week_day: 0, to: '', from: '' }])}>
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
                                        onChangeText={text => ChangeSchedule(index, 'from', text)} />
                                </InputBlock>

                                <InputBlock>
                                    <Input
                                        label='Até'
                                        classInput="unique"
                                        value={ScheduleItem.to}
                                        onChangeText={text => ChangeSchedule(index, 'to', text)} />
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
                    color={colors.secundary} />
            </ButtonContainer>
        </Container>
    )
}

export default Form;