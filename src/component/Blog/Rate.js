import { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import API from "../../api";

export default function App({ blogId }) {
  const [rating, setRating] = useState(0);

  useEffect(() => {
  if (!blogId) return;

  API.get("/blog/rate/" + blogId)
    .then((res) => {
      console.log("API rating:", res.data);
      const rate = res.data.data;
      if (rate) {
        setRating(Number(rate.rate));
      } else {
        setRating(0);
      }
    })
    .catch((err) => {
      console.log("Lỗi lấy rating:", err);
    });
}, [blogId]);

  const handleRating = (rate) => {
    const token = localStorage.getItem("token");
    const auth = localStorage.getItem("auth");

    if (!token || !auth) {
      alert("Vui lòng đăng nhập để đánh giá");
      return;
    }

    let authData;

    try {
      authData = JSON.parse(auth);
    } catch (error) {
      console.log(error);
      alert("Thông tin không hợp lệ");
      return;
    }

    const userId =
      authData?.id ||
      authData?.user?.id ||
      authData?.data?.id;

    if (!userId) {
      alert("Không tìm thấy thông tin ID người dùng!");
      return;
    }

    const formData = new FormData();

    formData.append("user_id", userId);
    formData.append("blog_id", blogId);
    formData.append("rate", rate);

    const config = {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    };

    API.post("/blog/rate/" + blogId, formData, config)
  .then((res) => {
    console.log("POST rating response:", res.data);
    console.log("Rating gửi lên:", rate);

    setRating(rate);

    alert("Đánh giá thành công");
  })
  .catch((err) => {
    console.log("Lỗi đánh giá:", err);
  });
  };

  return (
    <>
      <Rating
        onClick={handleRating}
        initialValue={rating}
        size={35}
        transition
        fillColor="gold"
        emptyColor="gray"
      />
    </>
  );
}