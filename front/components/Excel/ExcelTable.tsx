import React, { useState, useEffect } from 'react'
import DataGrid from 'react-data-grid'


type IProps = {
    data_for_rows: Array<any>
    data_for_columns: Array<any>
    setRow: (row: Array<any>, index: number) => void
    selectList: ReadonlySet<number>
    setSelectList?: (selectedRows: ReadonlySet<number>) => void
}


const ExcelTable = ({ data_for_rows, data_for_columns, setRow, selectList, setSelectList }: IProps) => {
    const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(selectList ?? new Set())

    const rowKeyGetter = (row: any) => {
        return row?.id;
    }

    useEffect(() => {
        setSelectList && setSelectList(selectedRows)
    }, [selectedRows])

    useEffect(() => {
        setSelectedRows(selectList)
    }, [selectList])

    return (
        <>
            <DataGrid
                rowKeyGetter={rowKeyGetter}
                columns={data_for_columns}
                rows={data_for_rows}
                onRowsChange={(data, idx) => {
                    // setSelectRow && setSelectRow(idx.indexes[0])
                    setRow(data, idx.indexes[0])
                }}
                onSelectedRowsChange={(row) => {
                    console.log("row : ", row);
                    setSelectedRows(row)
                }}
                selectedRows={selectedRows}
            />
        </>
    )
}

export default ExcelTable