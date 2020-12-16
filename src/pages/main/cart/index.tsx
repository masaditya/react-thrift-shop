import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Divider, message, Popconfirm, Result, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useCartStore } from "../../../lib/store";
import { currencyString } from "../../../lib/utils";

export const Cart = () => {
  const { productCart, removeCart } = useCartStore((state) => state);
  const [totalPrize, setTotalPrize] = useState<number>(0);

  const { push } = useHistory();

  const onDelete = useCallback((id: string) => {
    removeCart(id);
    message.success("Product Removed");
  }, []);

  const prizeCounter = useCallback(() => {}, []);

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < productCart.length; i++) {
      total = total + productCart[i].prize;
    }
    setTotalPrize(total);
    return () => {
      setTotalPrize(0);
    };
  }, [productCart]);

  return (
    <div className="px-4">
      <Divider className="py-2">Cart</Divider>
      {productCart.length > 0 ? (
        <Row className="py-2" justify="center">
          <Col lg={12} sm={24}>
            {productCart.map((item) => (
              <Row key={item.id_product} align="middle" className="mb-2">
                <Col xs={8}>
                  <img
                    src={item.product_image}
                    alt="product_image"
                    style={{
                      width: "100%",
                      maxHeight: "150px",
                      objectFit: "contain",
                    }}
                  />
                </Col>
                <Col xs={16} className="px-2">
                  <h3> {item.product_name} </h3>
                  <p> {item.prize} </p>
                  <Popconfirm
                    title="Are you sure to delete this product from Cart?"
                    onConfirm={() => onDelete(item.id_product)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="primary" danger icon={<DeleteOutlined />}>
                      Remove Item
                    </Button>
                  </Popconfirm>
                </Col>
              </Row>
            ))}
          </Col>
          <Col lg={8} xs={24}>
            <Row justify="space-between">
              <p>Total</p>
              <b> {currencyString(totalPrize)} </b>
            </Row>
            <Row justify="space-between">
              <p>Discount</p>
              <b> {currencyString(5000)} </b>
            </Row>
            <Row justify="space-between">
              <p>Grand Prize</p>
              <b> {currencyString(totalPrize - 5000)} </b>
            </Row>
            <Button onClick={() => push("/checkout")} block>
              Checkout
            </Button>
          </Col>
        </Row>
      ) : (
        <Result
          status="404"
          title="404"
          subTitle="Sorry, your Cart is empty"
          extra={
            <Button
              onClick={() => {
                push("/products");
              }}
              type="primary"
            >
              Continue Shoping
            </Button>
          }
        />
      )}
    </div>
  );
};
