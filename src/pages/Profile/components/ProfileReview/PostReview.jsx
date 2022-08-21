import { React, useState } from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Rating,
  Avatar,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useForm, Controller, FormProvider } from "react-hook-form";
import ApiService from "../../../../services/Api";

const PostReview = ({ fetchReviews }) => {
  const profile = useSelector((state) => state.user.user);
  const clickedUser = useSelector((state) => state.clickedUser.clickedUser);
  const [ratingValue, setRatingValue] = useState(0);
  const { httprequestwtoken } = ApiService();
  

  const form = useForm({ defaultValues: { review: "" } });

  const onSubmit = (data) => {
    data.rating = ratingValue;
    //api call
    httprequestwtoken.post(`/review/${clickedUser.id}`, data).then(
      (res) => {
        console.log(res.data);
        fetchReviews();
        form.reset();
        setRatingValue(0);
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar
          alt="Remy Sharp"
          src={`http://localhost:8000/storage/profile_images/${profile.profile_photo}`}
        />
      </ListItemAvatar>
      <ListItemText
        sx={{ alignItem: "flex-start" }}
        primary={profile.name}
        secondary={
          <Stack>
            <Rating
              defaultValue={0}
              size="small"
              value={ratingValue}
              onChange={(event, newValue) => {
                setRatingValue(newValue);
              }}
              sx={{ marginBottom: 2 }}
            />
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Controller
                  name="review"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <TextField
                      label="Add a review"
                      variant="outlined"
                      fullWidth="100%"
                      sx={{ width: "100%" }}
                      onChange={onChange}
                      onBlur={onBlur}
                      ref={ref}
                      value={value}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {value == "" ? (
                              <Button type="submit" disabled>
                                POST
                              </Button>
                            ) : (
                              <Button type="submit">POST</Button>
                            )}
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </form>
            </FormProvider>
          </Stack>
        }
      />
    </ListItem>
  );
};

export default PostReview;
