import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import CommonEn from "../Assets/Strings/common.en.json";

const languageDetector = {
  type: "languageDetector",
  async: false, // flags below detection to be async
  detect: callback => {
    // return /*'en'; */ Localization.getLocalizationAsync().then(({ locale }) => {
    //   callback(locale);
    // });
    return "en";
  },
  init: () => {},
  cacheUserLanguage: () => {}
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources: {
      en: {
        common: CommonEn
      }
    },
    ns: ["common"],
    defaultNS: "common",

    debug: true,

    // cache: {
    //   enabled: true
    // },

    interpolation: {
      escapeValue: false // not needed for react as it does escape per default to prevent xss!
    }
  });

export default i18n;
