import React, { useState, useEffect, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';


import "./styles.css"
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';
import {IoIosArrowDown} from "react-icons/io"

export interface ITeacher {
  avatar: string,
  cost: number,
  id: number,
  bio: number,
  name: string,
  subject: string,
  whatsapp: string,
}

export interface IClassSchedule {
  day: string,
  hour: string
}

interface IClassItem {
  schedule: [IClassSchedule],
  classItem: ITeacher
}

const TeacherList = () => {
  const [subject, setSubject] = useState("")
  const [week_day, setWeek_day] = useState("")
  const [time, setTime] = useState("")
  const [teachers, setTeachers] = useState<IClassItem[]>([])
  const [page, setPage] = useState(1)
  const [classNextPage, setClassNextPage] = useState('')
  let totalPages = 0

  useEffect(() => {
    page >= totalPages && setClassNextPage('hidden')
  }, [page])

  useEffect(() => {
    searchTeachers()
  }, [])

  function submitForm(e: FormEvent){
    e.preventDefault()
    setPage(1)
    searchTeachers()
  }

  async function searchTeachers(){
     const {data} = await api.get('classes', {
          params: {
            week_day,
            time,
            subject,
            page
          }
        })

        page === 1 ? setTeachers(data.classes) : setTeachers([...teachers, data.classes, data.pages])
        totalPages = data.pages
  }


  return (
    <div id="page-teacher-list" className="container">
     <PageHeader title="Estes são os proffys disponiveis" pageName="Estudar">
       <form id="search-teachers" onSubmit={submitForm}>

        <Select
           name="subject"
           label="Matéria"
           value={subject}
           onChange={e => setSubject(e.target.value)}
           options={[
             {value: "Artes", label: "Artes"},
             {value: "Biologia", label: "Biologia"},
             {value: "Ciências", label: "Ciências"},
             {value: "Educação Física", label: "Educação Física"},
             {value: "Física", label: "Física"},
             {value: "Geografia", label: "Geografia"},
             {value: "História", label: "Hustória"},
             {value: "Matemática", label: "Matemática"},
             {value: "Português", label: "Português"},
             {value: "Quimica", label: "Quimica"}
           ]}
          />

          <Select
           name="week_day"
           label="Dia da semana"
           value={week_day}
           onChange={e => setWeek_day(e.target.value)}
           options={[
             {value: "0", label: "Domingo"},
             {value: "1", label: "Segunda-feira"},
             {value: "2", label: "Terça-feira"},
             {value: "3 Física", label: "Quarta-feira"},
             {value: "4", label: "Quinta-feira"},
             {value: "5", label: "Sexta-feira"},
             {value: "6", label: "Sábado"},
           ]}
          />

        <Input
        type="time"
        name= "time"
        label="Hora"
        value={time}
        onChange={e => setTime(e.target.value)}/>

        <button type="submit">
          Buscar
        </button>

       </form>
     </PageHeader>

    <main>
      
           {teachers.length === 0 ? (
             <p id='noData'>Nenhum professor encontrado <br/> em sua pesquisa</p>
           ) : (
             <>
              {teachers.map((teacher: IClassItem) => (
                <TeacherItem
                  key={teacher.classItem.id}
                  teacher={teacher.classItem}
                  class_schedule={teacher.schedule}
                />
                ))}

                <IoIosArrowDown
                className={`iconArrow ${classNextPage}`}
                size={50}
                onClick={() => totalPages > page && setPage(page + 1)}/>
              </>
           )}
           
    </main>

    </div>
  );
}

export default TeacherList