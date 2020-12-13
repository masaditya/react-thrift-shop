import React, { useCallback, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  message,
  Row,
  Upload,
} from "antd";
import { useHistory, useParams } from "react-router-dom";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import Axios, { AxiosRequestConfig } from "axios";
import { useTransactionService } from "../../../lib/hook/service";

export const ConfirmOrder = () => {
  const { doneTransaction } = useTransactionService();
  const { push } = useHistory();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const params = useParams<{ id: string }>();

  const onBeforeUpload = useCallback((file: any) => {
    const formData = new FormData();
    formData.append("image", file);
    let config: AxiosRequestConfig = {
      method: "post",
      url: "https://api.imgur.com/3/image",
      headers: {
        Authorization: "Client-ID 82a000d086b1f1e",
      },
      data: formData,
    };
    Axios(config)
      .then((res) => {
        console.log(res.data.data.link);
        setImageUrl(res.data.data.link);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.message);
      });
    return false;
  }, []);

  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onSubmit = useCallback(async () => {
    setLoading(true);
    try {
      let response = await doneTransaction(params.id, imageUrl);
      if (response) {
        message.success(
          "Bukti Pembayaran telah diupload. Terimakasih sudah Bertransaksi!"
        );
        setLoading(false);
        push("/");
      }
    } catch (error) {
      console.log(error);
      message.error(JSON.stringify(error).toString());
    }
  }, [params.id, imageUrl]);

  return (
    <Layout>
      <Row style={{ minHeight: "100vh" }} align="middle" justify="center">
        <Col xs={24} md={12} lg={6}>
          <Card
            style={{ textAlign: "center" }}
            title={`Confirm Order for #2021${params.id}`}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              beforeUpload={onBeforeUpload}
              onChange={handleChange}
              multiple={false}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
            <Button
              disabled={loading || imageUrl === ""}
              type="primary"
              onClick={onSubmit}
              loading={loading}
              block
            >
              Submit
            </Button>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
