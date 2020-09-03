import React, {useState, FormEvent, useEffect} from 'react';
import { useHistory } from "react-router-dom"
import PageHeader from '../../components/PageHeader';
import "./style.css"
import Input from '../../components/Input';
import warningIcon from "../../assets/images/icons/warning.svg"
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';
import {IUserState} from '../Profile'



const TeacherForm = () => {
  const [scheduleItems, setScheduleItems] = useState([{
    week_day: 0, from: "", to:""
  }])
  const [subject, setSubject] = useState("")
  const [cost, setCost] = useState("")
  const [user, setUser] = useState<IUserState>({
    name: '',
    sobrenome: '',
    bio: '',
    avatar: '',
    email: '',
    whatsapp: ''
  })

  const history = useHistory()

  useEffect(() => {
      async function loadDataUser(){
        try {
          const {data} = await api.get('user')

          setUser(data)

        } catch (e) {
            alert('Erro ao procurar dados')
            console.log(e)
        }
      }

      loadDataUser()

  }, [])

  function addNewScheduleItem(){
    setScheduleItems([...scheduleItems, {  week_day: 0, from: "", to:""}])
  }

  function setScheduleItemValue(position: number, field: string, value: string){
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if(index === position) {
        return {...scheduleItem, [field]: value}
      }

      return scheduleItem
    })

    setScheduleItems(updatedScheduleItems)
  }

  function handleCreateClass(e: FormEvent){
      e.preventDefault()

      api.post("classes", {
        whatsapp: user.whatsapp,
        bio: user.bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems
      })
      .then(() => {
        alert("Cadastro realizado com sucesso")
        history.push("/")
      })
      .catch(() => {
        alert("Erro no cadastro")
      })


  }

  return (
    <div id="page-teacher-form" className="container">
    <PageHeader 
    title="Que incrivel que você quer dar aulas"
    description = "O primeiro passo é preencher esse formulário de inscrição"
    pageName="Dar aulas"
    />

    <main>
      <form onSubmit={handleCreateClass}>
        <fieldset>

          <legend>Seus dados</legend>

          <section className="whatsapp_user">

          <div className="user">
              <img src={`https://profit-backend09.herokuapp.com/uploads/users/${user.avatar}`} alt=""/>

              <p>{`${user.name} ${user.sobrenome}`}</p>
            </div>

            <Input
            name="whatsapp"
            label="Whatsapp"
            value={user.whatsapp}
            onChange={e => setUser({...user, 'whatsapp': e.target.value})}/>

          </section>

            <Textarea
            name= "bio"
            label="Biografia"
            value={user.bio}
            onChange={e => setUser({...user, 'bio': e.target.value})}/>

        </fieldset>

        <fieldset>

        <legend>Sobre a aula</legend>

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
          <Input
          name="cost"
          label="Custo da sua hora por aula"
          value={cost}
          onChange={e => setCost(e.target.value)}/>

        </fieldset>

        <fieldset>
          <div className="legend">
            <p>Horários disponíveis:</p>
            <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
          </div>

           {scheduleItems.map((scheduleItem, index) => (
              <div key={scheduleItem.week_day} className="schedule-item">
              <Select
              name="week_day"
              label="Dia da semana"
              value={scheduleItem.week_day}
              onChange={e => setScheduleItemValue(index, "week_day", e.target.value)}
              options={[
                {value: "1", label: "Segunda-feira"},
                {value: "2", label: "Terça-feira"},
                {value: "3", label: "Quarta-feira"},
                {value: "4", label: "Quinta-feira"},
                {value: "5", label: "Sexta-feira"},
              ]}
              />

              <Input 
              name="from"
              label="Das"
              type="time"
              value={scheduleItem.from}
              onChange={e => setScheduleItemValue(index, "from", e.target.value)}/>

              <Input
              name="to"
              label="Até"
              type="time"
              value={scheduleItem.to}
              onChange={e => setScheduleItemValue(index, "to", e.target.value)}/>
              </div>
           ))} 

        </fieldset>

        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante"/>
            Importante! <br />
            Preenche todos os dados
          </p>

          <button type="submit">Salvar cadastro</button>
        </footer>

        </form>

    </main>

   </div>


  );
}

export default TeacherForm;