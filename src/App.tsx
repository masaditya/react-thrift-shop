import React from "react";
import "./App.css";
import { Navbar } from "./components/navbar";
import { Switch, Route } from "react-router-dom";
import { Home } from "./pages/main/home";
import { ProductList } from "./pages/main/productList";
import { DetailProduct } from "./pages/main/detailProduct";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/products">
          <ProductList />
        </Route>
        <Route path="/products/:id">
          {" "}
          <DetailProduct />{" "}
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;
