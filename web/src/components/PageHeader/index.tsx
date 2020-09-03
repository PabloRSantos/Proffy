import React, { ChangeEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import LogoImg from "../../assets/images/logo.svg"
import BackIcon from "../../assets/images/icons/back.svg"
import Camera from '../../assets/images/icons/photo-camera.svg'

import "./styles.css"
import api from "../../services/api";
import { useAuth } from "../../contexts/auth";
import { profile } from "console";

interface PageHeaderProps {
    title: string;
    description?: string;
    pageName: string;
    profilePic?:string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  description,
   profilePic,
   title,
   pageName,
   children}) => {

    const [profilePicState, setProfilePicState] = useState(profilePic)

    useEffect(() => {

      if(profilePic)
        setProfilePicState(profilePic)

    }, [profilePic])

  async function updatePic(e: ChangeEvent<HTMLInputElement>){
    try {

      if(e.target.files !== null){
        const file = e.target.files[0]
  
        const dataForm = new FormData()
  
        dataForm.append('imagem', file)
  
        const {data} = await api.put('profilePic', dataForm)

        alert(data.message)

        setProfilePicState(data.file)
      }

    } catch (error) {
        alert('Erro ao trocar foto de perfil, tente novamente')
    }
  }

  return (
    <header className="page-header">

      <div className="top-bar-bg">
        <div className="top-bar-container">
        <Link to="/">
          <img src={BackIcon} alt="Voltar"/>
        </Link>
        <p>{pageName}</p>
        <img src={LogoImg} alt="Proffy"/>
      </div>
      </div>

  <div className="header-content">
    {profilePicState && (
      <div className='profilePic'>
        <img src={`https://profit-backend09.herokuapp.com/uploads/users/${profilePicState}`} alt="Profile Pic"/>
        <div className='changePic'>
            <img
            src={Camera}
            alt="Camera"
            />
            <label htmlFor="file" id='label'></label>
            <input type="file" name="file" id="file" accept='image/*' hidden onChange={updatePic}/>
        </div>
      </div>
    )}
    <strong> {title} </strong>
  {description && <p>{description}</p>}


    {children}
  </div>


  </header>
  );
}

export default PageHeader;