import React, { useCallback, useEffect, useState } from "react";
import { BackTop, Button, Col, Divider, Row } from "antd";
import {
  ArrowUpOutlined,
  ShopOutlined,
  ShoppingOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { useProductService } from "../../../lib/hook/service";
import Slider from "react-slick";
import { TProduct } from "../../../types";
import { Banner } from "../../../components/banner";
import { Product } from "../../../components/product";
import { useProductStore } from "../../../lib/store";

export const Home = () => {
  const { getProducts } = useProductService();
  const [hotProduct, setHotProduct] = useState<TProduct[]>([]);
  const [homeWomen, setHomeWomen] = useState<TProduct[]>([]);
  const [homeMen, setHomeMen] = useState<TProduct[]>([]);
  const {
    setProducts,
    products,
    setWomenProduct,
    setMenProduct,
  } = useProductStore((state) => state);

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
      if (response.data) {
        setProducts(response.data);
        fillSegmentProduct(response.data);
      }
    } catch (error) {
    }
  }, [products]);

  const fillSegmentProduct = useCallback(
    (data: TProduct[]) => {
      setHotProduct(data.slice(0, 4));
      let fwomenProduct: TProduct[] = data.filter((value: TProduct) => {
        return value.gender === "female";
      });
      setWomenProduct(fwomenProduct);
      setHomeWomen(fwomenProduct.slice(0, 3));
      let fmenProduct: TProduct[] = data.filter((value: TProduct) => {
        return value.gender === "male";
      });
      setMenProduct(fmenProduct);
      setHomeMen(fmenProduct.slice(0, 3));
    },
    [products]
  );

  useEffect(() => {
    if (products.length <= 0) getProductCall();
    else {
      fillSegmentProduct(products);
      getProductCall();
    }
  }, []);

  return (
    <div>
      <BackTop>
        <Button size="large" type="primary" shape="circle">
          <ArrowUpOutlined />
        </Button>
      </BackTop>
      <Slider {...settings}>
        <div>
          <Banner
            text="Selamat Datang!"
            subtitle="Michimichi.id est. 2020"
            image="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
          />
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
      <div className="mv-4">
        <Divider orientation="left">Hot Products</Divider>
        <Row style={{ marginTop: 50 }} justify="space-around">
          {hotProduct.map((item: TProduct) => {
            return (
              <Col
                className="mv-2"
                lg={6}
                xs={24}
                md={12}
                key={item.id_product}
              >
                <Product {...item} />
              </Col>
            );
          })}
        </Row>
      </div>
      <div className="mv-4">
        <Divider orientation="left">Pakaian Wanita</Divider>
        <Row style={{ marginTop: 50 }} justify="space-around">
          {homeWomen.map((item: TProduct) => {
            return (
              <Col
                className="mv-2"
                lg={6}
                xs={24}
                md={12}
                key={item.id_product}
              >
                <Product {...item} />
              </Col>
            );
          })}
        </Row>
      </div>
      <div className="mv-4">
        <Divider orientation="left">Pakaian Pria</Divider>
        <Row style={{ marginTop: 50 }} justify="space-around">
          {homeMen.map((item: TProduct) => {
            return (
              <Col
                className="mv-2"
                lg={6}
                xs={24}
                md={12}
                key={item.id_product}
              >
                <Product {...item} />
              </Col>
            );
          })}
        </Row>
      </div>
      <Row className="mv-4" justify="space-around">
        <Col className="mv-2" lg={6} xs={12} style={{ textAlign: "center" }}>
          <ShoppingOutlined style={{ fontSize: 100, margin: "auto" }} />
        </Col>
        <Col className="mv-2" lg={6} xs={12} style={{ textAlign: "center" }}>
          <TagOutlined style={{ fontSize: 100, margin: "auto" }} />
        </Col>
        <Col className="mv-2" lg={6} xs={12} style={{ textAlign: "center" }}>
          <ShopOutlined style={{ fontSize: 100, margin: "auto" }} />
        </Col>
        <Col className="mv-2" lg={6} xs={12} style={{ textAlign: "center" }}>
          <ShoppingOutlined style={{ fontSize: 100, margin: "auto" }} />
        </Col>
      </Row>
    </div>
  );
};
