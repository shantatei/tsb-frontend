import {
  Box,
  Typography,
  Chip,
  Avatar,
  Button,
  CardHeader,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  Stack,
  FormControl,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ApiService from "../../../services/Api";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";

const Users = () => {
  const { httpadmin } = ApiService();
  const [users, setUsers] = useState([]);

  const [role, setRole] = useState("");
  const roles = useSelector((state) => state.roles.roles);

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    trigger,
  } = useForm();

  const fetchAllUsers = () => {
    httpadmin.get("/users").then(
      (res) => {
        setUsers(res.data);
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  const handleDelete = (role, email) => {
    let data = {
      email: email,
      role: role,
    };
    httpadmin.post("/detachRole", data).then(
      (res) => {
        console.log(res.data);
        fetchAllUsers();
        setRole("");
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  const onSubmit = (data) => {
    data.role = role;

    //api call
    httpadmin.post("/assignRole", data).then(
      (res) => {
        console.log(res.data);
        if (res.data.message === "Role has already been assigned to this user") {
          setError("email", {
            message: "Role has already been assigned to this user",
          });
        } else {
          fetchAllUsers();
          reset();
        }
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Avatar
              sx={{ marginRight: "5px" }}
              src={`http://localhost:8000/storage/profile_images/${params.row.profile_photo}`}
            />
            {params.row.name}
          </>
        );
      },
    },
    { field: "email", headerName: "Email", width: 230 },
    {
      field: "roles",
      headerName: "Roles",
      width: 300,
      renderCell: (params) =>
        params.value.map((role, index) => {
          return (
            <Chip
              key={index}
              label={role.role_name}
              color={
                role.role_name == "Admin"
                  ? "error"
                  : role.role_name == "Seller"
                  ? "info"
                  : "success"
              }
              onDelete={() => {
                handleDelete(role.role_name, params.row.email);
              }}
            />
          );
        }),
    },
  ];

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          position: "relative",
          left: "240px",
          mb: "5px",
          width: "80%",
          bgcolor: "background.default",
        }}
      >
        Users
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
          disableColumnSelector
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus":
              {
                outline: "none",
              },
          }}
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          autoHeight
        />
      </Box>
      <Card sx={{ position: "relative", left: "240px", width: "30%" }}>
        <CardHeader title="Assign Role" subheader="Select from dropdown" />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <TextField
                margin="dense"
                fullWidth
                {...register("email", {
                  required: "User's Email is Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                label="Email"
                autoComplete="email"
                error={!!errors?.email}
                helperText={errors?.email ? errors.email.message : null}
                onKeyUp={() => {
                  trigger("email");
                }}
              />
              <FormControl required>
                <Select value={role} onChange={handleChange}>
                  {roles.map((role) => {
                    return (
                      <MenuItem key={role.id} value={role.role_name}>
                        {role.role_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                endIcon={<AddIcon />}
                type="submit"
                sx={{ mt: "1rem" }}
              >
                Assign Role
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default Users;
