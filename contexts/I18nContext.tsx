import React from "react";

import i18nData, { I18NType } from "./I18n";

export const DEFAULT_LANGUAGE = "en";

export type I18nContextType = {
  i18n: I18NType;
  setLanguage: (string) => void;
};

// @ts-ignore
export const I18nContext = React.createContext<I18nContextType>();

function useI18n() {
  const context = React.useContext(I18nContext);
  if (!context) {
    throw new Error(`useI18n must be used within a I18NProvider`);
  }
  return context;
}

function I18nProvider(props) {
  const [language, setLanguage] = React.useState(DEFAULT_LANGUAGE);

  const value = React.useMemo(
    () => ({
      i18n: i18nData[language],
      setLanguage,
    }),
    [language],
  );
  return <I18nContext.Provider value={value} {...props} />;
}

export { I18nProvider, useI18n };
