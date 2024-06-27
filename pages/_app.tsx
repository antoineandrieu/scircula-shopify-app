import { Provider } from "@shopify/app-bridge-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";

import { I18nProvider } from "../contexts/I18nContext";
import { SearchFiltersContextProvider } from "../contexts/SearchFiltersContext";
import { SessionContextProvider } from "../contexts/SessionContext";
import GlobalStyle from "../styles/GlobalStyle";
import { StyledMainLayout } from "../styles/MainLayout";
import { Theme } from "../styles/Theme";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [host, setHost] = useState(null);

  useEffect(() => {
    setHost(router.query.host);
  }, [router]);

  if (!host) return null;

  const config = {
    host: host,
    apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY,
    forceRedirect: true,
  };

  return (
    <React.Fragment>
      <Provider config={config}>
        <I18nProvider>
          <ThemeProvider theme={Theme}>
            <GlobalStyle />
            <StyledMainLayout>
              <SessionContextProvider>
                <SearchFiltersContextProvider>
                  <Component {...pageProps} />
                </SearchFiltersContextProvider>
              </SessionContextProvider>
            </StyledMainLayout>
          </ThemeProvider>
        </I18nProvider>
      </Provider>
    </React.Fragment>
  );
}

export default MyApp;
