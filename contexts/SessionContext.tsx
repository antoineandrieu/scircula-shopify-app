import React, { useState } from "react";

export type SessionContextType = {
  accessToken: string;
  setAccessToken: (string) => void;
  scirculaAccessToken: string;
  setScirculaAccessToken: (string) => void;
  shop: string;
  setShop: (string) => void;
  host: string;
  setHost: (string) => void;
  currency: string;
  setCurrency: (string) => void;
  plan: string;
  setPlan: (string) => void;
  scriptTagId: string;
  setScriptTagId: (string) => void;
  fmfSettingsOn: boolean;
  setFmfSettingsOn: (boolean) => void;
  buttonUrl: boolean;
  setButtonUrl: (boolean) => void;
  isDemo: boolean;
  setIsDemo: (boolean) => void;
};

// @ts-ignore
export const SessionContext = React.createContext<SessionContextType>();

function useSessionContext() {
  const context = React.useContext(SessionContext);
  if (!context) {
    throw new Error(
      `useSessionContext must be used within a SessionContextProvider`,
    );
  }
  return context;
}

function SessionContextProvider(props) {
  const [accessToken, setAccessToken] = useState(null);
  const [scirculaAccessToken, setScirculaAccessToken] = useState(null);
  const [shop, setShop] = useState(null);
  const [host, setHost] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [plan, setPlan] = useState(null);
  const [scriptTagId, setScriptTagId] = useState(null);
  const [fmfSettingsOn, setFmfSettingsOn] = useState(null);
  const [buttonUrl, setButtonUrl] = useState(null);
  const [isDemo, setIsDemo] = useState(null);

  const sessionValue = {
    accessToken,
    setAccessToken,
    scirculaAccessToken,
    setScirculaAccessToken,
    shop,
    setShop,
    currency,
    host,
    setHost,
    setCurrency,
    plan,
    setPlan,
    scriptTagId,
    setScriptTagId,
    fmfSettingsOn,
    setFmfSettingsOn,
    buttonUrl,
    setButtonUrl,
    isDemo,
    setIsDemo,
  };

  return <SessionContext.Provider value={sessionValue} {...props} />;
}

export { SessionContextProvider, useSessionContext };
