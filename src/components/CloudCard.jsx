import { useState } from "react";
import { Collapse } from "@mantine/core";
import { useTranslation } from "react-i18next";
import FormattedText from "./FormattedText";

import "./cloudCard.css";

function CloudCard({ cloud }) {
    const { t } = useTranslation("learning");
    const [opened, setOpened] = useState(false);

  return (
    <div className={`cloud-card-wrapper ${opened ? "is-open" : ""}`}>

      {/* Main cloud card */}
      <div className="cloud-card">

        <div className="cloud-card-image">
          <img
            src={cloud.img}
            alt={cloud.name}
          />
        </div>

        <div className="cloud-card-header">
          <h3>{cloud.name}</h3>

          <button
            className="cloud-card-toggle"
            onClick={() => setOpened((prev) => !prev)}
            aria-expanded={opened}
          >
            {opened ? "×" : t("clouds.read-more")}
          </button>
        </div>

      </div>

      {/* Description panel */}
      <div className="cloud-card-description-wrapper">
        <Collapse expanded={opened} transitionDuration={500}>
          <div className="cloud-card-description">
            <h4>{cloud.name}</h4>

            <p>
              <FormattedText text={t(cloud.description)} />
            </p>
          </div>
        </Collapse>
      </div>

    </div>
  );
}

export default CloudCard;