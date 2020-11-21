import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Divider, message, Popconfirm, Result, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useCartStore } from "../../../lib/store";
import { currencyString } from "../../../lib/utils";

export const Cart = () => {
  const { productCart, removeCart } = useCartStore((state) => state);
  const [totalPrize, setTotalPrize] = useState<number>(0);
  const [grandPrize, setGrandPrize] = useState<number>(0);
  console.log(productCart);
  const { push } = useHistory();

  const onDelete = useCallback((id: string) => {
    console.log(id);
    removeCart(id);
    message.success("Product Removed");
  }, []);

  const prizeCounter = useCallback(() => {
    productCart.forEach((item) => {
      setTotalPrize(totalPrize + item.prize);
    });
  }, [productCart]);

  useEffect(() => {
    prizeCounter();
    // if (totalPrize > 0)
  }, [productCart]);

  return (
    <div className="px-4">
      <Divider className="py-2">Cart</Divider>
      {productCart.length > 0 ? (
        <Row>
          <Col lg={16} sm={24}>
            {productCart.map((item) => (
              <Row key={item.id_product} align="middle" className="mb-2">
                <img
                  src={item.product_image}
                  alt="product_image"
                  style={{
                    width: "150px",
                    maxHeight: "150px",
                    objectFit: "contain",
                  }}
                />
                <div className="px-2">
                  <h3> {item.product_name} </h3>
                  <p> {item.prize} </p>
                  <Popconfirm
                    title="Are you sure to delete this product from Cart?"
                    onConfirm={() => onDelete(item.id_product)}
                    onCancel={() => console.log("Cancel")}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="primary" danger icon={<DeleteOutlined />}>
                      Remove Item
                    </Button>
                  </Popconfirm>
                </div>
              </Row>
            ))}
          </Col>
          <Col lg={8} sm={24}>
            <Row justify="space-between">
              <p>Total</p>
              <b> {currencyString(totalPrize)} </b>
            </Row>
            <Row justify="space-between">
              <p>Discount</p>
              <b> {currencyString(2000)} </b>
            </Row>
            <Row justify="space-between">
              <p>Grand Prize</p>
              <b> {currencyString(grandPrize)} </b>
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
              Continoue Shoping
            </Button>
          }
        />
      )}
    </div>
  );
};
