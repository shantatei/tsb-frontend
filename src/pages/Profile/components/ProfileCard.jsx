import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Stack,
} from "@mui/material";

const ProfileCard = ({ profile_photo, name, roles }) => {
  console.log(roles);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "50%",
          bgcolor: "#001A33",
          borderRadius: "0",
        }}
      >
        <Avatar
          sx={{ marginInline: "auto", marginTop: 2, width: 150, height: 150 }}
          src={`http://localhost:8000/storage/profile_images/${profile_photo}`}
        ></Avatar>
        <CardContent
          style={{
            display: "flex",
            justifyContent: "center",
            color: "white",
            alignItems: "end",
          }}
        >
          <Stack alignItems="center">
            <div>
              <Typography variant="h5">{name}</Typography>
            </div>
            <Stack flexDirection={"row"} direction="row" spacing={1}>
              {roles.map((role, index) => {
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
                  />
                );
              })}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCard;
