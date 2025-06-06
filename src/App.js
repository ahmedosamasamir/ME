import React from "react";
import Header from "./header/header";
import Body from "./body/body";
import Footer from "./footer/footer";
import "./App.css";
 
export default function App() {
  return (
    <div className="app">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}
