import React, { useEffect, useState, useCallback } from 'react'
import axios from "axios";
import api from "../utils/api"

import DataGrid from 'react-data-grid';
type Props = {}

const sample_columns = [
    { key: 'todo', name: 'todo' },
    { key: 'level', name: 'level' },
    { key: 'page', name: 'page' },
    { key: 'manager', name: 'manager' }
];

const sample_rows = [
    { id: 0, title: 'Example' },
    { id: 1, title: 'Demo' }
];

function TodosTable({ }: Props) {
    const [selectList, setSelectList] = useState<Set<any>>(new Set());
    const [columns, setColumns] = useState<any>([])
    const [basicRows, setBasicRows] = useState([]);
    const [pageInfo, setPageInfo] = useState<{ page: number, total: number }>({
        page: 1,
        total: 1
    });

    useEffect(() => {
        // getAllTodosFromBackend(pageInfo.page);
        getAllTodosFromBackend();
    }, [])


    const getAllTodosFromBackend = async () => {
        try {
            const response = await axios.get(
                `${api.cats}/getTodosForTodosTable`,
                { withCredentials: true }
            );

            const rows_data = response.data.data

            
            if (response.data.success) {
                console.log("response : ", response);
                // console.log("respose success check !! ");
                setBasicRows(rows_data)
            }

        } catch (error) {
            console.log("error : ", error);
        }
    }

    return (
        <div>
            <h2>todos page</h2>
            {/* <DataGrid columns={sample_columns} rows={sample_rows} /> */}
            <DataGrid columns={sample_columns} rows={basicRows} />
        </div>
    )

}

export default TodosTable
