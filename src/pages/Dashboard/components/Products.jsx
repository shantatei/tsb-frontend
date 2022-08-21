import React from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

const Products = () => {
  const products = useSelector((state) => state.listing.products);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "itemname", headerName: "Name", width: 200 },
    { field: "price", headerName: "Price", type: "number", width: 130 },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 90,
    },
    {
      width: 200,
      field: "description",
      headerName: "Description",
    },
  ];

  return (
    <>
      <Typography
        variant="h4"
        p={2}
        sx={{
          position: "relative",
          left: "240px",
          mb: "5px",
          width: "80%",
          bgcolor: "background.default",
        }}
      >
        Products
      </Typography>
      <Box
        sx={{
          position: "relative",
          left: "240px",
          width: "80%",
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
          rows={products}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          autoHeight
        />
      </Box>
    </>
  );
};

export default Products;
