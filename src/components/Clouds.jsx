import "./clouds.css";
import { useTranslation } from "react-i18next";
import HelpTooltip from '../components/HelpTooltip';

import { cloudTypesData } from '../constants/cloudTypesData'
import FlipCard2 from "./FlipCard2";
import FormattedText from "./FormattedText";

export default function Clouds() {
  const { t } = useTranslation("learning");

  return (
    <>
    <div className="clouds-outer">
      <header className="clouds-header">
        <h1>
          {t("clouds.title")}
          <span>
            <HelpTooltip helpKey={t("clouds.help")} placement='right'/>
          </span>
        </h1>
        <p>
          <FormattedText text={t("clouds.subtitle")}/>
        </p>
      </header>
      <section className="clouds-grid">
        {cloudTypesData.map((item) => (
          <div className="clouds-cards" key={item.name}>
            <FlipCard2
              cardTitle={item.name}
              cardImg={item.img}
              cardFront={item.front}
              cardBack={item.back}
            />
          </div>
        ))}  
      </section>
    </div>  
    </>  
  );
}

//Windy and NOAA not connecting:
//https://www.windy.com/-Satellite-satellite?satellite,-38.048,-70.425,4,p:cities
//https://www.noaa.gov/

//DMC is quite nice, lots of information. I need to know how do they get the GOES-19 products and how to make that interactive


