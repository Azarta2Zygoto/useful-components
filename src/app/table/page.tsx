"use client";

import React, { useState } from "react";
import Table from "@/component/table/table";
import AlertBox from "@/component/alertBox/alertBox";
import { InfoComponent, WarningComponent } from "@/self/moreInfo";

const data = [
    { id: 1, name: "banana", quantity: 28, buying_date: "2023-10-01" },
    { id: 2, name: "apple", quantity: 15, buying_date: "2023-10-05" },
    { id: 3, name: "orange", quantity: 42, buying_date: "2023-10-10" },
    { id: 4, name: "grape", quantity: 8, buying_date: "2023-10-12" },
];

const manyColumns = Array.from({ length: 20 }, (_, i) => `Column ${i + 1}`);

export default function TablePage() {
    const [message, setMessage] = useState("This is an alert box message.");
    const [error, setError] = useState<-1|0|1|2>(1);
    const [visible, setVisible] = useState(false);
    
    return (
        <main>
            <h1>Table</h1>
            <p>One of easiest way to display a large amount of data is to display the table. Here is a component that allow to display data in a pretty way and to let users have some controls (sort, filter, ...) on it.</p>
            
            <h2>Basic table</h2>
            <div className="inner-component">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Buying date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((fruit) => (
                        <tr key={fruit.id}>
                        <td>{fruit.id}</td>
                        <td>{fruit.name}</td>
                        <td style={{textAlign:"center"}}>{fruit.quantity}</td>
                        <td style={{textAlign:"center"}}>{fruit.buying_date}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <InfoComponent>
                This is a simple HTML table. It is not responsive and does not have any interactivity.
            </InfoComponent>


            <h2>Header row</h2>
            <p>Automatically, the titles of column are set to the keyname of the dictionnary, you can change that.</p>
            <div className="inner-component">
                <Table
                    name="userTable"
                    data={data}
                />
                <Table
                    name="userTable-header"
                    data={data}
                    headerTitles={["ID", "Name", "Quantity", "Buying date"]}
                />
            </div>


            <h2>Clikable row</h2>
            <p>Allow the user to get more informations about a row.</p>
            <div className="inner-component">
                <Table
                    name="userTable-click-row"
                    data={data}
                    headerTitles={["ID", "Name", "Quantity", "Buying date"]}
                    onClickRow={(_, index) => {
                        setError(1);
                        setMessage(`You clicked on row ${index + 1}`);
                        setVisible(true);
                    }}
                />
            </div>

            
            <h2>Clikable cell</h2>
            <p>Allow the user to get more informations about a cell.</p>
            <div className="inner-component">
                <Table
                    name="userTable-click-cell"
                    data={data}
                    headerTitles={["ID", "Name", "Quantity", "Buying date"]}
                    onClickCell={(_, ligne, colonne) => {
                        setError(1);
                        setMessage(`You clicked on row ${ligne + 1} and column ${colonne + 1}`);
                        setVisible(true);
                    }}
                />
            </div>
            <h2>Box and Title</h2>
            <p>The table can be directly put on a box with a title</p>
            <div className="inner-component">
                <Table
                    name="userTable-click-box"
                    data={data}
                    title="Fruit information"
                    box
                    headerTitles={["ID", "Name", "Quantity", "Buying date"]}
                    onClickRow={(_, index) => {
                        setError(1);
                        setMessage(`My row ${index + 1} is so pretty !`);
                        setVisible(true);
                    }}
                />
            </div>
            <InfoComponent>
                The box is responsive, if the screen is too small, the table will be scrollable. This is not the case otherwise.
            </InfoComponent>
            <h2>Sort</h2>
            <p>The table can be sortable by clicking on incons in the header of the column.</p>
            <div className="inner-component">
                <Table
                    name="userTable-sort"
                    sortable
                    headerTitles={["ID", "Name", "Quantity", "Buying date"]}
                    data={data}
                />
            </div>
            <h2>Filterable column</h2>
            <p>It is possible to filter some columns to hide them from display.</p>
            <div className="inner-component">
                <Table
                    name="userTable-filterable-hover"
                    filterable="in-hover"
                    title="Icons appear on hover"
                    headerTitles={["ID", "Name", "Quantity", "Buying date"]}
                    data={data}
                />
                <Table
                    name="userTable-filterable-always"
                    filterable="in-always"
                    title="Icons appear always"
                    headerTitles={["ID", "Name", "Quantity", "Buying date"]}
                    data={data}
                />
                <Table
                    name="userTable-filterable-outside"
                    filterable="outside"
                    title="Icons appear outside box"
                    headerTitles={["ID", "Name", "Quantity", "Buying date"]}
                    data={data}
                />
            </div>
            <WarningComponent>
                Some styles need to be changed !
            </WarningComponent>
            <h2>Download</h2>
            <p>It is possible to get only information that the user want to display, for downloading them for instance.</p>
            <div className="inner-component">
                <Table
                    name="userTable-download"
                    title="Downloadable table"
                    filterable="in-hover"
                    headerTitles={["ID", "Name", "Quantity", "Buying date"]}
                    onDownload={()=>alert("Download")}
                    data={data}
                />
            </div>
            <h2>Paginated</h2>
            <p>Coming soon !</p>
            <h2>Virtual table</h2>
            <p>When you have a lot of columns, you can use the virtual table to display only the columns that are visible on the screen.</p>
            <div className="inner-component">
                <Table
                    name="userTable-virtual"
                    title="Virtual table"
                    virtual
                    headerTitles={["ID", "Name", "Quantity", "Buying date"]}
                    data={data}
                    width={250}
                />
            </div>
            <WarningComponent>
                The virtual table is not compatible with the filterable and downloadable options.
                There is also some problems of styling !
            </WarningComponent>
            <AlertBox
                error={error}
                message={message}
                visible={visible}
                onClose={() => setVisible(false)}
            />
        </main>
    );
}