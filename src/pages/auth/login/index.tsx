import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Card, message, Layout } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import * as cryp from "crypto";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const { push } = useHistory();

  const onFinish = (values: { username: string; password: string }) => {
    setLoading(true);
    setTimeout(() => {
      if (values.username === "admin" && values.password === "admin") {
        let token = cryp.randomBytes(20).toString("hex");
        localStorage.setItem("token", token);
        message.info("welcome admin !");
        push("/admin");
      } else {
        message.info("invalid credentials!");
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <Layout>
      <Row
        className="site-layout-background"
        style={{ minHeight: "100vh" }}
        align="middle"
        justify="center"
      >
        <Col xs={24} md={12} lg={6}>
          <Card title="Login Form">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
