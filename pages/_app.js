import "../styles/globals.css";
import "antd/dist/antd.css";
import React from "react";
import TodosProvider from "../components/TodosContext";

function MyApp({ Component, pageProps }) {
  return (
    <TodosProvider>
      <Component {...pageProps} />
    </TodosProvider>
  );
}

export default MyApp;
