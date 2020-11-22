import React, { useCallback, useEffect, useState } from "react";
import { Table, Space, Button } from "antd";
import { useTransactionService } from "../../../lib/hook/service";
export const Transaksi = () => {
  const { getTransaction } = useTransactionService();

  const [transactionData, setTransactionData] = useState([]);

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

  const columns = [
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Alamat",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Kota",
      dataIndex: "city",
      key: "city",
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
      dataIndex: "barang",
      key: "barang",
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
      title: "Action",
      key: "action",
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button>Selesai</Button>
        </Space>
      ),
    },
  ];

  // const data = [
  //   {
  //     key: "1",
  //     nama: "John Brown",
  //     kode_pos: 32,
  //     alamat: "New York No. 1 Lake Park",
  //     kota: "malang",
  //     tags: ["nice", "developer"],
  //     kecamatan: "lowokwaru",
  //     no_telepon: "085231235112",
  //     email: "email@mail.com",
  //     barang: "banyak",
  //     notes: "adadeh",
  //     harga: 5000,
  //   },
  // ];
  return <Table columns={columns} dataSource={transactionData} />;
};
