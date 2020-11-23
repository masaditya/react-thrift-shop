import { ContainerOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Result,
  Row,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useTransactionService } from "../../../lib/hook/service";
import { useCartStore } from "../../../lib/store";
import { currencyString } from "../../../lib/utils";
import { TTranscationPost } from "../../../types";
import emailjs from "emailjs-com";
import { useHistory } from "react-router-dom";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
};
export const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const { productCart, emptyCart } = useCartStore((state) => state);
  const [total, setTotal] = useState(0);
  const { postTransaction } = useTransactionService();
  const { push } = useHistory();
  const [isSuccessCheckout, setIsSuccessCheckout] = useState(false);

  const onFinish = useCallback(
    async (value: TTranscationPost) => {
      setLoading(true);
      const data: TTranscationPost = {
        ...value,
        cart: productCart,
        status: false,
        prize: countGrandPrize(total, 0),
      };
      try {
        let response = await postTransaction(data);
        if (response) await sendEmail(data);
        setIsSuccessCheckout(true);
        emptyCart();
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    },
    [total]
  );

  useEffect(() => {
    productCart.forEach((item) => {
      setTotal(total + item.prize);
    });
  }, []);

  const countGrandPrize = (tot: number, gp: number): number => {
    return tot + gp + 20000;
  };

  const sendEmail = useCallback(async (data: TTranscationPost) => {
    const maildata = {
      ...data,
      prize: "65000",
      product_name: data.cart[0].product_name,
      product_prize: data.cart[0].prize,
    };

    try {
      let response = await emailjs.send(
        "service_kij5kx5",
        "template_02i1fzc",
        maildata,
        "user_sYf18yxIGrfZK4FOuEUjN"
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="px-4">
      {!isSuccessCheckout ? (
        <>
          <Divider className="py-2">Checkout</Divider>
          <Form
            {...layout}
            name="checkout-form"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Row>
              <Col lg={12} className="px-2">
                <Form.Item
                  name={["name"]}
                  label="Full Name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["address"]}
                  label="Address"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["district"]}
                  label="District"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["city"]}
                  label="City"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["province"]}
                  label="Province"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["postal"]}
                  label="Postal Code"
                  rules={[{ required: true }]}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  name={["email"]}
                  label="Email"
                  rules={[{ type: "email", required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["phone"]}
                  label="Phone"
                  rules={[{ required: true }]}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  name={["notes"]}
                  label="Notes"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item></Form.Item>
              </Col>
              <Col lg={12}>
                <Form.Item
                  name="shipping_method"
                  label="Shipping Method"
                  rules={[
                    { required: true, message: "Please pick shipping method" },
                  ]}
                  initialValue="JNE"
                >
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="JNE">JNE</Radio.Button>
                    <Radio.Button value="J&T">J&T</Radio.Button>
                    <Radio.Button value="POS">POS</Radio.Button>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="payment_method"
                  label="Payment Method"
                  rules={[
                    { required: true, message: "Please pick payment method" },
                  ]}
                  initialValue="BCA"
                >
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="BCA">BCA</Radio.Button>
                    <Radio.Button disabled value="Mandiri">
                      Mandiri
                    </Radio.Button>
                    <Radio.Button disabled value="BRI">
                      BRI
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>

                <Card
                  size="small"
                  title="Billing Information"
                  style={{ width: "100%" }}
                >
                  <Row justify="space-between">
                    <p>Total</p>
                    <b> {currencyString(total)} </b>
                  </Row>
                  <Row justify="space-between">
                    <p>Shipping</p>
                    <b> {currencyString(20000)} </b>
                  </Row>
                  <Row justify="space-between">
                    <p>Discount</p>
                    <b> {currencyString(5000)} </b>
                  </Row>
                  <Row justify="space-between">
                    <p>Grand Prize</p>
                    <b> {currencyString(total + 20000 - 5000)} </b>
                  </Row>
                </Card>
                <Form.Item
                  wrapperCol={{ lg: 12, offset: 0, xs: 24 }}
                  className="mv-2"
                >
                  <Button
                    icon={<ContainerOutlined />}
                    loading={loading}
                    size="large"
                    type="primary"
                    block
                    htmlType="submit"
                  >
                    Create Order
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </>
      ) : (
        <Result
          status="success"
          title="Successfully Create Order!"
          subTitle="Order number: 2017182818828182881 Please Check your Email to Complete your order"
          extra={[
            <Button type="primary" href="https://mail.google.com/">
              Go To Mail
            </Button>,
            <Button onClick={() => push("/")} key="buy">
              Buy Again
            </Button>,
          ]}
        />
      )}
    </div>
  );
};