import cn from "./lang/cn.json";
import en from "./lang/en.json";
import km from "./lang/km.json";

interface Resources {
  translation: typeof en | typeof km | typeof cn;
}

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: Resources;
  }
}
