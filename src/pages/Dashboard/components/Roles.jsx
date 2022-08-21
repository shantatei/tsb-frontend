import { React, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Typography,
  Box,
  Chip,
  IconButton,
  Button,
  Card,
  CardHeader,
  CardContent,
  TextField,
} from "@mui/material";
import ApiService from "../../../services/Api";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { SetRoles } from "../../../redux/rolesSlice";

const Roles = () => {
  const { httpadmin } = ApiService();
  const roles = useSelector((state) => state.roles.roles);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

 

  

  const fetchAllRoles = () => {
    httpadmin.get("/roles").then(
      (res) => {
        dispatch(SetRoles(res.data));
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  const onSubmit = (data) => {
    console.log(data);
    //api call
    httpadmin.post("/createRole", data).then(
      (res) => {
        console.log(res.data);
        reset();
        fetchAllRoles();
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  const deleteRole = (id) => {
    console.log(id);
    httpadmin.delete(`/deleteRole/${id}`).then(
      (res) => {
        console.log(res.data);
        fetchAllRoles();
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  useEffect(() => {
    fetchAllRoles();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "role_name",
      headerName: "Role",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Chip
              label={params.row.role_name}
              color={
                params.row.role_name == "Admin"
                  ? "error"
                  : params.row.role_name == "Seller"
                  ? "info"
                  : "success"
              }
            />
          </>
        );
      },
    },
    { field: "role_description", headerName: "Description", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            {/* <IconButton onClick={() => {}}>
              <EditIcon />
            </IconButton> */}
            <IconButton
              onClick={() => {
                deleteRole(params.row.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <Typography
        p={2}
        variant="h4"
        sx={{
          position: "relative",
          left: "240px",
          mb: "5px",
          width: "80%",
          bgcolor: "background.default",
        }}
      >
        Roles
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
          rows={roles}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          autoHeight
        />
      </Box>
      <Card sx={{ position: "relative", left: "240px", width: "30%" }}>
        <CardHeader title="Create New Role" subheader="Add a description " />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="dense"
              fullWidth
              {...register("role_name", {
                required: "Role Name is Required",
              })}
              label="Role"
              autoComplete="role"
              error={!!errors?.role_name}
              helperText={errors?.role_name ? errors.role_name.message : null}
            />
            <TextField
              margin="dense"
              fullWidth
              {...register("role_description", {
                required: "Role Description is Required",
              })}
              label="Description"
              error={!!errors?.role_description}
              helperText={
                errors?.role_description
                  ? errors.role_description.message
                  : null
              }
            />
            <Button
              variant="contained"
              endIcon={<AddIcon />}
              type="submit"
              sx={{ mt: "1rem" }}
            >
              Create
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default Roles;
