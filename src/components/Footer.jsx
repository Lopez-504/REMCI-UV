import React from 'react';

//CSS
import './footer.css'

//LOGOS
import remci_logo from "/remci_logo.png"
import ifa_logo from "/ifa2.png"
import ceacc_logo from "/ceacc_logo.png"
import uv_logo from "/uv-logo.png"

//STATIC
import { NAV_ITEMS } from '../constants/sectionTabs';

const Footer = ({ setActiveSection }) => {
  return (
    <footer className="footer">

      <div className="footer-left">
        <strong>REMCI-UV</strong>
        <p>Red de Estaciones Meteorológicas Ciencias UV</p>
      </div>

      <div className="footer-center">
        <a href="https://www.uv.cl" target="_blank" rel="noreferrer" >
          <img src={uv_logo} alt="UV" />
        </a>
      </div>

      <div className="footer-right">
        <img 
          src={remci_logo} 
          onClick={ () => { setActiveSection(NAV_ITEMS[0].options[0].key); }}
          alt="REMCI logo"/>
        <a href="https://ifa.uv.cl/"><img src={ifa_logo} alt="IFA"/></a>
        <a href="https://ceaas.uv.cl/es-co/"><img src={ceacc_logo} alt="CEACC"/></a>
      </div>

    </footer>
  );
};

export default Footer;