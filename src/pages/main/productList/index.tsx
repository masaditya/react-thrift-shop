import React, { useCallback, useEffect, useState } from "react";
import { BackTop, Button, Layout, Menu, Radio, Row } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { ArrowUpOutlined, SkinOutlined, UserOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useProductStore } from "../../../lib/store";
import { TProduct } from "../../../types";
import { Product } from "../../../components/product";
import { useProductService } from "../../../lib/hook/service";

export const ProductList = () => {
  const { getProducts } = useProductService();
  const [sexFilter, setSexFilter] = useState();
  const [typeFilter, setTypeFilter] = useState();
  const { products, womenProduct, menProduct, setProducts } = useProductStore(
    (state) => state
  );
  const { Sider, Content } = Layout;

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

  const applyTypeFilter = useCallback((e: any) => {
    console.log(e);
    setTypeFilter(e.target.value);
  }, []);

  const applySexFilter = useCallback((e: any) => {
    console.log(e);
    setSexFilter(e.target.value);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <BackTop>
        <Button type="primary" shape="circle">
          <ArrowUpOutlined />
        </Button>
      </BackTop>
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
          <Menu.Item style={{ fontWeight: "bold" }}> Filter </Menu.Item>
          <SubMenu key="sub1" icon={<SkinOutlined />} title="Type">
            <Radio.Group onChange={applyTypeFilter} value={typeFilter || ""}>
              <Radio value="tops" className="px-2 mv-1">
                Tops
              </Radio>
              <Radio value="bottoms" className="px-2 mv-1">
                Bottoms
              </Radio>
            </Radio.Group>
          </SubMenu>
          <SubMenu key="sub2" icon={<UserOutlined />} title="Sex">
            <Radio.Group onChange={applySexFilter} value={sexFilter || ""}>
              <Radio value="male" className="px-2 mv-1">
                Male
              </Radio>
              <Radio value="female" className="px-2 mv-1">
                Female
              </Radio>
            </Radio.Group>
          </SubMenu>
        </Menu>
      </Sider>
      <Content>
        <Row style={{ marginTop: 50 }} justify="space-around">
          {products.map((item: TProduct) => {
            return (
              <div className="mb-2" key={item.id_product}>
                <Product {...item} />
              </div>
            );
          })}
        </Row>
      </Content>
    </Layout>
  );
};
