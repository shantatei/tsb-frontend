import React from "react";
import { Typography, Stack, Rating } from "@mui/material";

const TotalRatings = ({ reviews }) => {
  const sum = reviews.reduce((accumulator, object) => {
    return accumulator + object.rating;
  }, 0);
  const average = sum / reviews.length;
  return (
    <>
      {reviews.length == 0 ? (
        <Typography>No Reviews Posted Yet</Typography>
      ) : (
        <Stack textAlign="center">
          <Typography variant="h3">{average.toFixed(2)}/5</Typography>
          <Rating value={average.toFixed(2)} readOnly></Rating>
          <Typography variant="body">{reviews.length} reviews</Typography>
        </Stack>
      )}
    </>
  );
};

export default TotalRatings;
