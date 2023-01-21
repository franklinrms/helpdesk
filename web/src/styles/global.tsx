import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font: 400 16px 'Roboto', sans-serif;
  }
  ::-webkit-scrollbar {
    width: 0.6rem;
    height: 0.6rem;
    margin-right: 10px;
  }
  ::-webkit-scrollbar-corner {
    background: none;
    border: none;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #29292E;
    border-radius: 3px;
    cursor: move;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
    border: none;
  }
  button {
      cursor: pointer;
      border: none;
      background: none;
      &:disabled {
        cursor: not-allowed;
      }
  }
  a {
      text-decoration: none;
      color: inherit;
  }

`;

export default GlobalStyles;
