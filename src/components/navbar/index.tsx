import React, { useCallback } from "react";
import { Button, Layout, Menu, Input, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";
import { useCartStore } from "../../lib/store";

export const Navbar = () => {
  const { Header } = Layout;
  const { Search } = Input;
  const { push } = useHistory();
  const { productCart } = useCartStore((state) => state);

  const onSearch = useCallback((value) => {
    push({
      pathname: "/products",
      search: `?search=${value}`,
    });
  }, []);

  return (
    <Header style={{ display: "flex", justifyContent: "space-between" }}>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item onClick={() => push("/")} key="0">
          <b style={{ color: "#FFFFFF" }}> MICHI MICHI ID </b>
        </Menu.Item>
        <Menu.Item onClick={() => push("/products")} key="1">
          Atasan
        </Menu.Item>
        <Menu.Item
          onClick={() => push("/products", { type: "bottoms" })}
          key="2"
        >
          Bawahan
        </Menu.Item>
      </Menu>
      <div style={{ alignItems: "center", display: "flex" }}>
        <Search placeholder="Search Product" onSearch={onSearch} enterButton />
        <Button type="text" onClick={() => push("/cart")}>
          <Badge size="small" count={productCart.length}>
            <ShoppingCartOutlined style={{ color: "#FFFFFF", fontSize: 24 }} />
          </Badge>
        </Button>
      </div>
    </Header>
  );
};
