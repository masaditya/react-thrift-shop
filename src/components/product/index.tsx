import { Card } from "antd";
import React from "react";
import { TProduct } from "../../types";

export const Product = (props: TProduct) => {
  const { Meta } = Card;
  return (
    <Card
      hoverable
      style={{ width: 240, margin: "auto"    }}
      cover={<img alt="example" src={props.product_image} />}
    >
      <Meta
        title={props.product_name}
        description={props.product_description}
      />
    </Card>
  );
};
