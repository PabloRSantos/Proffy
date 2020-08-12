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

const Landing = () => {
    const [totalConnections, setTotalConnections] = useState(0)

    useEffect(() => {

        api.get("connections")
        .then(response => setTotalConnections(response.data.total))

    }, [])

    return (
        <main id="main-landing">
            <header>
                <div className="user">
                    <img src="" alt="Profile"/>
                    <p>Pablo Rosa</p>
                </div>

                <div id="logOut">
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