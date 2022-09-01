import React, { useEffect, useState } from 'react'
import DataGrid from 'react-data-grid';
import axios from "axios";
import api from "../../utils/api"
import TextEditor from '../../components/util/TextEditor'

const sample_columns = [
    { key: "email", name: "email", editor: TextEditor },
    { key: "name", name: "name", editor: TextEditor },
    { key: "email", name: "gender", editor: TextEditor },
    { key: "hobby", name: "hobby", editor: TextEditor },
    { key: "company", name: "company", editor: TextEditor },
]


const rows = [
    { id: 0, email: 'tere@daum.net', name: "hyun2", gender: "man", hobby: "game", height: "174", age: 30, company: "hyundae" },
    { id: 1, email: 'demo@naver.com', name: "demo", gender: "girl", hobby: "game", height: "174", age: 30, company: "hyundae" }
];



type Props = {}

function ProductTable({ }: Props) {
    const [columns, setColumns] = useState([])
    const [pageInfo, setPageInfo] = useState<{ page: number, total: number }>({
        page: 1,
        total: 1
    })

    useEffect(() => {
        getAllColumns(pageInfo.page);
    }, [pageInfo.page])

    const getAllColumns = async (page: number = 1) => {

        try {
            const response = await axios.get(
                // `${api.cats}/all_cats_columns/${page}/8`,
                `${api.cats}/cats_columns/users_table/${page}/8`,
                // `${api.cats}/all_cats_columns/${page}/2`,
                { withCredentials: true }
            );
            console.log("resposne : ", response.data.data.columns_list);
            if (response.data.success) {

                const new_columns = response.data.data.columns_list.filter((column: any) => {
                    if (column.editor && column.hidden !== "true") {
                        // if (column.editor) {
                        return {
                            ...column,
                            editor: column.editor === "TextEditor" ? TextEditor : ""
                        }
                    }
                })

                // setPageInfo({ page: response.data.data.current_page, total: response.data.data.total_page })

                console.log("new_columns.length : ", new_columns.length);
                setColumns(new_columns);
            }

        } catch (error) {
            console.log("error : ", error);

        }
    }

    return (
        <div style={{ width: "500px" }}>
            {/* <DataGrid columns={sample_columns} rows={rows} /> */}
            <DataGrid columns={sample_columns} rows={rows} />
        </div>

    )
}

export default ProductTable