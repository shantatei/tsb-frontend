import { React } from "react";
import { TextField, Button, Box, Typography, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const AddressForm = ({ next }) => {
  const DefaultFormValues = {
    address: {
      firstName: "",
      lastName: "",
      Address: "",
      email: "",
      zip: "",
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: DefaultFormValues.address,
  });

  const onSubmit = (data) => {
    next({ ...data });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom align="center">
        Shipping Address
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 1, mb: 3 }}
      >
        <Stack direction="row" justifyContent="space-evenly">
          <TextField
            margin="normal"
            sx={{ width: "40%" }}
            {...register("firstName", {
              required: "FirstName is Required",
            })}
            label="FirstName"
            autoComplete="firstName"
            error={!!errors?.firstName}
            helperText={errors?.firstName ? errors.firstName.message : null}
          />
          <TextField
            margin="normal"
            sx={{ width: "40%" }}
            {...register("lastName", {
              required: "lastName is Required",
            })}
            label="LastName"
            autoComplete="lastName"
            error={!!errors?.lastName}
            helperText={errors?.lastName ? errors.lastName.message : null}
          />
        </Stack>
        <Stack justifyContent={"center"} display="flex" alignItems="center">
          <TextField
            margin="normal"
            sx={{ width: "87%" }}
            {...register("Address", {
              required: "Address is Required",
            })}
            label="Address"
            autoComplete="address"
            error={!!errors?.Address}
            helperText={errors?.Address ? errors.Address.message : null}
          />
          <TextField
            margin="normal"
            sx={{ width: "87%" }}
            {...register("zip", {
              required: "Postal Code is Required",
            })}
            label="Postal Code"
            autoComplete="zip"
            error={!!errors?.zip}
            helperText={errors?.zip ? errors.zip.message : null}
          />
          <TextField
            margin="normal"
            sx={{ width: "87%" }}
            {...register("email", {
              required: "Email is Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            label="Email"
            autoComplete="email"
            error={!!errors?.email}
            helperText={errors?.email ? errors.email.message : null}
          />
          <br />
        </Stack>
        <Stack direction="row" justifyContent="space-evenly">
          <Button
            component={Link}
            to="/cart"
            variant="outlined"
            sx={{ width: "40%" }}
          >
            Back to Cart
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "40%" }}
          >
            Next
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default AddressForm;
