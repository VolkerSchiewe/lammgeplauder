import React from "react";
import '../styles/tailwind.css';
import { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => <Component { ...pageProps } />
export default App
