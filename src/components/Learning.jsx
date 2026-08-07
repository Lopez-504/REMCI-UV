import "./learning.css";
import { useTranslation } from "react-i18next";
import { Accordion } from '@mantine/core';

//import {articles} from "../constants/articles"
import {articles} from "../constants/articles-ghp"
import { data } from '../constants/accordionData'

export default function Learning() {
    const { t } = useTranslation("learning");

    //Glossary
    const items = data.map((item) => (
      <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
      </Accordion.Item>
    ));

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
        <h1>Other resources</h1>
        <section className="other">
          <div>
            <h2>Windy</h2>
            <iframe src="https://earth.nullschool.net/#current/wind/surface/level/overlay=dew_point_temp/orthographic=-63.25,-12.84,160"></iframe>
          </div>
          <div>
            <h2>Meteored</h2>
            <iframe src="https://earth.nullschool.net/#current/ocean/surface/currents/overlay=sea_surface_temp_anomaly/orthographic=-63.25,-2.84,261" title="Nullschool"></iframe>
          </div>
          <div>
            <h2>Nullschool</h2>
            <iframe src="https://earth.nullschool.net/#current/wind/surface/level/overlay=total_precipitable_water/orthographic=-61.94,-31.26,361" title="Nullschool"></iframe>
          </div>
          <div>
            <h2>Pivotal Weather</h2>
            <iframe src="https://home.pivotalweather.com/" title="Nullschool"></iframe>
          </div>
          <div>
            <h2>DMC</h2>
            <iframe src="https://www.meteochile.gob.cl/PortalDMC-web/index.xhtml" title="Nullschool"></iframe>
          </div>
          <div>
            <h2>DMC - Cartas interactivas</h2>
            <iframe src="https://archivos.meteochile.gob.cl/portaldmc/imgsat/capas/CAPAS%20INTERACTIVAS_2.pdf" title="Nullschool"></iframe>
          </div>
        </section>
      </>  
    );
}

//Windy and NOAA not connecting:
//https://www.windy.com/-Satellite-satellite?satellite,-38.048,-70.425,4,p:cities
//https://www.noaa.gov/

//DMC is quite nice, lots of information. I need to know how do they get the GOES-19 products and how to make that interactive

