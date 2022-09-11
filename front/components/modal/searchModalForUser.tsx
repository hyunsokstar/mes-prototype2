import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal';
import DataGrid from 'react-data-grid';
import axios from "axios";
import api from "../../utils/api"
import Pagination from '@material-ui/lab/Pagination'
import TextEditor from "../../components/util/TextEditor"
import { selectEditor, selectFormatter } from '../../common/editor_mapping';
import { SelectColumn } from "react-data-grid";
import taskBoardSlice from '../../slices/task_board';

import { RootState } from '../../store/reducer';
import { useSelector, useDispatch } from 'react-redux';

const columns = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' }
];

const rows = [
    { id: 0, title: 'Example' },
    { id: 1, title: 'Demo' }
];


type Props = {}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        // bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        // padding: "auto",
        // width: "60%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        // height: "100%"
    },
};


function searchModalForUser({ row, column, onRowChange }: any) {

    // redux 
    const dispatch = useDispatch();

    const [columns, setColumns] = useState<any>([])
    const [basicRows, setBasicRows] = useState([]);
    const [pageInfo, setPageInfo] = useState<{ page: number, total: number }>({
        page: 1,
        total: 1
    });
    const [selectedRows, setSelectedRows] = useState<any>(new Set());
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const user = useSelector((state: RootState) => state.user.me);
    let selectedRows_for_users_table = useSelector((state: RootState) => state.task_board.selectedRows);
    let basicRowsForTaskBoard = useSelector((state: RootState) => state.task_board.basicRows);


    let subtitle: HTMLHeadingElement | null;
    // console.log("row : ", row);

    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }
    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        getAllTodosFromBackend(pageInfo.page);
        getAllColumns(pageInfo.page);
    }, [pageInfo.page])

    const getAllColumns = async (page: number = 1) => {

        try {
            const response = await axios.get(
                // `${api.cats}/cats_columns/rowsForUsersTable/${page}/8`,
                `${api.cats}/cats_columns/columnsForTodosTable/`,
                // `${api.cats}/all_cats_columns/${page}/2`,
                { withCredentials: true }
            );
            // console.log("resposne.data for columns: ", response.data);
            if (response.data.success) {
                const new_columns = response.data.data.columns_list.map((column: any) => {
                    if (column) {
                        return {
                            ...column,
                            editor: column.editor === "TextEditor" ? selectEditor(column.editor) : selectFormatter(column.formatter),
                            formatter: column.formatter && selectFormatter(column.formatter)
                        }
                    }
                }).filter((v: any) => v)
                // console.log("new_columns : ", new_columns);
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
                // console.log("rows_data : ", rows_data);
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

    // const onRowsChangeHandler = (data: any, idx: any) => {
    //     console.log("data for row change handler : ", data);
    //     setBasicRows(data);
    // }

    const onRowsChangeHandler = (data: any, idx: any) => {
        console.log("data for row change handler : ", data);

        let tmp: Set<any> = selectedRows;
        data.map((v: any, i: any) => {
            if (v.isChange) {
                tmp.add(v._id)
                v.isChange = false
            }
        });
        setSelectedRows(tmp);
        setBasicRows(data);

    }

    const passSelectedDataToPage = () => {
        console.log("등록 버튼 클릭");
        console.log("selectedRows : ", selectedRows);

        // let tmp: Set<any> = selectedRows;
        let tmp: Set<any> = new Set(selectedRows_for_users_table);
        let tmp2: Set<any> = selectedRows;

        const rows_for_register = basicRows.map((row: any) => {
            if (selectedRows.has(row._id)) {
                tmp.add(row._id)
                return {
                    ...row,
                    _id: row._id,
                    email: user.email,
                    name: user.name,
                    test_complete: "false"
                }
            }
        }).filter((v) => v);
        setSelectedRows(tmp);
        console.log("rows_for_register : ", rows_for_register);

        // 추가로 등록한 경우
        // dispatch(
        //     taskBoardSlice.actions.setSelectedRows(tmp)
        // )

        dispatch(
            taskBoardSlice.actions.addMultiRowsForSearchBoardForReadyToRegister(rows_for_register)
        )

        // 취소한 경우 기존거에서 취소한걸 빼야 된다
        // 리덕스 선언:   selectedRows: new Set<any>()
        // 컴퍼넌트에서 가져오기:
        // let selectedRows_for_users_table = useSelector((state: RootState) => state.task_board.selectedRows);
        const before_selecetd_rows = selectedRows_for_users_table;
        const new_selected_rows = selectedRows;
        console.log("before_selecetd_rows : ", before_selecetd_rows);
        console.log("new_selected_row : ", new_selected_rows);
        // selectedRows_for_users_table.delete(new_selected_rows); 

        setIsOpen(false);
    }

    const my_setrow = (e: any) => {
        console.log("행 클릭", e);

        let tmp: Set<any> = new Set(selectedRows);
        let tmp2: Set<any> = new Set(selectedRows_for_users_table);
        if (selectedRows.has(e._id)) {
            console.log("실행 확인 11");
            tmp.delete(e._id)
            tmp2.delete(e._id)
        } else {
            console.log("실행 확인 22");
            tmp.add(e._id)
            tmp2.add(e._id)
        }
        setSelectedRows(tmp)

        dispatch(
            taskBoardSlice.actions.setSelectedRows(tmp2)
        )


    }

    const selectOneRow = (e) => {

        let tmp: Set<any> = new Set(selectedRows_for_users_table);
        tmp.add(e._id)

        dispatch(
            taskBoardSlice.actions.setSelectedRows(tmp)
        )

        const custom_data = {
            ...e,
            email: user.email,
            name: user.name,
            test_complete: false
        }

        const data = [e]

        dispatch(
            taskBoardSlice.actions.addMultiRowsForSearchBoardForReadyToRegister(data)
        )
        setIsOpen(false)

    }

    useEffect(() => {
        setSelectedRows(selectedRows_for_users_table);
    }, [selectedRows, selectedRows_for_users_table])


    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {row.todo ? row.todo : ""}
                <button onClick={openModal} onDoubleClick={openModal}>Open Modal</button>
            </div>

            <ModalWrapper>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>todo for task</h2>


                    {/* {selectedRows} */}
                    <DataGrid
                        columns={[SelectColumn, ...columns]}
                        rows={basicRows}
                        onRowsChange={(data, idx) => { onRowsChangeHandler(data, idx) }}
                        rowKeyGetter={(row) => row._id || ""}
                        selectedRows={selectedRows}
                        // onSelectedRowsChange={(row) => {

                        //     if (selectedRows.size > row.size) {
                        //         console.log("체크를 취소 했음");
                        //     }

                        //     setSelectedRows(row)
                        // }}
                        onRowClick={my_setrow}
                        onRowDoubleClick={selectOneRow}
                    />

                    <div>
                        <button onClick={() => setIsOpen(false)}>취소</button>
                        <button onClick={passSelectedDataToPage}>등록</button>
                    </div>


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

                </Modal>


            </ModalWrapper>

        </div>
    )
}

const ModalWrapper = styled.div`
  display: flex;
  width: 100%;
`

export default searchModalForUser