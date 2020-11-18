import React, { useCallback, useEffect } from "react";
import { Card, Col, Layout, Menu, Row } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { LaptopOutlined, UserOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useProductStore } from "../../../lib/store";
import { TProduct } from "../../../types";
import { Product } from "../../../components/product";
import { useProductService } from "../../../lib/hook/service";

export const ProductList = () => {
  const { getProducts } = useProductService();
  const { products, womenProduct, menProduct, setProducts } = useProductStore(
    (state) => state
  );

  const getProductCall = useCallback(async () => {
    try {
      let response = await getProducts();
      console.log(response);
      if (response.data) {
        setProducts(response.data);
      }
    } catch (error) {
      console.log(error);
      console.log(products);
    }
  }, []);

  useEffect(() => {
    if (products === undefined || products.length == 0) getProductCall();
    return () => {};
  }, []);

  const { Sider, Content } = Layout;
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
          {products.map((item: TProduct) => {
            return (
              <div className="mv-2" key={item.id_product}>
                <Product {...item} />
              </div>
            );
          })}
        </Row>
      </Content>
    </Layout>
  );
};
