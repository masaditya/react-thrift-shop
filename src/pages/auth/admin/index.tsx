import React, { useEffect } from "react";
import { BackTop, Button, Layout, Menu } from "antd";
import {
  SkinOutlined,
  ContainerOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { Transaksi } from "./Transaksi";
import { Inventory } from "./Inventory";

export const AdminLayout = () => {
  const { Content, Sider } = Layout;
  const { push } = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      push("/login");
    }
    return () => {};
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <BackTop>
        <Button type="primary" shape="circle">
          <ArrowUpOutlined />
        </Button>
      </BackTop>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "20px",
          }}
          onClick={() => push("/")}
        >
          <b style={{ color: "#FFFFFF" }}> MICHI MICHI ID </b>
        </div>
        <Menu theme="dark" mode="inline">
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
          <Menu.Item
            onClick={() => {
              localStorage.removeItem("token");
              push("/login");
            }}
            key="3"
          >
            <Button type="link">Logout</Button>
          </Menu.Item>
        </Menu>
      </Sider>
      <Content>
        <div className="site-layout-background" style={{ padding: 24 }}>
          <Switch>
            <Route exact path="/admin/transaksi">
              <Transaksi />
            </Route>
            <Route exact path="/admin/inven">
              <Inventory />
            </Route>
            <Redirect to="/admin/transaksi" />
          </Switch>
        </div>
      </Content>
    </Layout>
  );
};
