import React from "react";
import '../styles/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';

import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

const App = ({ Component, pageProps }: AppProps) => {
    return <>
    <ToastContainer />
    <Component {...pageProps} />
    </>;
}
export default App
