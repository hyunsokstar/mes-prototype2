import React, { useEffect, useState, useCallback } from 'react'
import DataGrid from 'react-data-grid';
import axios from "axios";
import api from "../../utils/api"
import TextEditor from '../../components/util/TextEditor'
import { throttle } from "lodash";
import Notiflix from "notiflix";
import Pagination from '@material-ui/lab/Pagination'
import { selectEditor, selectFormatter } from '../../common/editor_mapping';
import { SelectColumn } from "react-data-grid";
// redux 작업
import { RootState } from '../../store/reducer';
import taskBoardSlice from '../../slices/task_board';
import { useSelector, useDispatch } from 'react-redux';

type Props = {}

function TaskBoardTable({ }: Props) {
    const columns = useSelector((state: RootState) => state.task_board.columns);
    const basicRows = useSelector((state: RootState) => state.task_board.basicRows);
    let selectedRows = useSelector((state: RootState) => state.task_board.selectedRows);

    const [pageInfo, setPageInfo] = useState<{ page: number, total: number }>({
        page: 1,
        total: 1
    })

    // console.log("selectedRows : ", selectedRows);
    // selectedRows.add("1234") 

    // 여기서 에러 발생 
    // 에러 메세지 :
    // Error: [Immer] This object has been frozen and should not be mutated



    useEffect(() => {
        getAllGridDataForRowsForUsersTable(pageInfo.page);
    }, [pageInfo.page])
    // 리덕스 관련
    const dispatch = useDispatch();

    const getAllGridDataForRowsForUsersTable = async (page: number = 1) => {
        try {
            const response = await axios.get(
                `${api.cats}/getGridDataByTableName/rowsForUsersTable/${page}/8`,
                { withCredentials: true }
            );
            if (response.data.success) {
                const columns_for_grid = response.data.data.columns_for_grid
                const rows_for_grid = response.data.data.rows_for_grid
                const new_columns = columns_for_grid.map((column: any) => {
                    if (column.hidden !== "true") {
                        return {
                            ...column,
                            editor: column.editor ? TextEditor : TextEditor,
                            formatter: column.formatter && selectFormatter(column.formatter),
                            resizable: column.resizable === "true" ? true : false,
                        }
                    }
                }).filter((v: any) => v)

                dispatch(
                    taskBoardSlice.actions.setColumns({
                        new_columns: new_columns
                    })
                );

                // console.log("rows_for_grid : ", rows_for_grid);


                dispatch(
                    taskBoardSlice.actions.setBasicRows({
                        new_basic_rows: rows_for_grid
                    }),
                )

                // console.log("rows_for_grid : ", rows_for_grid);
                // console.log("response.data.data.current_page : ", response.data.data.current_page);
                
                setPageInfo({ page: response.data.data.current_page, total: response.data.data.total_page })
            }
        } catch (error) {
            console.log("error : ", error);

        }
    }

    const onRowsChangeHandler = (data: any, idx: any) => {
        console.log("data for row change handler : data ", data);
        console.log("data for row change handler idx: ", idx);
        let tmp: Set<any> = new Set(selectedRows);

        console.log("data : ", data);
        data.map((v, i) => {
            if (v.isChange) {
                tmp.add(v._id)
                v.isChange = false
            }
        });

        dispatch(
            taskBoardSlice.actions.setSelectedRows(tmp)
        )

        dispatch(
            taskBoardSlice.actions.setBasicRows({
                new_basic_rows: data
            }),
        )
    }

    const modify_column_width_by_table_name_and_key = useCallback(async (data: object) => {
        Notiflix.Loading.circle()

        try {
            // console.log("data_for_save : ", data);
            const response = await axios.post(
                `${api.cats}/modify_column_width_by_table_name_and_key`,
                data,
                { withCredentials: true }
            );
            if (response.data.success) {
                Notiflix.Loading.remove()
                // console.log("response.data : ", response.data);
                console.log("컬럼 넓이 api 요청 !!");
                return
            }
        } catch (error: any) {
            console.log("error : ", error);
        }
    }, [])

    const updateColumnWidthByKey = useCallback((index: number, width: number, columns: any) => {
        console.log("columns : ", columns);
        console.log("index : ", index);

        const data = {
            table_name: "rowsForUsersTable",
            key: columns[index - 1].key,
            width: width.toFixed(2)
        }

        console.log("data : ", data);
        modify_column_width_by_table_name_and_key(data);


        Notiflix.Loading.remove()
    }, [])

    const setPage = (page: any) => {
        setPageInfo({ ...pageInfo, page: page });
    }

    /** rowsForTaskBoard 에 데이터를 저장하기 위한 함수 www.daum.net */
    // 2244
    const saveRowForTaskBoard = async () => {
        console.log("saveRowForTaskBoard click check");
        console.log("selectedRows : ", selectedRows);
        console.log("basicRow : ", basicRows);

        if (selectedRows.size == 0) {
            alert("1행 이상 선택해주세요 ");
            return;
        }

        const new_basic_rows_for_save = basicRows.map((row: any) => {
            if (selectedRows.has(row._id)) {
                return row
            }
        }).filter((v) => v)


        const data_for_save_request = {
            users: new_basic_rows_for_save
        }

        try {
            console.log("data_for_save_request : ", data_for_save_request);

            const response = await axios.post(
                `${api.cats}/saveRowsForUsersTable`,
                data_for_save_request,
                { withCredentials: true }
            );

            if (response.data.success) {
                console.log("response.data : ", response.data);

                dispatch(
                    taskBoardSlice.actions.setSelectedRows(new Set())
                )

            }

            alert(response.data.data);


        } catch (error: any) {
            console.log("error : ", error);
        }


    }

    const deleteUserForCheck = async () => {
        console.log("삭제 버튼 클릭");

        try {
            const rows_for_delete = basicRows.filter((row: any) => {
                console.log("row : ", row);

                if (selectedRows.has(row._id)) {
                    return row._id
                }
            })

            console.log("rows_for_delete : ", rows_for_delete);

            const ids_for_delete = rows_for_delete.map((row: any) => {
                return row._id
            })

            console.log("ids_for_delete : ", ids_for_delete); // ['62f8c8c77297cfa7f1e05154', '62f8f230ed2082e4d5cb287d']

            if (selectedRows.size === 0) {
                alert("삭제할 행을 선택해 주세요 ");
                return
            }

            const response = await axios.post(
                `${api.cats}/deleteRowsForTaskBoard`,
                { ids_for_delete: ids_for_delete },
                { withCredentials: true }
            );

            if (response.data.success) {
                console.log("response.data : ", response.data);

                const basic_row_after_delete = basicRows.filter((row: any) => {
                    if (!ids_for_delete.includes(row._id)) {
                        return row
                    }
                })

                alert("행 삭제 성공 !");

                dispatch(
                    taskBoardSlice.actions.setBasicRows({
                        new_basic_rows: basic_row_after_delete
                    }),
                )

            }

        } catch (error) {

        }

    }

    const addRowForExcelTable = () => {
        // console.log("행 추가!");

        console.log("행 추가 : ");
        const random_id = Math.random() * 1000;

        // const basic_row_after_delete = basicRows.filter((row: any) => {
        //     if (!ids_for_delete.includes(row._id)) {
        //         return row
        //     }
        // })

        // setBasicRows([
        //   {
        //     id: `${random_id}`,
        //     email: null,
        //     name: null,
        //   },
        //   ...basicRows,
        // ]);

        const default_row = {
            _id: random_id,
            email: "",
            name: "",
            todo: "",
            teste_complete: ""
        }

        dispatch(
            taskBoardSlice.actions.addDefaultRow(default_row)
        )

    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px", gap: "10px" }}>
                <button onClick={() => addRowForExcelTable()}>행 추가</button>
                <button onClick={saveRowForTaskBoard}>저장 </button>
                <button onClick={() => deleteUserForCheck()}>행 삭제</button>
            </div>

            <DataGrid
                columns={[SelectColumn, ...columns]}
                rows={basicRows}
                style={{ width: "100%", height: "500px" }}
                onRowsChange={(data, idx) => { onRowsChangeHandler(data, idx) }}
                onColumnResize={
                    throttle((index: number, width: number) => updateColumnWidthByKey(index, width, columns), 2000, { 'leading': false })
                }
                rowKeyGetter={(row) => row._id || ""}
                selectedRows={selectedRows}
                onSelectedRowsChange={(row) => {
                    console.log("row 1234 : ", row);
                    let tmp: Set<any> = row;
                    dispatch(
                        taskBoardSlice.actions.setSelectedRows(row)
                    )

                }}
            />
            <br />

            <div style={{ display:"flex", justifyContent:"center", border:"0px solid black" }}>
                {/* {pageInfo.page} */}
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

        </div>
    )
}

export default TaskBoardTable