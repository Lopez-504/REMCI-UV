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
      </>  
    );
}