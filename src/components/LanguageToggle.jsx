import { useTranslation } from "react-i18next";
import React from 'react';
import clickSound from '../../public/chords-0210.wav'; 

//CSS
import "./languageToggle.css"

const playSound = () => {
  const audio = new Audio(clickSound);
  audio.play();
};

export default function LanguageToggle() {
    const { i18n } = useTranslation();

    console.log(i18n.language);

    const toggleLanguage = () => {
    const newLanguage = i18n.language === "es" ? "en" : "es";

    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    };

    return (
        <button onClick={() => {toggleLanguage();playSound();}}>
        {i18n.language === "es" ? "ES" : "EN"}
        </button>
    );
}