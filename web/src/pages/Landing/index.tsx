import React, { useState, useEffect } from "react"
import "./style.css"
import {Link} from "react-router-dom"

import LogoImg from "../../assets/images/logo.svg"
import LandingImg from "../../assets/images/landing.svg"

import StudyIcon from "../../assets/images/icons/study.svg"
import GiveClassesIcon from "../../assets/images/icons/give-classes.svg"
import PurpleHearIcon from "../../assets/images/icons/purple-heart.svg"
import api from "../../services/api"

import { FiPower } from "react-icons/fi";
import { useAuth } from "../../contexts/auth"

interface IUser {
    name: string,
    avatar: string
}

const Landing = () => {
    const [totalConnections, setTotalConnections] = useState(0)
    const [user, setUser] = useState<IUser>({name: '', avatar: ''})

    const {SignOut} = useAuth()

    useEffect(() => {
        async function loadDatas(){
          
          try {

            const connections = await api.get('connections')
            setTotalConnections(connections.data.total)

            const user = await api.get('user')
            setUser(user.data)

          } catch (e) {
              console.log(e)
              alert('Erro ao carregar seus dados')
          }
        }

        loadDatas()

    }, [])


    return (
        <main id="main-landing">
            <header>
                <Link to='/profile' className="user">
                    <img src={`http://localhost:3333/uploads/users/${user.avatar}`} alt="Profile"/>
                    <p>{user.name}</p>
                </Link>

                <div id="logOut" onClick={() => SignOut()}>
                    <FiPower size={20}/>
                </div>

            </header>

        <div id="content-landing">

            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={LogoImg} alt="Proffy"/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>

                <img 
                className="hero-image"
                src={LandingImg}
                alt="Plataforma de estudos"
                />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={StudyIcon} alt="Estudar"/>
                        Estudar
                    </Link>

                    <Link to="/give-classes" className="give-classes">
                        <img src={GiveClassesIcon} alt="Dar aulas"/>
                        Dar aulas
                    </Link>
                </div>
                
                <span className="total-connections">
                    Total de {totalConnections} conexões já realizadas 
                    <img src={PurpleHearIcon} alt="Coração roxo"/>
                </span>

            </div>
        </div>
      </main>
    )
}

export default Landing