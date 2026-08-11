import "./articles.css";
import { useTranslation } from "react-i18next";

//import {articles} from "../constants/articles"
import { articles } from "../constants/articles-ghp"
import { otherResources } from "../constants/otherResources";

export default function Articles() {
    const { t } = useTranslation("learning");

    return (
      <>
        <section className="learning-container">
          <header className="learning-header">
            <h1>{t("articles.title")}</h1>
            <p>{t("articles.subtitle")}</p>
          </header>
          {articles.map((article, index) => (
            <article className="article-card" key={article.id}>
              <div className="article-info">
                <div className="article-meta">
                  <span>{t(article.category)}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                </div>
                <h2>{t('articles.'+article.title)}</h2>
                <p>{t('articles.'+article.summary)}</p>
                <button className="read-btn">
                    {t("articles.readMore")}
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
        {/* Other Resources */}
        <div className="other-resources">
        <header className="learning-header">
          <h1>{t("otherRes.title")}</h1>
          <p>{t("otherRes.subtitle")}</p>
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