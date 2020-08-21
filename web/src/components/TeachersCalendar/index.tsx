import React, { useEffect, useState } from 'react';

import './styles.css';


interface TeachersCalendarProps {
    day: number,
    hour: string
}

const TeachersCalendar: React.FC<TeachersCalendarProps> = ({day, hour}) => {
    const [hasHour, setHasHour] = useState('')
    const [weekDay, setWeekDay] = useState(`${day}`)

    useEffect(() => {
        if(hour.indexOf('-') === 0){
            setHasHour('notHour')
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
      <main className={`teacherCalendar-bg ${hasHour}`}>
          <section className="teacherCalendar">

          <div className="day">
                <span>Dia</span>
                <p>{weekDay}</p>
          </div>

          <div className="hour">
                 <span>Horário</span>
                 <p>{hour}</p>
          </div>
        </section>
      </main>
  )
}

export default TeachersCalendar;