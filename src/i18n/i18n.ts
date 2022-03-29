import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import deApp from './de/app_de.json';
import enApp from './en/app_en.json';

/**
 * i18n Konfigurieren.
 * Schalter: https://www.i18next.com/overview/configuration-options
 */
i18n
    .use(initReactI18next) // pass the i18n instance to react-i18next.
    .init({
        resources: {
            en: {
                translation: enApp
            },
            de: {
                translation: deApp
            }
        },

        lng: "de",
        // lng: "cimode",
        fallbackLng: "en",
        supportedLngs: ['de', 'en'],

        // debug: true,

        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        }
    });

export default i18n;