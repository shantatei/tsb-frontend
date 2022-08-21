import { React, useState, useEffect } from "react";
import ApiService from "../../../services/Api";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

const Orders = () => {
  const { httpadmin } = ApiService();

  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    httpadmin.get("/orders").then(
      (res) => {
        setOrders(res.data);
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(orders);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "user_id",
      headerName: "Customer ID",
      width: 130,
    },
    { field: "billing_firstname", headerName: "FirstName", width: 130 },
    { field: "billing_lastname", headerName: "LastName", width: 130 },
    { field: "billing_email", headerName: "Email", width: 130 },
    { field: "billing_address", headerName: "Address", width: 130 },
    { field: "billing_postalcode", headerName: "PostalCode", width: 130 },
    { field: "payment_gateway", headerName: "Payment Gateway", width: 130 },
    { field: "total_price", headerName: "Total Price", width: 130 },
    { field: "total_quantity", headerName: "Total Quantity", width: 130 },
  ];

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          position: "relative",
          left: "240px",
          mb: "5px",
          width: "100%",
          bgcolor: "background.default",
        }}
      >
        Orders
      </Typography>
      <Box
        sx={{
          position: "relative",
          left: "240px",
          width: "100%",
          bgcolor: "background.default",
          mb: "1rem",
        }}
      >
        <DataGrid
          disableSelectionOnClick
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus":
              {
                outline: "none",
              },
          }}
          rows={orders}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
        />
      </Box>
    </>
  );
};

export default Orders;
