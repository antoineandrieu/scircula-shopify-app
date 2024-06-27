export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

import GlobalStyle from "../styles/GlobalStyle";
import React from "react";
import { addDecorator } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { Theme } from "../styles/Theme";
import { I18nProvider } from "../contexts/I18nContext";
import { SearchFiltersContextProvider } from "../contexts/SearchFiltersContext";
import { SessionContextProvider } from "../contexts/SessionContext";
import { DateFiltersContextProvider } from "../components/DatePicker/DateFiltersContext";

addDecorator(storyFn => (
  <ThemeProvider theme={Theme}>
    <I18nProvider>
      <SearchFiltersContextProvider>
        <SessionContextProvider>
          <DateFiltersContextProvider>
            <GlobalStyle theme={Theme} />
            {storyFn()}
          </DateFiltersContextProvider>
        </SessionContextProvider>
      </SearchFiltersContextProvider>
    </I18nProvider>
  </ThemeProvider>
));
