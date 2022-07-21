import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardHeader,
  Typography,
} from "@mui/material";

const ProfileCard = ({ profile }) => {
  return (
    <Card >
      <CardMedia
        sx={{
          height: "160px",
          width: "160px",
          objectFit: "scale-down",
          justifyContent:"center",
          borderRadius:"50%"
        }}
        component="img"
        image={`http://localhost:8000/storage/profile_images/${profile.profile_photo}`}
      />
      <CardContent style={{ display: "flex", justifyContent: "left" }}>
        <div>
          <Typography variant="h5" color="text.primary">
            {profile.name}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
