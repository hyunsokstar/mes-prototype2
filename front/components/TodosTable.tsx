import React, { useEffect, useState, useCallback } from 'react'
import axios from "axios";
import api from "../utils/api"

import DataGrid from 'react-data-grid';
import Pagination from '@material-ui/lab/Pagination'


type Props = {}

const sample_columns = [
    { key: 'todo', name: 'todo' },
    { key: 'level', name: 'level' },
    { key: 'page', name: 'page' },
    { key: 'manager', name: 'manager' }
];

// const sample_rows = [
//     { id: 0, title: 'Example' },
//     { id: 1, title: 'Demo' }
// ];

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
        getAllTodosFromBackend(pageInfo.page);
    }, [])


    const getAllTodosFromBackend = async (page: number = 1) => {
        try {
            const response = await axios.get(
                `${api.cats}/getTodosForTodosTable/${page}/4`,
                { withCredentials: true }
            );
            const rows_data = response.data.data.rows_for_grid

            if (response.data.success) {
                console.log("response.data : ", response.data.data);
                // console.log("respose success check !! ");
                setBasicRows(rows_data)
            }

            setPageInfo({ page: response.data.data.current_page, total: response.data.data.total_page })

        } catch (error) {
            console.log("error : ", error);
        }
    }

    const setPage = (page: any) => {
        setPageInfo({ ...pageInfo, page: page });
    }

    return (
        <div>
            <h2>todos page</h2>
            <DataGrid columns={sample_columns} rows={basicRows} />

            <Pagination
                count={pageInfo.total}
                page={pageInfo.page}
                size="large"
                defaultPage={1}
                shape="rounded"
                onChange={(e, page) => {
                    setPage(page)
                }}
            />

        </div>
    )

}

export default TodosTable
