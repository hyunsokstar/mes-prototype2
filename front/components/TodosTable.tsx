import React from 'react'
import DataGrid from 'react-data-grid';

type Props = {}


const columns = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' , style:"hidden"}
];

const rows = [
    { id: 0, title: 'Example' },
    { id: 1, title: 'Demo' }
];

function TodosTable({ }: Props) {

    return (
        <div>
            <h2>todos page</h2>
            <DataGrid columns={columns} rows={rows} />
        </div>
    )


    // return ;
}

export default TodosTable
