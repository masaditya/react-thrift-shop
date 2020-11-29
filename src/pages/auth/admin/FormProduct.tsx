import { Button, Form, Input, Select, Modal, InputNumber } from "antd";
import React, { useCallback, useEffect } from "react";
import { TProduct } from "../../../types";

type FormProductProps = {
  isVisible: boolean;
  onFinish: (value: any) => void;
  toggleVisible: (visibility: boolean) => void;
  dataToUpdate?: TProduct;
  isLoading?: boolean;
};

export const FormProduct = (props: FormProductProps) => {
  const [form] = Form.useForm<TProduct>();

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, [props.isVisible]);

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
        onFinish={props.onFinish}
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
          <Input />
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
          <Button loading={props.isLoading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
