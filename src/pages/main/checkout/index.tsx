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
  Row,
} from "antd";
import React from "react";
import { currencyString } from "../../../lib/utils";

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
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <div className="px-4">
      <Divider className="py-2">Checkout</Divider>
      <Form
        {...layout}
        name="nest-messages"
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
              rules={[{ type: "number", required: true }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name={["email"]}
              label="Email"
              rules={[{ type: "email", required: true }]}
            >
              <Input />
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
            >
              <Radio.Group defaultValue="jne" buttonStyle="solid">
                <Radio.Button value="jne">JNE</Radio.Button>
                <Radio.Button value="jnt">JNT</Radio.Button>
                <Radio.Button value="pos">POS</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="payment_method"
              label="Payment Method"
              rules={[
                { required: true, message: "Please pick payment method" },
              ]}
            >
              <Radio.Group defaultValue="BCA" buttonStyle="solid">
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
                <b> {currencyString(200000)} </b>
              </Row>
              <Row justify="space-between">
                <p>Discount</p>
                <b> {currencyString(12000)} </b>
              </Row>
              <Row justify="space-between">
                <p>Grand Prize</p>
                <b> {currencyString(188000)} </b>
              </Row>
            </Card>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }} className="mv-2">
              <Button
                icon={<ContainerOutlined />}
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
    </div>
  );
};
