import React from "react";
import { Link } from "react-router-dom";

import LogoImg from "../../assets/images/logo.svg"
import BackIcon from "../../assets/images/icons/back.svg"

import "./styles.css"

interface PageHeaderProps {
    title: string;
    description?: string;
    pageName: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({description, title, pageName, children}) => {
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
    <strong> {title} </strong>
  {description && <p>{description}</p>}


    {children}
  </div>


  </header>
  );
}

export default PageHeader;