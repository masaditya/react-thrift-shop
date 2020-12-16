import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Select,
  Modal,
  InputNumber,
  Upload,
  message,
} from "antd";
import Axios, { AxiosRequestConfig } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { TProduct } from "../../../types";

type FormProductProps = {
  isVisible: boolean;
  onFinish: (value: TProduct) => void;
  toggleVisible: (visibility: boolean) => void;
  dataToUpdate?: TProduct;
  isLoading?: boolean;
};

export const FormProduct = (props: FormProductProps) => {
  const [form] = Form.useForm<TProduct>();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, [props.isVisible]);

  const onBeforeUpload = useCallback((file: any) => {
    setLoading(true);
    message.loading("Uploading Image ...");
    const formData = new FormData();
    formData.append("image", file);
    let config: AxiosRequestConfig = {
      method: "post",
      url: process.env.REACT_APP_URL_IMAGE,
      headers: {
        Authorization: process.env.REACT_APP_CLIENT_ID || "",
      },
      data: formData,
    };
    Axios(config)
      .then((res) => {
        message.success("Image Uploaded");
        setImageUrl(res.data.data.link);
        setLoading(false);
      })
      .catch((err) => {
        message.error(err.message);
        setLoading(false);
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

  return (
    <Modal
      visible={props.isVisible}
      title={props.dataToUpdate ? "Update Product" : "Add Product"}
      centered
      footer={null}
      onCancel={() => props.toggleVisible(false)}
    >
      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={(value) =>
          props.onFinish({ ...value, product_image: imageUrl })
        }
        initialValues={props.dataToUpdate}
      >
        <Form.Item name="id_product" label="Product Name" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          name="product_name"
          label="Product Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="prize" label="Prize" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="product_image"
          label="Product Image"
          rules={[{ required: true }]}
        >
          <Upload onChange={handleChange} beforeUpload={onBeforeUpload}>
            <Button
              loading={loading}
              disabled={loading}
              icon={<UploadOutlined />}
            >
              {loading ? "Uploading" : "Upload Product Image"}
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="product_description"
          label="Product Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="tops">Tops</Select.Option>
            <Select.Option value="bottoms">Bottoms</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            disabled={imageUrl === ""}
            loading={props.isLoading}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
