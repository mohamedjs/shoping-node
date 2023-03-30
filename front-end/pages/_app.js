import '../styles/globals.css'
import {useEffect} from "react";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import { createStore, applyMiddleware  } from 'redux';
import reducer from '../store/mainReducer';
import { useRouter } from 'next/router';
import Cookie from "js-cookie";   
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

let store = createStore(reducer, applyMiddleware(thunk));

function MyApp({ Component, pageProps }) {
  return  <Provider store={store}>
            {Component.auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </Provider>
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  let user = Cookie.get("user") ? JSON.parse(Cookie.get("user")) : {}
  console.log(user);
  const router = useRouter()
  useEffect(() => {
    if (!user.token) {
      router.push("/auth/login?redirectTo="+router.asPath);
      return;
    }
  }, [])

  return children
}

export default MyApp