import React from 'react'
import ProductTable from '../table/productTable'

type Props = {}


function StockContainer({ }: Props) {
    return (
        <div style={{width: "100%", border:"1px solid green"}}>
            <ProductTable />
        </div>
    )
}

export default StockContainer

