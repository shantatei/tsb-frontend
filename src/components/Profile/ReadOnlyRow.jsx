import React from "react";
import { TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ReadOnlyRow = ({ listing, handleEditClick }) => {
  return (
    <TableRow
      key={listing.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {listing.id}
      </TableCell>
      <TableCell align="left">{listing.itemname}</TableCell>
      <TableCell align="left">
        <img
          src={`http://localhost:8000/storage/products_images/${listing.image}`}
          style={{
            width: "80px",
            height: "80px",
          }}
          alt="product"
        />
      </TableCell>
      <TableCell align="left">{listing.price}</TableCell>
      <TableCell align="left">{listing.quantity}</TableCell>
      <TableCell align="left">{listing.description}</TableCell>
      <TableCell align="left" justify="space-between">
        <EditIcon
          onClick={(event) => {
            handleEditClick(event,listing)
          }}
        />
        <DeleteForeverIcon  />
      </TableCell>
    </TableRow>
  );
};

export default ReadOnlyRow;
