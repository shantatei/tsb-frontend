import React from "react";
import { TableCell, TableRow, TextField, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const EditableRow = ({
  listing,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <TableRow
      key={listing.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row" sx={{ color: "white" }}>
        {listing.id}
      </TableCell>
      <TableCell align="left" sx={{ width: "100%" }}>
        <TextField
          className="edit-text-field"
          variant="standard"
          name="itemname"
          value={editFormData.itemname}
          onChange={handleEditFormChange}
        />
      </TableCell>
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
      <TableCell align="left">
        <TextField
          className="edit-text-field"
          variant="standard"
          name="price"
          value={editFormData.price}
          onChange={handleEditFormChange}
        />
      </TableCell>
      <TableCell align="left">
        <TextField
          className="edit-text-field"
          variant="standard"
          name="quantity"
          value={editFormData.quantity}
          onChange={handleEditFormChange}
        />
      </TableCell>
      <TableCell align="left" sx={{ width: "100%" }}>
        <TextField
          className="edit-text-field"
          variant="standard"
          name="description"
          value={editFormData.description}
          onChange={handleEditFormChange}
        />
      </TableCell>
      <TableCell align="left" justify="space-between">
        <IconButton type="submit">
          <CheckIcon sx={{color:"white"}} />
        </IconButton>
        <IconButton type="button">
          <ClearIcon onClick={handleCancelClick} sx={{color:"white"}} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default EditableRow;
