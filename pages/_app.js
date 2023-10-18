import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { StyleSheetManager } from 'styled-components';

const App = ({ Component, pageProps }) => (
  <StyleSheetManager shouldForwardProp={(prop) => prop !== 'isVisible'}>
    <Component {...pageProps} />
  </StyleSheetManager>
);

export default App;