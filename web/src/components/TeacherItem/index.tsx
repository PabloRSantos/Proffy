import React from 'react';

import Whatsapp from "../../assets/images/icons/whatsapp.svg"

import "./styles.css"
import api from '../../services/api';

interface PropsTeacher {
  teacher: {
    avatar: string,
    cost: number,
    id: number,
    bio: number,
    name: string,
    subject: string,
    whatsapp: string,
  }
}

const TeacherItem: React.FC<PropsTeacher> = ({teacher}) => {

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