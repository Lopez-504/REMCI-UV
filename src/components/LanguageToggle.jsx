import { useTranslation } from "react-i18next";

//CSS
import "./languageToggle.css"

export default function LanguageToggle() {
    const { i18n } = useTranslation();

    console.log(i18n.language);

    const toggleLanguage = () => {
    const newLanguage = i18n.language === "es" ? "en" : "es";

    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    };

    return (
        <button onClick={toggleLanguage}>
        {i18n.language === "es" ? "ES" : "EN"}
        </button>
    );
}