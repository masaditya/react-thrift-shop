import React from "react";
import { Card, Carousel, Col, Divider, Image, Layout, Row } from "antd";
import { ShopOutlined, ShoppingOutlined, TagOutlined } from "@ant-design/icons";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  background: "#364d79",
};

export const Home = () => {
  const { Meta } = Card;
  const { Footer } = Layout;
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)`,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "50vh",
        }}
      ></div>
      <Divider orientation="left">Pakaian Wanita</Divider>
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
            <Meta title="Europe Street beat" description="www.instagram.com" />
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
            <Meta title="Europe Street beat" description="www.instagram.com" />
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
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
      </Row>
      <Divider orientation="left">Pakaian Pria</Divider>
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
            <Meta title="Europe Street beat" description="www.instagram.com" />
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
            <Meta title="Europe Street beat" description="www.instagram.com" />
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
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
      </Row>
      <Row style={{ margin: 50 }} justify="space-around">
        <Col span={6} style={{ textAlign: "center" }}>
          <ShoppingOutlined style={{ fontSize: 100, margin: "auto" }} />
        </Col>
        <Col span={6} style={{ textAlign: "center" }}>
          <TagOutlined style={{ fontSize: 100, margin: "auto" }} />
        </Col>
        <Col span={6} style={{ textAlign: "center" }}>
          <ShopOutlined style={{ fontSize: 100, margin: "auto" }} />
        </Col>
        <Col span={6} style={{ textAlign: "center" }}>
          <ShoppingOutlined style={{ fontSize: 100, margin: "auto" }} />
        </Col>
      </Row>
      <Footer>Footer</Footer>
    </div>
  );
};
