import React, { useEffect, useState } from 'react'
import api from "../utils/api"
import axios from "axios";
import DataGrid from 'react-data-grid';
import { IExcelHeaderType } from "../types/type";
import { columnlist } from "../common/columnInit";


// const columns = [
//   { key: 'id', name: 'ID' },
//   { key: 'title', name: 'Title' }
// ];

const rows = [
  { email: "terecal@daum.net", name: 'chulsu' },
  { email: "hyun@daum.net", name: 'hyun' }
];

interface IRow {
  _id: number;
  email: string;
  name: string;
}


function UserTable() {
  const [column, setColumn] = useState<Array<IExcelHeaderType>>(
    columnlist.member
  );
  const [basicRow, setBasicRow] = useState<Array<any>>([
    {
      email: "",
      name: "",
    },
  ]);

  const getAllCats = async () => {
    try {
      const response = await axios.get(
        `${api.cats}/allCats`,
        { withCredentials: true }
      );
      console.log("response : ", response);
      if (response.data.success) {
        setBasicRow(response.data.data)
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    getAllCats();
  }, []);

  function rowKeyGetter(row: IRow) {
    return row._id;
  }

  function setRow(e: any) {
    console.log("e : ", e);

    setBasicRow(e)

  }

  return (
    <div>
      <DataGrid columns={column} rows={basicRow} onRowsChange={(e) => setRow(e)} />
    </div>
  );
}

export default UserTable;