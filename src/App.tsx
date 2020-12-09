import React from "react";
import "./App.css";
import { Navbar } from "./components/navbar";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import { Home } from "./pages/main/home";
import { ProductList } from "./pages/main/productList";
import { DetailProduct } from "./pages/main/detailProduct";
import { Footerzz } from "./components/footer";
import { AdminLayout } from "./pages/auth/admin";
import { Cart } from "./pages/main/cart";
import { Checkout } from "./pages/main/checkout";
import { Login } from "./pages/auth/login";
import { ConfirmOrder } from "./pages/main/confirmOrder";

function App() {
  let match = useRouteMatch({
    path: "/admin",
    strict: false,
    sensitive: false,
  });

  let matchLogin = useRouteMatch({
    path: "/login",
    strict: false,
    sensitive: false,
  });

  let matchUploadTransaction = useRouteMatch({
    path: "/confirm/:id",
    strict: false,
    sensitive: false,
  });
  return (
    <>
      {!match && !matchLogin && !matchUploadTransaction && <Navbar />}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/products">
          <ProductList />
        </Route>
        <Route path="/products/:id">
          <DetailProduct />
        </Route>
        <Route path="/confirm/:id">
          <ConfirmOrder />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/admin">
          <AdminLayout />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Redirect to="/" />
      </Switch>
      {!match && !matchLogin && !matchUploadTransaction && <Footerzz />}
    </>
  );
}

export default App;
