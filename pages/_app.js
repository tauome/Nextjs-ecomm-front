import { CartContextProvider } from "./components/CartContext";

const { createGlobalStyle } = require("styled-components");

const GlobalStyles = createGlobalStyle`
  body{
    padding: 0; 
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #eee; 
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
      
    </>
  )
}
