import React from 'react'
import StockContainer from '../components/container/StockContainer';



type Props = {}

function product_stock({ }: Props) {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "80%" , border:"1px solid green", margin: "auto"}}>
            <StockContainer />
        </div>
    )
}

export default product_stock