import React, { useEffect, useState, useCallback } from 'react'
import axios from "axios";
import api from "../utils/api"
import DataGrid from 'react-data-grid';
import Pagination from '@material-ui/lab/Pagination'
import TextEditor from "../components/util/TextEditor"
import { selectEditor, selectFormatter } from '../common/editor_mapping';
import { SelectColumn } from "react-data-grid";


type Props = {}

const sample_columns = [
    { key: 'todo', name: 'todo' },
    { key: 'level', name: 'level' },
    { key: 'page', name: 'page' },
    { key: 'manager', name: 'manager' }
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
        getAllTodosFromBackend(pageInfo.page);
        getAllColumns(pageInfo.page);
    }, [pageInfo.page])

    const getAllColumns = async (page: number = 1) => {

        try {
            const response = await axios.get(
                // `${api.cats}/cats_columns/rowsForUsersTable/${page}/8`,
                `${api.cats}/cats_columns/columnsForTodosTable/${page}/8`,
                // `${api.cats}/all_cats_columns/${page}/2`,
                { withCredentials: true }
            );
            console.log("resposne.data for columns: ", response.data);

            if (response.data.success) {

                const new_columns = response.data.data.columns_list.map((column: any) => {
                    if (column) {
                        return {
                            ...column,
                            editor: column.editor === "TextEditor" ? TextEditor : selectFormatter(column.formatter),
                            formatter: column.formatter && selectFormatter(column.formatter)
                        }
                    }
                }).filter((v: any) => v)

                console.log("new_columns : ", new_columns);

                // setPageInfo({ page: response.data.data.current_page, total: response.data.data.total_page })
                setColumns(new_columns);
            }

        } catch (error) {
            console.log("error : ", error);

        }
    }

    const getAllTodosFromBackend = async (page: number = 1) => {
        try {
            const response = await axios.get(
                `${api.cats}/getTodosForTodosTable/${page}/4`,
                { withCredentials: true }
            );
            const rows_data = response.data.data.rows_for_grid

            if (response.data.success) {
                console.log("rows_data : ", rows_data);
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

    const onRowsChangeHandler = (data: any, idx: any) => {
        console.log("data for row change handler : ", data);
        setBasicRows(data);
    }

    return (
        <div>
            <h2>todos page</h2>
            <DataGrid
                columns={[SelectColumn ,...columns]}
                rows={basicRows}
                onRowsChange={(data, idx) => { onRowsChangeHandler(data, idx) }}

            />

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
