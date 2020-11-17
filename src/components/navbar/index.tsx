import React from "react";
import { Button, Layout, Menu, PageHeader, Input } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";  

export const Navbar = () => {
  const { Header } = Layout;
  const { Search } = Input;
  const { push } = useHistory();

  return (
    <Header style={{ display: "flex", justifyContent: "space-between" }}>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item onClick={() => push("/products", { type: "tops" })} key="1">
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
        <Search
          placeholder="input search text"
          // onSearch={onSearch}
          enterButton
        />
        <Button type="text">
          <ShoppingCartOutlined style={{ color: "#FFFFFF", fontSize: 24 }} />
        </Button>
      </div>
    </Header>
  );
};
