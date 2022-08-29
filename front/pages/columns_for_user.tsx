import React from 'react'
import DataGrid from 'react-data-grid'
// import ExcelTable from "../components/Excel/ExcelTable"

const columns = [
  { key: 'key', name: 'key'},
  { key: 'name', name: 'name' },
  { key: 'width', name: 'width' },
];

const rows = [
  {key:"email", name:"email", width:200},
  {key:"name", name:"name", width:200},
  {key:"password", name:"password", width:200},
  {key:"passwordCheck", name:"passwordCheck", width:200},
  {key:"age", name:"age", width:200},  
  {key:"gender", name:"gender", width:200}
  // { email: "tere2@daum.net", name: 'tere2', password: "1234", passwordCheck: "1234", height: "177", picture: "https://cdn-icons-png.flaticon.com/128/213/213346.png", company: "samsung" },
  // { email: "tere3@daum.net", name: 'tere3', password: "1234", passwordCheck: "1234", height: "177", picture: "https://cdn-icons-png.flaticon.com/128/213/213346.png", company: "samsung" },
];

type Props = {}

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: "80%",
  margin: "auto",
  border: "1px solid green"
};


const columns_for_user = (props: Props) => {
  return (
    <div style={styles}>
      <DataGrid columns={columns} rows={rows} style={{ width: "100%" }} />
    </div>
  )
}

export default columns_for_user