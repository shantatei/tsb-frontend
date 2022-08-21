import React from "react";
import { TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ReadOnlyRow = ({
  listing,
  handleEditClick,
  handleRemoveListing,
  getlistings,
}) => {
  return (
    <TableRow
    
      key={listing.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row" sx={{ color: "white"}}> 
        {listing.id}
      </TableCell>
      <TableCell sx={{ color: "white"}} align="left">{listing.itemname}</TableCell>
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
      <TableCell sx={{ color: "white"}} align="left">{listing.price}</TableCell>
      <TableCell sx={{ color: "white"}} align="left">{listing.quantity}</TableCell>
      <TableCell sx={{ color: "white"}} align="left">{listing.description}</TableCell>
      <TableCell sx={{ color: "white"}} align="left" justify="space-between">
        <EditIcon
          onClick={(event) => {
            handleEditClick(event, listing);
          }}
          sx={{ color: "blue" }}
        />
        <DeleteForeverIcon
          sx={{ color: "red" }}
          onClick={() => {
            handleRemoveListing(listing.id);
            getlistings();
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export default ReadOnlyRow;
