import { useEffect, useState } from "react";
import { useParams } from "react-router";
import parse from "html-react-parser";
import API from "../../api";

const blog_image_url = "http://localhost/laravel8/public/upload/Blog/image/";

function BlogDetail() {
  const params = useParams();
  const [data, setData] = useState("");

  useEffect(() => {
    API.get("/blog/detail/" + params.id)
      .then((response) => {
        setData(response.data.data);
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

  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>
        {renderBlogDetail()}
      </div>

      <div className="rating-area">
        <ul className="ratings">
          <li className="rate-this">Rate this item:</li>
          <li>
            <i className="fa fa-star color"></i>
            <i className="fa fa-star color"></i>
            <i className="fa fa-star color"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
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
    </div>
  );
}

export default BlogDetail;
