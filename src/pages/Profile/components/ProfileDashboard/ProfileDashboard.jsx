import { React, useState, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableFooter,
  Box,
  Toolbar,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import "../../../../css/styles.css";
import { useDispatch } from "react-redux";
import { UpdateProducts } from "../../../../redux/listingSlice";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? (
          <LastPageIcon sx={{ color: "white" }} />
        ) : (
          <FirstPageIcon sx={{ color: "white" }} />
        )}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight sx={{ color: "white" }} />
        ) : (
          <KeyboardArrowLeft sx={{ color: "white" }} />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft sx={{ color: "white" }} />
        ) : (
          <KeyboardArrowRight sx={{ color: "white" }} />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? (
          <FirstPageIcon sx={{ color: "white" }} />
        ) : (
          <LastPageIcon sx={{ color: "white" }} />
        )}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const ProfileDashboard = ({
  rows,
  handleRemoveListing,
  handleUpdateListing,
  getlistings,
}) => {
  const [editListingId, setEditListingId] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [editFormData, setEditFormData] = useState({
    itemname: "",
    price: "",
    quantity: "",
    description: "",
  });

  const dispatch = useDispatch();

  const handleCancelClick = () => {
    setEditListingId(null);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (event, listing) => {
    event.preventDefault();
    setEditListingId(listing.id);

    const formValues = {
      itemname: listing.itemname,
      price: listing.price,
      quantity: listing.quantity,
      description: listing.description,
    };

    setEditFormData(formValues);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedListing = {
      itemname: editFormData.itemname,
      price: parseFloat(editFormData.price),
      quantity: parseFloat(editFormData.quantity),
      description: editFormData.description,
    };

    console.log(editedListing);
    handleUpdateListing(editListingId, editedListing);
    handleClick();
    getlistings();
    setEditListingId(null);
  };

  return (
    <>
      <Box component="form" onSubmit={handleEditFormSubmit}>
        <Paper sx={{ background: "rgba(255,255,255, 0)", color: "white" }}>
          <Toolbar>
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Dashboard
            </Typography>
          </Toolbar>
          <TableContainer sx={{ borderRadius: "15" }}>
            <Table aria-label="simple table">
              <TableHead sx={{ fontWeigh: "bold" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Id</TableCell>
                  <TableCell sx={{ color: "white" }} align="left">
                    Name
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="left">
                    Image
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="left">
                    Price&nbsp;($)
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="left">
                    Quantity&nbsp;
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="left">
                    Description
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="left">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((listing) => (
                  <Fragment>
                    {editListingId === listing.id ? (
                      <EditableRow
                        listing={listing}
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                      />
                    ) : (
                      <ReadOnlyRow
                        listing={listing}
                        handleEditClick={handleEditClick}
                        handleRemoveListing={handleRemoveListing}
                        getlistings={getlistings}
                      />
                    )}
                  </Fragment>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter sx={{ color: "white" }}>
                <TableRow>
                  <TablePagination
                  className="pagination"
                    sx={{ color: "white" }}
                    rowsPerPageOptions={[3, 5, 10, { label: "All", value: -1 }]}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Item Updated Successfully
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProfileDashboard;
