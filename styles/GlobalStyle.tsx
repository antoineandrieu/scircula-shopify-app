import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Lexend&display=swap');

html,
  body {
    padding: 0 !important; // for storybook
    margin: 0;
    font-family: 'Lexend', sans-serif;

    #__next{
      height: 100vh;
      display: grid;
      place-items: center;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    * {
      box-sizing: border-box;
    }
  }
`;

export default GlobalStyle;
