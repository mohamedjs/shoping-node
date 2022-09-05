import '../styles/globals.css'
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import { createStore, applyMiddleware  } from 'redux';
import reducer from '../store/mainReducer';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

let store = createStore(reducer, applyMiddleware(thunk));
function MyApp({ Component, pageProps }) {
  return  <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
}

export default MyApp
