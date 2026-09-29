import { useEffect, useState } from "react";
import { useParams } from "react-router";
import parse from "html-react-parser";
import API from "../../api";
import Rate from "./Rate";

const blog_image_url = "http://localhost/laravel8/public/upload/Blog/image/";

const user_avatar_url = "http://localhost/laravel8/public/upload/user/avatar/";

function BlogDetail() {
  const params = useParams();
  const [data, setData] = useState("");

  const [comment, setComment] = useState("");
  const [listCmt, setListCmt] = useState([]);
  const [idCmt, setIdCmt] = useState(0);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("auth");

    if (data) {
      try {
        setAuth(JSON.parse(data));
      } catch (error) {
        console.log("Lỗi: ", error);
      }
    }
  }, []);

  useEffect(() => {
    API.get("/blog/detail/" + params.id)
      .then((response) => {
        console.log("Blog detail:", response.data);
        setData(response.data.data);
        setListCmt(response.data.data.comment || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.id]);

  function renderBlogDetail() {
    if (Object.keys(data).length > 0) {
      return (
        <article className="single-blog-post">
          <h3>{data.title}</h3>

          <div className="post-meta">
            <ul>
              <li>
                <i className="fa fa-user"></i> Author {data.id_auth}
              </li>

              <li>
                <i className="fa fa-clock-o"></i> 1:33 pm
              </li>

              <li>
                <i className="fa fa-calendar"></i> {data.created_at}
              </li>
            </ul>
          </div>

          <img src={blog_image_url + data.image} alt={data.title} />

          <p>{data.description}</p>

          <div>{parse(data.content)}</div>
        </article>
      );
    }
  }

  function handleReply(id) {
    const token = localStorage.getItem("token");
    const auth = localStorage.getItem("auth");

    if (!token || !auth) {
      alert("Vui lòng đăng nhập để bình luận");
      return;
    }

    setIdCmt(id);
    setComment("");
  }

  function handleCancelReply() {
    setIdCmt(0);
    setComment("");
  }

  function handlePostComment() {
    const token = localStorage.getItem("token");
    const auth = localStorage.getItem("auth");

    if (!token || !auth) {
      alert("Vui lòng đăng nhập để bình luận");
      return;
    }

    let authData;

    try {
      authData = JSON.parse(auth);
    } catch (error) {
      console.log(error);
      alert("Đăng nhập thất bại");
      return;
    }

    if (!comment.trim()) {
      alert("Vui lòng nhập bình luận!");
      return;
    }

    const formData = new FormData();
    formData.append("id_blog", params.id);
    formData.append("id_user", authData.id);
    formData.append("name_user", authData.name);
    formData.append("id_comment", idCmt);
    formData.append("comment", comment.trim());
    formData.append("image_user", authData.avatar || "");

    const config = {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    };

    API.post("/blog/comment/" + params.id, formData, config)
      .then((res) => {
        console.log("Comment response:", res.data);

        const newCmt = res.data.data;

        if (newCmt) {
          setListCmt((oldCmt) => [...oldCmt, newCmt]);
        }

        setComment("");
        setIdCmt(0);

        alert("Bình luận thành công");
      })
      .catch((err) => {
        console.log("Response error:", err.response?.data);
        alert("Có lỗi xảy ra khi bình luận");
      });
  }

  function renderComments() {
    const parentComments = listCmt.filter(
      (item) => Number(item.id_comment) === 0,
    );

    return parentComments.map((item) => {
      const childComments = listCmt.filter(
        (child) => Number(child.id_comment) === Number(item.id),
      );

      return (
        <li className="media" key={item.id}>
          <a className="pull-left" href="#!">
            <img
              className="media-object"
              src={user_avatar_url + item.image_user}
              alt={item.name_user}
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "50%",
                display: "block",
              }}
            />
          </a>
          <div className="media-body">
            <ul className="sinlge-post-meta">
              <li>
                <i className="fa fa-user"></i>
                {item.name_user}
              </li>
              <li>
                <i className="fa fa-clock-o"></i>
                1:33 pm
              </li>
              <li>
                <i className="fa fa-calendar"></i>
                {item.created_at}
              </li>
            </ul>
            <p>{item.comment}</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleReply(item.id)}
            >
              <i className="fa fa-reply"></i>
              Reply
            </button>

            {childComments.length > 0 && (
              <ul className="media-list">
                {childComments.map((child) => (
                  <li className="media second-media" key={child.id}>
                    <a className="pull-left" href="#!">
                      <img
                        className="media-object"
                        src={user_avatar_url + child.image_user}
                        alt={child.name_user}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "50%",
                          display: "block",
                        }}
                      />
                    </a>

                    <div className="media-body">
                      <ul className="sinlge-post-meta">
                        <li>
                          <i className="fa fa-user"></i>
                          {child.name_user}
                        </li>

                        <li>
                          <i className="fa fa-clock-o"></i>
                          1:33 pm
                        </li>

                        <li>
                          <i className="fa fa-calendar"></i>
                          {child.created_at}
                        </li>
                      </ul>
                      <p>{child.comment}</p>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleReply(child.id)}
                      >
                        <i className="fa fa-reply"></i>
                        Reply
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      );
    });
  }

  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>
        {renderBlogDetail()}
      </div>
      <div className="rating-area">
        <ul className="ratings">
          <li className="rate-this">Rate this item:</li>
          <li style={{ display: "inline-block", verticalAlign: "middle" }}>
            <Rate blogId={params.id} />
          </li>

          <li className="color">(6 votes)</li>
        </ul>

        <ul className="tag">
          <li>TAG:</li>

          <li>
            <a className="color" href="#!">
              Pink <span>/</span>
            </a>
          </li>

          <li>
            <a className="color" href="#!">
              T-Shirt <span>/</span>
            </a>
          </li>

          <li>
            <a className="color" href="#!">
              Girls
            </a>
          </li>
        </ul>
      </div>
      <div className="socials-share">
        <a href="#!">
          <img src="/frontend/images/blog/socials.png" alt="Share this post" />
        </a>
      </div>
      <div className="response-area">
        <h2>{listCmt.length} RESPONSES</h2>

        <ul className="media-list">{renderComments()}</ul>
      </div>
      <div className="replay-box">
        <div className="row">
          <div className="col-sm-12">
            <h2>{idCmt !== 0 ? "Reply Comment" : "Leave a replay"}</h2>
            {idCmt !== 0 && (
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                <span>Đang trả lời comment #{idCmt}</span>

                <button
                  type="button"
                  onClick={handleCancelReply}
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Hủy
                </button>
              </div>
            )}

            <div className="text-area">
              <div className="blank-arrow">
                <label>Your Name</label>
              </div>

              <span>*</span>
              <textarea
                name="message"
                rows="11"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={
                  idCmt !== 0 ? "Nhập nội dung reply..." : "Nhập bình luận..."
                }
              ></textarea>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handlePostComment}
              >
                post comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
