import {
  FacebookFilled,
  InstagramFilled,
  TwitterCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Layout, Row } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

export const Footerzz = () => {
  const { Footer } = Layout;
  const { push } = useHistory();
  return (
    <Footer>
      <Row>
        <Col sm={24} lg={12}>
          <p>Jl. Alamat Lengkap no 69</p>
          <p>Daerah - Surabaya</p>
          <p>Telp. 08569694646</p>
          <p>Indonesia</p>
        </Col>
        <Col sm={24} lg={12}>
          <p>
            <TwitterCircleFilled
              style={{ fontSize: 32, paddingRight: "20px" }}
            />{" "}
            Michimichi.id
          </p>
          <p>
            <InstagramFilled style={{ fontSize: 32, paddingRight: "20px" }} />
            Michimichi.id
          </p>
          <p>
            <FacebookFilled style={{ fontSize: 32, paddingRight: "20px" }} />
            Michimichi.id
          </p>
          <p
            onClick={() => {
              push("/admin");
            }}
          >
            <UserOutlined style={{ fontSize: 32, paddingRight: "20px" }} />
            Admin
          </p>
        </Col>
      </Row>
    </Footer>
  );
};
