import React, { useState, useEffect } from 'react';

import { Container,
    Day,
    Arrow,
    Hour } from './styles';

interface ITeacherCalendarProps {
    hour: string,
    day: number
}

const TeacherCalendar: React.FC<ITeacherCalendarProps> = ({day, hour}) => {
    const [hasHour, setHasHour] = useState(true)
    const [weekDay, setWeekDay] = useState('')

    useEffect(() => {
        if(hour.indexOf('-') === 0){
            setHasHour(false)
        }

        switch (day){
            case 0:
                setWeekDay('Segunda') 
                break
            case 1:
                setWeekDay('Terça') 
                break
            case 2:
                setWeekDay('Quarta') 
                break
            case 3:
                setWeekDay('Quinta') 
                break
            case 4:
                setWeekDay('Sexta') 
                break
        }
    }, [])

  return (
        <Container hasHour={hasHour}>

            <Day>{weekDay}</Day>

            <Arrow />

            <Hour>{hour}</Hour>

        </Container>
  )
}

export default TeacherCalendar;