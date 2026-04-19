import remci_logo from "/remci_logo.png"
import ifa_logo from "/logo-ifa.png"
import ceacc_logo from "/ceacc_logo.png"

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-left">
        <strong>REMCI-UV</strong>
        <p>Red de Estaciones Meteorológicas Ciencias UV</p>
      </div>

      <div className="footer-center">
        <a href="https://www.uv.cl" target="_blank" rel="noreferrer" >
          Universidad de Valparaíso
        </a>
      </div>

      <div className="footer-right">
        <img src={remci_logo} alt="REMCI logo"/>
        <img src={ifa_logo} alt="IFA"/>
        <img src={ceacc_logo} alt="CEACC"/>
      </div>

    </footer>
  );
};

export default Footer;