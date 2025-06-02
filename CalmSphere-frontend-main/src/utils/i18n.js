import i18n from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next, Translation } from "react-i18next";


i18n.use(I18nextBrowserLanguageDetector).use(initReactI18next).init({
    debug: false,
    // lng: 'en', // default language but not saved in localstorage
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en: {
            translation: {
                greeting: "Hello World!",
                home: "Home",
                users: "Users",
            },
        },
        ar: {
            translation: {
                greeting: "مرحباً بالعالم",
                home: "الرئيسية",
                users: "المستخدمين",
            },
        },
    }
})
