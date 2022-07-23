import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const ProfileCard = ({ profile }) => {
  return (
    <div style={{display:"flex",justifyContent:"center",position:"relative",top:"70px"}}>
      <Card>
        <CardMedia
          sx={{
            height: "160px",
            width: "160px",
            margin:"2rem",
            objectFit: "scale-down",
            justifyContent: "center",
            borderRadius: "50%",
            marginBottom:"0"
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
    </div>
  );
};

export default ProfileCard;
