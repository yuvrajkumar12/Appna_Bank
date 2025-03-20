import React from "react";
import { Table } from "antd"; // ✅ Import Table from Ant Design

function TransactionsTable({ transactions }) { // ✅ Use object destructuring
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: "Amount",
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: "Tag",
          dataIndex: "tag",
          key: "tag",
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
    ];

    return <Table dataSource={transactions} columns={columns} />; // ✅ Use transactions, not TransactionsTable
}

export default TransactionsTable;
