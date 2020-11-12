import React from "react";
import { Card, Col, Layout, Menu, Row, Typography } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { LaptopOutlined, UserOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

export const ProductList = () => {
  const { Header, Footer, Sider, Content } = Layout;
  const { Meta } = Card;
  const { location } = useHistory();
  console.log(location.state);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
          <Menu.Item style={{ fontWeight: "bold" }}> Filter </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Type">
            <Menu.Item key="1">Tops</Menu.Item>
            <Menu.Item key="2">Bottoms</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="Sex">
            <Menu.Item key="5">Male</Menu.Item>
            <Menu.Item key="5">Female</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Content>
        <Row style={{ marginTop: 50 }} justify="space-around">
          <Col span={8}>
            <Card
              hoverable
              style={{ width: 240, margin: "auto" }}
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              style={{ width: 240, margin: "auto" }}
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              style={{ width: 240, margin: "auto" }}
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: 50 }} justify="space-around">
          <Col span={8}>
            <Card
              hoverable
              style={{ width: 240, margin: "auto" }}
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              style={{ width: 240, margin: "auto" }}
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              style={{ width: 240, margin: "auto" }}
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
