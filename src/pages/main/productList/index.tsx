import React, { useCallback, useEffect, useState } from "react";
import { BackTop, Button, Layout, Menu, Radio, Row, Space } from "antd";
import { ArrowUpOutlined, SkinOutlined, UserOutlined } from "@ant-design/icons";
import { useProductStore } from "../../../lib/store";
import { TProduct } from "../../../types";
import { Product } from "../../../components/product";
import { useProductService } from "../../../lib/hook/service";

export const ProductList = () => {
  const { getProducts } = useProductService();
  const [sexFilter, setSexFilter] = useState();
  const [typeFilter, setTypeFilter] = useState();
  const { products, setProducts } = useProductStore((state) => state);
  const [showedProducts, setShowedProducts] = useState<TProduct[]>(products);

  const { Sider, Content } = Layout;

  const getProductCall = useCallback(async () => {
    try {
      let response = await getProducts();
      console.log(response);
      if (response.data) {
        setProducts(response.data);
        setShowedProducts(response.data);
      }
    } catch (error) {
      console.log(error);
      console.log(products);
    }
  }, []);

  useEffect(() => {
    if (products === undefined || products.length == 0) {
      getProductCall();
    } else {
      setShowedProducts(products);
    }
  }, []);

  const applyTypeFilter = useCallback(
    (e: any) => {
      console.log(e);
      setTypeFilter(e.target.value);
      let tmp: TProduct[];
      if (sexFilter) {
        tmp = products.filter((item) => {
          return item.category === e.target.value && item.gender === sexFilter;
        });
      } else {
        tmp = products.filter((item) => {
          return item.category === e.target.value;
        });
      }
      setShowedProducts(tmp);
    },
    [showedProducts]
  );

  const applySexFilter = useCallback(
    (e: any) => {
      console.log(e);
      setSexFilter(e.target.value);
      let tmp: TProduct[];
      if (typeFilter) {
        tmp = products.filter((item) => {
          return item.gender === e.target.value && item.category === typeFilter;
        });
      } else {
        tmp = products.filter((item) => {
          return item.gender === e.target.value;
        });
      }
      setShowedProducts(tmp);
    },
    [showedProducts]
  );

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
          <Menu.Item disabled style={{ fontWeight: "bold" }}>
            Filter
          </Menu.Item>
          <Menu.SubMenu key="sub1" icon={<SkinOutlined />} title="Type">
            <Radio.Group onChange={applyTypeFilter} value={typeFilter || ""}>
              <Radio value="tops" className="px-2 mv-1">
                Tops
              </Radio>
              <Radio value="bottoms" className="px-2 mv-1">
                Bottoms
              </Radio>
            </Radio.Group>
          </Menu.SubMenu>
          <Menu.SubMenu key="sub2" icon={<UserOutlined />} title="Sex">
            <Radio.Group onChange={applySexFilter} value={sexFilter || ""}>
              <Radio value="male" className="px-2 mv-1">
                Male
              </Radio>
              <Radio value="female" className="px-2 mv-1">
                Female
              </Radio>
            </Radio.Group>
          </Menu.SubMenu>
          <Menu.Item
            onClick={() => {
              setSexFilter(undefined);
              setTypeFilter(undefined);
              setShowedProducts(products);
            }}
            active={false}
            style={{ fontSize: "0.8em" }}
          >
            {" "}
            Clear Filter{" "}
          </Menu.Item>
        </Menu>
      </Sider>
      <Content>
        <Row style={{ marginTop: 50 }} justify="space-around">
          {showedProducts.map((item: TProduct) => {
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
