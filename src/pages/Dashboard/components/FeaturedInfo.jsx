import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
const FeaturedInfo = ({ title, amount }) => {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <Typography>{amount}</Typography>
      </CardContent>
    </Card>
  );
};

export default FeaturedInfo;
