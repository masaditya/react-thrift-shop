import React from "react";
import { Table, Tag, Space, Button } from "antd";
export const Transaksi = () => {
  const columns = [
    {
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
      key: "alamat",
    },
    {
      title: "Kota",
      dataIndex: "kota",
      key: "kota",
    },
    {
      title: "Kecamatan",
      dataIndex: "kecamatan",
      key: "kecamatan",
    },
    {
      title: "Kode Pos",
      dataIndex: "kode_pos",
      key: "kode_pos",
    },
    {
      title: "Telepon",
      dataIndex: "no_telepon",
      key: "no_telepon",
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
      dataIndex: "harga",
      key: "harga",
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

  const data = [
    {
      key: "1",
      nama: "John Brown",
      kode_pos: 32,
      alamat: "New York No. 1 Lake Park",
      kota: "malang",
      tags: ["nice", "developer"],
      kecamatan: "lowokwaru",
      no_telepon: "085231235112",
      email: "email@mail.com",
      barang: "banyak",
      notes: "adadeh",
      harga: 5000,
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};
