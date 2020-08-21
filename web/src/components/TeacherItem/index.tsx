import React from 'react';

import Whatsapp from "../../assets/images/icons/whatsapp.svg"

import "./styles.css"
import api from '../../services/api';
import TeachersCalendar from '../TeachersCalendar';
import { ITeacher, IClassSchedule } from '../../pages/TeacherList';

interface PropsTeacherItem {
  teacher: ITeacher
  class_schedule: [IClassSchedule]
}

const TeacherItem: React.FC<PropsTeacherItem> = ({teacher, class_schedule}) => {

  function createConnection(){
    api.post("connections", {
      user_id: teacher.id
    })
  }

  return (
    <article className="teacher-item">
    <header>
      <img src={`http://localhost:3333/uploads/users/${teacher.avatar}`} alt={teacher.name} />
      <div>
        <strong>{teacher.name}</strong>
        <span>{teacher.subject}</span>
      </div>
    </header>

    <p>
       {teacher.bio}
    </p>

     <div className="calendar">
       {class_schedule.map((class_scheduleItem: IClassSchedule, index) => (
         <TeachersCalendar key={index} day={Number(class_scheduleItem.day)} hour={class_scheduleItem.hour}/>
       ))}
    </div>

    <footer>
      <p>
        Preço/hora
        <strong>R$ {teacher.cost}</strong>
      </p>


      <a 
      onClick={createConnection}
      href={`https://api.whatsapp.com/send?phone=${teacher.whatsapp}`} >

        <img src={Whatsapp} alt="Whatsapp"/>
        Entrar em contato

      </a>
    </footer>

  </article>
    )
}

export default TeacherItem;