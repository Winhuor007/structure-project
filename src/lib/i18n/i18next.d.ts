import cn from "./languages/cn.json";
import en from "./languages/en.json";
import km from "./languages/km.json";

interface Resources {
  translation: typeof en | typeof km | typeof cn;
}

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: Resources;
  }
}
