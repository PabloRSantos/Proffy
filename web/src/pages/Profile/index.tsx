import React, {useState, FormEvent, useEffect} from 'react';
import { useHistory } from "react-router-dom"
import PageHeader from '../../components/PageHeader';
import "./style.css"
import Input from '../../components/Input';
import warningIcon from "../../assets/images/icons/warning.svg"
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

export interface IUserState {
  name: string,
  sobrenome: string,
  email: string,
  whatsapp: string,
  bio: string,
  avatar: string
}

interface IClassesState {
  cost: string,
  subject: string
}

interface ScheduleItem {
    id?: number,
    week_day: number,
    to: string,
    from: string
}

const Profile = () => {
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([])
  const [user, setUser] = useState<IUserState>({
    name: '',
    sobrenome: '',
    email: '',
    whatsapp: '',
    bio: '',
    avatar: ''
  })
  const [classes, setClasses] = useState<IClassesState>()
  
  const history = useHistory()

  useEffect(() => {
    loadDatas()
  }, [])

  async function loadDatas(){
      
    try {
      const user = await api.get('user')
      const {data} = await api.get('class')

      setUser(user.data)

      data.classes && setClasses(data.classes)
      data.classes && setScheduleItems(data.scheduleClasses)

    } catch (e) {
      console.log(e)
      alert('Erro ao carregar dados, tente novamente')
    }
  }

  function addNewScheduleItem(){
    const items = [...scheduleItems, {week_day: 0, from: "", to:""}]
    setScheduleItems(items)
  }

  async function deleteSchedule(id?: number){

    if(id){
      await api.delete(`class/${id}`)
    }

    loadDatas()

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

  async function submitForm(e: FormEvent){
      e.preventDefault()

      try {
      await api.put("updateInfos", {
        user,
        classes,
        scheduleItems
      })
        alert("Cadastro realizado com sucesso")
        history.push("/")

    } catch {
      alert("Erro no cadastro")
    }
        
  }

  

  return (
    <div id="page-teacher-form" className="container">
    <PageHeader 
    title={`${user.name} ${user.sobrenome}`}
    description = {classes?.subject}
    pageName='Meu perfil'
    />

    <main>
      <form onSubmit={submitForm}>
        <fieldset>

          <legend>Seus dados</legend>

            <Input
            name="name"
            label="Nome"
            value={user.name}
            onChange={e => setUser({...user, 'name': e.target.value})}/>


            <Input
            name="sobrenome"
            label="Sobrenome"
            value={user.sobrenome}
            onChange={e => setUser({...user, 'sobrenome': e.target.value})}/>

            <Input
            name="avatar"
            label="Avatar"
            value={user.avatar}
            onChange={e => setUser({...user, 'avatar': e.target.value})}/>

            <Input
            name="whatsapp"
            label="Whatsapp"
            value={user.whatsapp}
            onChange={e => setUser({...user, 'whatsapp': e.target.value})}/>

            <Textarea
            name= "bio"
            label="Biografia"
            value={user.bio}
            onChange={e => setUser({...user, 'bio': e.target.value})}/>

        </fieldset>

          {scheduleItems.length > 0 && classes !== undefined && (
            <>
             <fieldset>

             <legend>Sobre a aula</legend>
     
               <Select
                name="subject"
                label="Matéria"
                value={classes.subject}
                onChange={e => setClasses({...classes, 'subject': e.target.value})}
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
               value={classes.cost}
               onChange={e => setClasses({...classes, 'cost': e.target.value})}/>
     
             </fieldset>

              <fieldset>
              <div className="legend">
                <p>Horários disponíveis:</p>
                <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
              </div>

              {scheduleItems.map((scheduleItem: ScheduleItem, index) => (
                  <div key={index} className="schedule-item">
                  <Select
                  name="week_day"
                  label="Dia da semana"
                  value={scheduleItem.week_day}
                  onChange={e => setScheduleItemValue(index, "week_day", e.target.value)}
                  options={[
                    {value: "0", label: "Domingo"},
                    {value: "1", label: "Segunda-feira"},
                    {value: "2", label: "Terça-feira"},
                    {value: "3", label: "Quarta-feira"},
                    {value: "4", label: "Quinta-feira"},
                    {value: "5", label: "Sexta-feira"},
                    {value: "6", label: "Sábado"},
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

                  <div
                  onClick={() => deleteSchedule(scheduleItem.id)}
                  className="timeDelete">
                    <p>Excluir horário</p>
                  </div>
                  </div>
              ))} 

              </fieldset>

              </>
          )}

       

       

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

export default Profile;