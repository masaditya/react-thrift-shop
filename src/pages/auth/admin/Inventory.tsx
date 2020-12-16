import React, { useCallback, useState } from "react";
import {
  Button,
  Row,
  Col,
  Card,
  notification,
  Popconfirm,
  Divider,
} from "antd";
import { TProduct } from "../../../types";
import { FormProduct } from "./FormProduct";
import { useProductService } from "../../../lib/hook/service";
import { useProductStore } from "../../../lib/store";
import { currencyString } from "../../../lib/utils";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

export const Inventory = () => {
  const { postProduct, updateProduct, deleteProduct } = useProductService();
  const { products, setProducts } = useProductStore();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<TProduct>();

  const onFinish = useCallback(
    async (values: TProduct) => {
      setIsLoading(true);

      try {
        if (values.id_product) {
          let res = await updateProduct(values);
          let tmpID = products.findIndex(
            (item: TProduct) => item.id_product === values.id_product
          );
          let tmp = [...products];
          tmp[tmpID] = { ...values };
          setProducts(tmp);
          notification.success({
            message: "Update Data Successfully",
            description: ``,
          });
        } else {
          let res = await postProduct(values);
          let tmp: TProduct[] = [...products, res.data];
          setProducts(tmp);
          notification.success({
            message: "Add Data Successfully",
            description: ``,
          });
        }
      } catch (error) {
        notification.error({
          message: "Error",
          description: JSON.stringify(error).toString(),
        });
      }

      setIsLoading(false);
      setIsModalVisible(false);
    },
    [products]
  );

  const confirm = useCallback(
    async (data: TProduct) => {
      try {
        let res = await deleteProduct(data.id_product);
        if (res) {
          console.log(res.data);
          let tmp = products.filter(
            (item: TProduct) => item.id_product !== res.data.id_product
          );
          console.log(tmp);
          setProducts(tmp);
          notification.success({
            message: "Delete Data Successfully",
            description: ``,
          });
        }
      } catch (error) {
        notification.error({
          message: "Error",
          description: JSON.stringify(error).toString(),
        });
      }
    },
    [products]
  );

  function cancel(e: any) {
    // message.error("Click on No");
  }

  return (
    <>
      <Divider orientation="right">
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          onClick={() => {
            setUpdateData(undefined);
            setIsModalVisible(true);
          }}
        >
          Add Product
        </Button>
      </Divider>
      <FormProduct
        isVisible={isModalVisible}
        toggleVisible={setIsModalVisible}
        onFinish={onFinish}
        dataToUpdate={updateData}
        isLoading={isLoading}
      />
      <Row justify="center">
        {products.map((item: TProduct) => {
          return (
            <Col key={item.id_product} sm={8} lg={6} className="mb-2">
              <Card
                hoverable
                style={{ width: "100%", margin: "auto", maxWidth: 250 }}
                cover={
                  <img
                    alt="example"
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      height: "337px",
                    }}
                    src={item.product_image}
                  />
                }
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={() => {
                      setIsModalVisible(true);
                      setUpdateData(item);
                    }}
                  />,
                  <Popconfirm
                    title="Are you sure to delete this task?"
                    onConfirm={() => confirm(item)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined />
                  </Popconfirm>,
                ]}
              >
                <Card.Meta
                  title={item.product_name}
                  description={currencyString(item.prize)}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};
