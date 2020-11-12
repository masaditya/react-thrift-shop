import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./components/navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home } from "./pages/main/home";
import { ProductList } from "./pages/main/productList";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/products">
          <ProductList />
        </Route>
        <Route path="/users">{/* <Users /> */}</Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;
