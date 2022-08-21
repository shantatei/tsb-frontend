import { React, useState } from "react";
import {
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Rating,
  TextField,
  Typography,
  Stack,
  Menu,
  Divider,
  MenuItem,
  InputAdornment,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ApiService from "../../../../services/Api";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import Check from "@mui/icons-material/Check";
import { useForm, Controller, FormProvider } from "react-hook-form";

const ReviewItem = ({ review, reviews, setReviews, fetchReviews }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const { httprequestwtoken } = ApiService();
  const userID = useSelector((state) => state.user.user.id);
  const [isEditable, setIsEditable] = useState(false);
  const [ratingValue, setRatingValue] = useState(review.rating);

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setCurrentIndex(index);
  };
  const handleClose = (index) => {
    setAnchorEl(null);
    setCurrentIndex(null);
  };

  const deleteReview = (reviewid) => {
    httprequestwtoken.delete(`/review/${reviewid}/delete`).then(
      (res) => {
        console.log(res.data);
        let review = reviews.filter((e) => e.id != reviewid);
        setReviews(review);
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  const editReview = (data) => {
    data.rating = ratingValue;
    data._method = "PUT";
    setIsEditable(false);
    console.log(data);
    httprequestwtoken.post(`/review/${review.id}/update`, data).then(
      (res) => {
        console.log(res.data);
        fetchReviews();
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  const form = useForm({ defaultValues: { review: review.review } });

  return (
    <Stack direction={"row"} alignItems="center">
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt={review.user.name}
            src={`http://localhost:8000/storage/profile_images/${review.user.profile_photo}`}
          />
        </ListItemAvatar>
        <ListItemText
          primary={review.user.name}
          secondary={
            <Stack>
              {isEditable ? (
                <Rating
                  sx={{ marginBottom: 2 }}
                  defaultValue={review.rating}
                  size="small"
                  value={ratingValue}
                  onChange={(event, newValue) => {
                    setRatingValue(newValue);
                  }}
                />
              ) : (
                <Rating
                  name="read-only"
                  value={review.rating}
                  size="small"
                  readOnly
                />
              )}

              {isEditable ? (
                <FormProvider {...form}>
                  <form onSubmit={form.handleSubmit(editReview)}>
                    <Controller
                      name="review"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <TextField
                          variant="outlined"
                          fullWidth="100%"
                          sx={{ width: "100%" }}
                          label="Update Review"
                          onChange={onChange}
                          onBlur={onBlur}
                          ref={ref}
                          defaultValue={review.review}
                          InputProps={{
                            endAdornment: (
                              <Stack direction="row">
                                <InputAdornment position="end">
                                  {value == "" ? (
                                    <IconButton type="submit" disabled>
                                      <CheckIcon />
                                    </IconButton>
                                  ) : (
                                    <IconButton type="submit">
                                      <CheckIcon />
                                    </IconButton>
                                  )}
                                </InputAdornment>
                                <InputAdornment position="end">
                                  <IconButton
                                    edge="end"
                                    id="menu-button"
                                    onClick={(e) => {
                                      setRatingValue(review.rating);
                                      setIsEditable(false);
                                    }}
                                  >
                                    <CloseIcon />
                                  </IconButton>
                                </InputAdornment>
                              </Stack>
                            ),
                          }}
                        />
                      )}
                    ></Controller>
                  </form>
                </FormProvider>
              ) : (
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {review.review}
                </Typography>
              )}
            </Stack>
          }
        />
      </ListItem>
      <Divider />
      <Menu
        anchorEl={anchorEl}
        open={currentIndex === review.id}
        onClose={() => handleClose(review.id)}
      >
        <MenuItem
          onClick={() => {
            handleClose(review.id);
            setIsEditable(true);
          }}
        >
          {" "}
          Edit
        </MenuItem>
        <MenuItem onClick={() => deleteReview(review.id)}>Delete</MenuItem>
      </Menu>

      {userID == review.user.id ? (
        isEditable ? (
          []
        ) : (
          <IconButton
            edge="end"
            id="menu-button"
            onClick={(e) => handleClick(e, review.id)}
          >
            <MoreVertIcon />
          </IconButton>
        )
      ) : (
        []
      )}
    </Stack>
  );
};

export default ReviewItem;
