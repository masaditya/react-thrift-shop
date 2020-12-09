import React, { useCallback, useEffect, useState } from "react";
import { Table, Space, Button, message, notification, Tag, Image } from "antd";
import { useTransactionService } from "../../../lib/hook/service";
import { TProduct, TTransaction } from "../../../types";
import { CheckOutlined } from "@ant-design/icons";
export const Transaksi = () => {
  const { getTransaction, doneTransaction } = useTransactionService();

  const [transactionData, setTransactionData] = useState<TTransaction[]>([]);

  useEffect(() => {
    getListTransaction();
    return () => {};
  }, []);

  const getListTransaction = useCallback(async () => {
    try {
      const response = await getTransaction();
      if (response) setTransactionData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // const handleDoneTransaction = useCallback(async (data: TTransaction) => {
  //   try {
  //     const response = await doneTransaction(data.id);
  //     if (response) {
  //       console.log(response.data);
  //       let tmpID = transactionData.findIndex(
  //         (item: TTransaction) => item.id === data.id
  //       );
  //       let tmp = [...transactionData];
  //       tmp[tmpID].status = true;
  //       setTransactionData(tmp);
  //       notification.success({
  //         message: "Update Data Successfully",
  //         description: `Transaksi atas nama ${data.name} telah selesai`,
  //       });
  //     }
  //   } catch (error) {}
  // }, []);

  const columns = [
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
      width: 100,
      fixed: "left",
      render: (text: string) => <b>{text}</b>,
    },
    {
      title: "Kota",
      dataIndex: "city",
      key: "city",
      width: 150,
      fixed: "left",
    },
    {
      title: "Alamat",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Kecamatan",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "Kode Pos",
      dataIndex: "postal",
      key: "postal",
      width: 100,
    },
    {
      title: "Telepon",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Barang",
      dataIndex: "cart",
      key: "barang",
      width: 200,
      render: (cart: TProduct[], record: any) => {
        return (
          <>
            {cart.map((item, i) => {
              return <b key={i}> {item.product_name} </b>;
            })}
          </>
        );
      },
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Harga",
      dataIndex: "prize",
      key: "prize",
    },
    {
      title: "Bukti Pembayaran",
      dataIndex: "payment_image",
      key: "payment_image",
      render: (trans: string) => (
        <>
          {console.log(trans)}
          <Image width={100} src={trans} />
        </>
      ),
    },
    {
      title: "Status",
      key: "status",
      width: 150,
      fixed: "right",
      render: (trans: TTransaction, record: any) => (
        <>
          {trans.status ? (
            <Tag color="green">Completed</Tag>
          ) : (
            <Tag color="red">Unpaid</Tag>
          )}
        </>
      ),
    },
  ];

  return (
    <Table
      // @ts-ignore
      columns={columns}
      rowKey={(record: TTransaction) => {
        return record.id;
      }}
      dataSource={transactionData}
      scroll={{ x: 1500, y: 500 }}
      bordered
    />
    // <></>
  );
};
