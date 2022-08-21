import { React } from "react";
import { List, Typography } from "@mui/material";
import PostReview from "./PostReview";
import AuthUser from "../../../../services/AuthUser";
import ReviewItem from "./ReviewItem";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ReviewsContent = ({ reviews, setReviews, fetchReviews }) => {
  const { getToken } = AuthUser();
  const { id } = useParams();
  const userID = useSelector((state) => state.user.user.id);

  return (
    <div>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {reviews.map((review) => {
          if (review.length) {
            return <Typography>No Reviews Posted Yet</Typography>;
          } else {
            return (
              <ReviewItem
                key={review.id}
                review={review}
                reviews={reviews}
                setReviews={setReviews}
                fetchReviews={fetchReviews}
              ></ReviewItem>
            );
          }
        })}

        {!getToken() ||  userID == id ?  [] : <PostReview fetchReviews={fetchReviews} />}
      </List>
    </div>
  );
};

export default ReviewsContent;
