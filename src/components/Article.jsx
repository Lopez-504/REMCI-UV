import "./article.css";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Article({ article, onBack }) {
 
  const { t } = useTranslation();

  useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
      }, [article]);

  if (!article) {
    return null;
  }
  
  return (
    <main className="article-page">

      {/* =================================
          HEADER
      ================================= */}

      <header className="article-header">
        <div className="article-header-content">

          <span className="article-category">
            {article.category}
          </span>

          <h1>
            {article.articleTitle}
          </h1>

          <p className="article-subtitle">
            {article.subtitle}
          </p>

          <div className="article-meta">
            <span>
              {article.readTime}
            </span>
          </div>
        </div>

        <div className="article-hero-image">

          <img
            src={article.image1}
            alt={article.title}
          />

        </div>

      </header>


      {/* =================================
          ARTICLE CONTENT
      ================================= */}

      <article className="article-content">

        {/* INTRODUCTION */}

        <section className="article-introduction">

          {article.introduction?.map(
            (paragraph, index) => (
              <p key={index}>
                {paragraph}
              </p>
            )
          )}

        </section>


        {/* SECTIONS */}

        {article.sections?.map((section) => (

          <section
            className="article-section"
            key={section.id}
          >

            <h2>
              {section.title}
            </h2>


            {section.paragraphs?.map(
              (paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              )
            )}


            {section.image && (

              <figure className="article-figure">

                <img
                  src={section.image}
                  alt={section.title}
                />

                {section.caption && (
                  <figcaption>
                    {section.caption}
                  </figcaption>
                )}

              </figure>

            )}

          </section>

        ))}


        {/* CONCLUSION */}

        {article.conclusion && (

          <section className="article-conclusion">

            <h2>
              Conclusion
            </h2>

            {article.conclusion.map(
              (paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              )
            )}

          </section>

        )}

      </article>


      {/* =================================
          BACK BUTTON
      ================================= */}

      <div className="article-footer">

        <button
          className="article-back-button"
          onClick={onBack}
        >
          ← {t("articles.backToLearning")}
        </button>

      </div>

    </main>
  );
}