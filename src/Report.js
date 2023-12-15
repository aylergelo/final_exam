import React from "react";
import { DataGrid } from '@mui/x-data-grid';

export default function Report ({order}){
  const columns = [
    { field: 'id', headerName: 'ID', minWidth: 110, align: "center", flex: 1},
    { field: 'product', headerName: 'Product Name', minWidth: 170, align: "center", flex: 1},
    { field: 'price', headerName: 'Price', minWidth: 170, align: "center", flex: 1 },
    { field: 'stocks', headerName: 'Quantity', minWidth: 170, align: "center", flex: 1},
    { field: 'totalPrice', headerName: 'Total Price', type: 'number', minWidth: 170, align: "center", flex: 1 },
    { field: 'status', headerName: 'Status', minWidth: 170, align: "center", flex: 1,    sortable: false,
    renderCell: (params) => (
      <div style={{ color: 'green' }}>
        {params.value}
      </div>
    ),
    },
  ];


  const rows = order.reduce((acc, orderItem, index) => {
    const rowElement = {
      id: `${index}`,
      product: orderItem.prodName, // Adjusted property name
      price: orderItem.price,
      stocks: orderItem.quantity, // Adjusted property name
      totalPrice: `₱${(orderItem.price * orderItem.quantity).toFixed(2)}`,
      status: 'Completed',
    };
  
    return acc.concat(rowElement);
  }, []);
  
  

    return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: '1', marginRight: '20px' }}>
      <DataGrid
              height={600}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                "& .MuiDataGrid-header .table-header": {
                  border: "1px solid black",
                  width: "100%",
                      
                },
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "black",
                  color: "white",
                  fontWeight: "bold",
                },
                "& .MuiDataGrid-sortIcon":{
                  color: 'white'
                },
                "& .MuiDataGrid-menuIconButton":{
                  color: 'white',
                  opacity: 1
                },
                "& .MuiDataGrid-cell .table-cell": {
                  border: "1px solid black",
                },
              }}
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10]}
              sortingOrder={["asc", "desc"]}
            />

      </div>

    </div>

    );

}