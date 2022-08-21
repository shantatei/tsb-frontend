import React from "react";
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";

const UserCard = ({ user, product }) => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        marginTop:1,
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={`http://localhost:8000/storage/profile_images/${user.profile_photo}`}
            aria-label="user"
          ></Avatar>
        }
        title={user.name}
      ></CardHeader>
      <CardContent>
        <TextField
          sx={{ marginBottom: 2 }}
          label="Make an offer"
          fullWidth="100%"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            defaultValue: product.price,
          }}
        ></TextField>
        <Button variant="contained" fullWidth="100%">
          Send Offer
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserCard;

