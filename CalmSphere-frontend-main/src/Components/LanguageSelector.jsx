import { useTranslation } from "react-i18next";
import "./btnstyle.css";
import { useEffect } from "react";

const languages = [
  { code: "en", lang: "English" },
  { code: "ar", lang: "Arabic" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lang) => {
    let reutls = localStorage.setItem("i18nextLng", lang.code); // Store language
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language]);

  return (
    <div className="container">
      {languages.map((lng) => (
        <button
          key={lng.code}
          className={`btn btn-sm btn-outline-light m-1 ${
            lng.code === i18n.language ? "selected" : ""
          }`}
          onClick={() => changeLanguage(lng.code)}
        >
          {lng.code}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
