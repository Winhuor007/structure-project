import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import cn from "./lang/cn.json";
import en from "./lang/en.json";
import km from "./lang/km.json";

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
