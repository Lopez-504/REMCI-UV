import "./learning.css";
import { useTranslation } from "react-i18next";
import { Accordion } from '@mantine/core';

//import {articles} from "../constants/articles"
import { articles } from "../constants/articles-ghp"
import { glossaryData } from '../constants/glossaryData'
import { cloudTypesData } from '../constants/cloudTypesData'
import { otherResources } from "../constants/otherResources";
import FlipCard from "./FlipCard";
import FlipCard2 from "./FlipCard2";

export default function Learning() {
    const { t } = useTranslation("learning");

    return (
      <>
        <section className="learning-container">
          <header className="learning-header">
            <h1>{t("title")}</h1>
            <p>{t("subtitle")}</p>
          </header>
          {articles.map((article, index) => (
            <article className="article-card" key={article.id}>
              <div className="article-info">
                <div className="article-meta">
                  <span>{t(article.category)}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                </div>
                <h2>{t(article.title)}</h2>
                <p>{t(article.summary)}</p>
                <button className="read-btn">
                    {t("readMore")}
                </button>
              </div>
              <div className="article-images">
                <img
                  src={article.image1}
                />
                <img
                    src={article.image2}
                />
              </div>
              </article>
            ))}
        </section>
        <div className="glossary-outer">
        <header className="learning-header">
            <h1>Weather Glossary</h1>
            <p>Find out more about the weather concepts we use everyday, and how they relate to forecast and observations</p>
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

        {/* Cloud types */}
        <div className="clouds-outer">
        <header className="learning-header">
            <h1>10 basic Cloud Types</h1>
            {/* add helptooltips for each <p> */}
            <p>High clouds: Cirrus (Ci), cirrocumulus (Cc), and cirrostratus (Cs)</p>
            <p>Mid-level clouds: Altocumulus (Ac), altostratus (As), and nimbostratus (Ns)</p>
            <p>Low-level clouds: Cumulus (Cu), stratocumulus (Sc), stratus (St), and cumulonimbus (Cb) </p>
        </header>
        <section className="clouds">
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

        {/* Other Resources */}
        <div className="other-resources">
        <header className="learning-header">
            <h1>Other Resources</h1>
            <p>subtitle</p>
        </header>
        <section className="otherRes">
          {otherResources.map((item) => (
            <div>
            <h2>{item.title}</h2>
            <iframe src={item.url}></iframe>
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

