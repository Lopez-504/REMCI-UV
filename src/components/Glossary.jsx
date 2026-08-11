//COMPONENTS
import { useTranslation } from "react-i18next";
import HelpTooltip from '../components/HelpTooltip';
import FlipCard from "./FlipCard";
import FormattedText from "./FormattedText";

//STATIC
import "./glossary.css";
import { glossaryData } from '../constants/glossaryData'



export default function Glossary() {
    const { t } = useTranslation("learning");

    return (
      <>
        <div className="glossary-outer">
        <header className="glossary-header">
            <h1>
              {t("glossary.title")}
              <span>
                <HelpTooltip helpKey={t("glossary.help")} placement='right'/>
              </span>
            </h1>
            <p>
              <FormattedText text={t("glossary.subtitle")} />
            </p>
        </header>
        <section className="glossary">
          {glossaryData.map((item) => (
            <div className="test" key={item.name}>
            <FlipCard
              cardTitle={item.name}
              cardIcon={item.emoji} 
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

//Glossary v1
/*
//Glossary
    /*const items = data.map((item) => (
      <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
      </Accordion.Item>
    ));

<section>
          <details className="learning-details">
            <summary>Glossary</summary>
            <Accordion
              defaultValue="Apples"
              classNames={{  }}
              order={3}
            >
              {items}
            </Accordion>
          </details>
        </section>
*/

