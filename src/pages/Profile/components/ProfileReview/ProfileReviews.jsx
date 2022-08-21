import { React, useEffect } from "react";
import { Card, CardHeader, CardContent, Divider } from "@mui/material";
import TotalRatings from "./TotalRatings";
import ReviewsContent from "./ReviewsContent";
import ApiService from "../../../../services/Api";
import { useState } from "react";
import { useSelector
 } from "react-redux";
const ProfileReviews = () => {
  const { httprequest } = ApiService();
  const [reviews, setReviews] = useState([]);
  const profile = useSelector((state) => state.user.user);
  const clickedUser = useSelector((state) => state.clickedUser.clickedUser);

  let id;

  if(profile.id == clickedUser.id){
    id=profile.id;
  }else{
    id=clickedUser.id;
  }
  
  const fetchReviews = () => {
    httprequest.get(`/review/${id}`).then(
      (res) => {
        setReviews(res.data);
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <Card>
      <CardHeader title="Review" />
      <Divider />
      <CardContent sx={{ justifyContent: "center", display: "flex" }}>
        <TotalRatings reviews={reviews}></TotalRatings>
      </CardContent>
      <Divider />
      <CardContent>
        <ReviewsContent reviews={reviews} setReviews={setReviews} fetchReviews={fetchReviews}></ReviewsContent>
      </CardContent>
    </Card>
  );
};

export default ProfileReviews;
