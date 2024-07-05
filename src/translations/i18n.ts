import i18n from 'i18next';
import {initReactI18next} from "react-i18next"
import vi from "~translations/vi/vi.json"
import en from "~translations/en/en.json"

export const locales = {
    vi: 'VN',
    en: 'EN'
}

const resources = {
    en: {translation: en},
    vi: {translation: vi},
};

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: 'vi',
    fallbackLng: 'vi',
    interpolation: {
        escapeValue: false,
      },
})

export default i18n;