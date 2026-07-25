import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import commonEn from "./locales/en/common.json"
import landingEn from "./locales/en/landing.json";
import sectionsEN from "./locales/en/sections.json";
import galleryEN from "./locales/en/gallery.json"
import currentCondEN from "./locales/en/currentCond.json"
import forecastEn from "./locales/en/forecast.json";
import chartsEn from "./locales/en/charts.json";
import exportEn from "./locales/en/export.json";

import commonEs from "./locales/es/common.json"
import landingEs from "./locales/es/landing.json";
import sectionsES from "./locales/es/sections.json";
import galleryES from "./locales/es/gallery.json"
import currentCondES from "./locales/es/currentCond.json"
import forecastEs from "./locales/es/forecast.json";
import chartsEs from "./locales/es/charts.json";
import exportEs from "./locales/es/export.json";


i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: commonEn,
        export: exportEn,
        landing: landingEn,
        gallery: galleryEN,
        currentCond: currentCondEN,
        forecast: forecastEn,
        charts: chartsEn,
        sections: sectionsEN
      },
      es: {
        common: commonEs,
        export: exportEs,
        landing: landingEs,
        gallery: galleryES,
        currentCond: currentCondES,
        forecast: forecastEs,
        charts: chartsEs,
        sections: sectionsES
      },
    },
     
    //namespaces
    ns: ["common", "sections", "gallery", "currentCond","export", "landing", "forecast", "charts"],      
    defaultNS: "common",

    lng: localStorage.getItem("language") || "es",
    fallbackLng: "es",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;