import React, { useCallback, useEffect, useState } from "react";
import { Col, Divider, Row } from "antd";
import { ShopOutlined, ShoppingOutlined, TagOutlined } from "@ant-design/icons";
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
      console.log(response);
      if (response.data) {
        setProducts(response.data);
        fillSegmentProduct(response.data);
      }
    } catch (error) {
      console.log(error);
      console.log(products);
    }
  }, [products]);

  const fillSegmentProduct = useCallback(
    (data: TProduct[]) => {
      setHotProduct(data.slice(0, 4));
      let fwomenProduct: TProduct[] = data.filter((value: TProduct) => {
        return value.gender === true;
      });
      setWomenProduct(fwomenProduct);
      setHomeWomen(fwomenProduct.slice(0, 3));
      let fmenProduct: TProduct[] = data.filter((value: TProduct) => {
        return value.gender !== true;
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
    }
  }, []);

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
      <div className="mv-4">
        <Divider orientation="left">Hot Products</Divider>
        <Row style={{ marginTop: 50 }} justify="space-around">
          {hotProduct.map((item: TProduct) => {
            return (
              <Col span={6} key={item.id_product}>
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
              <Col span={6} key={item.id_product}>
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
              <Col span={6} key={item.id_product}>
                <Product {...item} />
              </Col>
            );
          })}
        </Row>
      </div>
      <Row className="mv-4" justify="space-around">
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
    </div>
  );
};
