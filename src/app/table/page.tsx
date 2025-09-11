"use client";
import React, { useState } from "react";
import Table from "@/component/table/table";

const data = [
  { id: 1, name: "John Doe", age: 28, email: "jonh.doe@gmail.com" },
  { id: 2, name: "Jane Smith", age: 34, email: "jane.smith@gmail.com" },
  { id: 3, name: "Sam Johnson", age: 45, email : "same.johnson@gmail.com" }
];

const manyRows = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    age: Math.floor(Math.random() * 60) + 18,
    email: `user${i + +1}`
}));

const manyColumns = Array.from({ length: 20 }, (_, i) => `Column ${i + 1}`);

export default function TablePage() {
    const [tableData, setTableData] = useState(data);
    
    return (
        <main>
        <h1>User Information</h1>
        <table className="table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
            </tr>
            </thead>
            <tbody>
            {tableData.map((user) => (
                <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <Table
            name="userTable-clickRow"
            data={tableData}
            onClickRow={(e, rowIndex) => {
                alert(`Clicked row ${rowIndex + 1}`);
            }}
        />
        <Table
            name="userTable-clickRow"
            data={tableData}
            title="User Information"
            headerTitles={["ID", "Name", "Age", "Email"]}
            onClickRow={(e, rowIndex) => {
                alert(`Clicked row ${rowIndex + 1}`);
            }}
        />
        <Table
            name="userTable-clickCell"
            data={tableData}
            title="User Information"
            headerTitles={["ID", "Name", "Age", "Email"]}
            onClickCell={(e, rowIndex, columnIndex) => {
                alert(`Clicked cell at row ${rowIndex + 1}, column ${columnIndex + 1}`);
            }}
        />
        <Table
            name="userTable-filterable"
            data={manyColumns.map((col, index) => {
                const row: { [key: string]: string | number } = { id: index + 1 };
                manyColumns.forEach((c, i) => {
                    row[c] = `Data ${index + 1}-${i + 1}`;
                });
                return row;
            })
            }
            filterable="in-hover"
            title="User Information"
            onClickCell={(e, rowIndex, columnIndex) => {
                alert(`Clicked cell at row ${rowIndex + 1}, column ${columnIndex + 1}`);
            }}
        />
        <Table
            name="userTable-sortable"
            data={tableData}
            sortable
            title="User Information"
            headerTitles={["ID", "Name", "GGGA", "Email"]}
            onClickCell={(e, rowIndex, columnIndex) => {
                alert(`Clicked cell at row ${rowIndex + 1}, column ${columnIndex + 1}`);
            }}
        />
        <Table
            name="userTable-download"
            data={tableData}
            onDownload={()=>console.log("Download")}
            title="User Information"
            headerTitles={["ID", "Name", "GGGA", "Email"]}
            onClickCell={(e, rowIndex, columnIndex) => {
                alert(`Clicked cell at row ${rowIndex + 1}, column ${columnIndex + 1}`);
            }}
        />

        </main>
    );
}