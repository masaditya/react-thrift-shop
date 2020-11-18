import { Button, Col, Divider, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Product } from "../../../components/product";
import { useProductService } from "../../../lib/hook/service";
import { useProductStore } from "../../../lib/store";
import { currencyString } from "../../../lib/utils";
import { TProduct } from "../../../types";

export const DetailProduct = () => {
  const [recomended, setRecomended] = useState<TProduct[]>([]);
  const [showCase, setShowCase] = useState<TProduct>();
  const { products } = useProductStore((state) => state);
  const params = useParams<{ id: string }>();
  const { findProduct, getProducts } = useProductService();

  const getProductCall = useCallback(async () => {
    try {
      let response = await getProducts();
      console.log(response);
      if (response.data) {
        setRecomended(response.data.slice(2, 6));
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

  useEffect(() => {
    let tmp = products.find((item: TProduct) => item.id_product === params.id);
    if (!tmp) {
      getShowcase();
    } else {
      setShowCase(tmp);
    }
  }, [params]);

  const getShowcase = useCallback(async () => {
    try {
      let response = await findProduct(params.id);
      console.log(response);
      if (response.data) {
        setShowCase(response.data);
      }
    } catch (error) {
      console.log(error);
      console.log(products);
    }
  }, [params]);

  return (
    <div className="p-4">
      <Row align="middle">
        <Col span={8}>
          <img
            src={showCase?.product_image}
            alt="product image"
            style={{
              width: "100%",
              maxHeight: "400px",
              objectFit: "contain",
            }}
          />
        </Col>
        <Col span={16} className="p-4">
          <h1>{showCase?.product_name}</h1>
          <h3> {currencyString(showCase?.prize)} </h3>
          <p style={{ wordWrap: "break-word" }}>
            {showCase?.product_description}
          </p>
          <Button type="primary"> Add To Cart </Button>
        </Col>
      </Row>

      <div className="mv-4">
        <Divider orientation="left">Hot Products</Divider>
        <Row style={{ marginTop: 50 }} justify="space-around">
          {recomended.map((item: TProduct) => {
            return (
              <Col span={6} key={item.id_product}>
                <Product {...item} />
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};
