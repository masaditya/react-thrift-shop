import React, { useCallback, useEffect, useState } from "react";
import { Card, Col, Divider, Layout, Row } from "antd";
import { ShopOutlined, ShoppingOutlined, TagOutlined } from "@ant-design/icons";
import { useProductService } from "../../../lib/hook/service";
import Slider from "react-slick";
import { TProduct } from "../../../types";
import { Banner } from "../../../components/banner";
import { Product } from "../../../components/product";

export const Home = () => {
  const { getProducts } = useProductService();
  const [products, setProducts] = useState<TProduct[]>([]);
  const { Meta } = Card;
  const { Footer } = Layout;

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const getProductCall = useCallback(async () => {
    try {
      let response = await getProducts();
      console.log(response);
      if (response.data) setProducts(response.data);
    } catch (error) {
      console.log(error);
      console.log(products);
    }
  }, []);

  useEffect(() => {
    getProductCall();
  }, [getProductCall]);

  return (
    <div>
      <Slider {...settings}>
        <div>
          <Banner image="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
        </div>
        <div>
          <Banner image="https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
        </div>
        <div>
          <Banner image="https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
        </div>
        <div>
          <Banner image="https://images.unsplash.com/photo-1556740714-a8395b3bf30f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
        </div>
      </Slider>
      <Divider orientation="left">Pakaian Wanita</Divider>
      <div style={{ padding: "20x" }}>
        <Slider
          arrows={false}
          infinite={true}
          slidesToScroll={1}
          slidesToShow={3}
        >
          {products.map((item: TProduct, index: number) => {
            return (
              <Col span={8} key={index}>
                <Product {...item} />
              </Col>
            );
          })}
        </Slider>
      </div>
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
