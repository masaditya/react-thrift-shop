import { Card } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import { currencyString } from "../../lib/utils";
import { TProduct } from "../../types";

export const Product = (props: TProduct) => {
  const { push } = useHistory();
  const { Meta } = Card;
  return (
    <Card
      onClick={() => push("/products/" + props.id_product)}
      hoverable
      style={{ width: 300, margin: "auto" }}
      cover={
        <img
          alt="example"
          style={{ width: "100%", objectFit: "cover", height: "337px" }}
          src={props.product_image}
        />
      }
    >
      <Meta
        title={props.product_name}
        description={currencyString(props.prize)}
      />
    </Card>
  );
};
