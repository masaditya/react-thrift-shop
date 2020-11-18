import React from "react";
import { Layout, Menu } from "antd";
import { SkinOutlined, ContainerOutlined } from "@ant-design/icons";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { Transaksi } from "./Transaksi";
import { Inventory } from "./Inventory";

export const AdminLayout = () => {
  const { Header, Content, Footer, Sider } = Layout;
  const { push } = useHistory();

  return (
    <Layout>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "20px",
          }}
        >
          <b style={{ color: "#FFFFFF" }}> MICHI MICHI ID </b>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            onClick={() => {
              push("/admin");
            }}
            key="1"
            icon={<ContainerOutlined />}
          >
            Transaksi
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              push("/admin/inven");
            }}
            key="2"
            icon={<SkinOutlined />}
          >
            Inventory
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, textAlign: "center" }}
          >
            <Switch>
              <Route exact path="/admin">
                <Transaksi />
              </Route>
              <Route exact path="/admin/inven">
                <Inventory />
              </Route>
              <Redirect to="/admin" />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
