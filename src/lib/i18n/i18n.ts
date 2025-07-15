import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import cn from "./languages/cn.json";
import en from "./languages/en.json";
import km from "./languages/km.json";

const resources = {
  en: { translation: en },
  km: { translation: km },
  cn: { translation: cn },
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("i18nextLng") || "km",
    fallbackLng: "km",
    interpolation: {
      escapeValue: false,
    },
  });



export { i18n };
