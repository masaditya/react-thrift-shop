import {
  Button,
  Col,
  Divider,
  Image,
  List,
  message,
  Row,
  Skeleton,
  Space,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../../components/product";
import { useProductService } from "../../../lib/hook/service";
import { useCartStore, useProductStore } from "../../../lib/store";
import { currencyString } from "../../../lib/utils";
import { TProduct } from "../../../types";

export const DetailProduct = () => {
  const [recomended, setRecomended] = useState<TProduct[]>([]);
  const [showCase, setShowCase] = useState<TProduct>();
  const { products } = useProductStore((state) => state);
  const { addCart } = useCartStore((state) => state);

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
    else setRecomended(products.slice(2, 6));
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

  const addToCart = useCallback(
    (product: TProduct) => {
      addCart(product);
      message.success(`${product.product_name} has added to cart!`);
    },
    [showCase]
  );

  return (
    <div className="p-4">
      <Row align="middle">
        <Col lg={8} md={8}>
          {showCase ? (
            <Image
              src={showCase?.product_image}
              alt="product image"
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "contain",
              }}
            />
          ) : (
            <Skeleton.Image />
          )}
        </Col>
        <Col xs={24} md={16} className="px-2">
          {showCase ? (
            <>
              {" "}
              <h1>{showCase?.product_name}</h1>
              <h3> {currencyString(showCase?.prize)} </h3>
              <p style={{ wordWrap: "break-word" }}>
                {showCase?.product_description}
              </p>
              <Button
                onClick={() => {
                  addToCart(showCase);
                }}
                type="primary"
              >
                Add To Cart
              </Button>{" "}
            </>
          ) : (
            <Skeleton paragraph={{ rows: 6 }} />
          )}
        </Col>
      </Row>

      <div className="mv-4">
        <Divider orientation="left">Hot Products</Divider>
        <Row style={{ marginTop: 50 }} justify="space-around">
          {recomended.map((item: TProduct) => {
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
    </div>
  );
};
