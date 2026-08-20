import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import API from '../../api';

const blog_image_url = "http://localhost/laravel8/public/upload/Blog/image/";

function Blog() {
  const [getItem, setItem] = useState({});

  useEffect(() => {
    API.get('/blog')
      .then((response) => {
        setItem(response.data.blog);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function fetchData() {
    if (Object.keys(getItem).length > 0) {
      return getItem.data.map((value) => (
        <article className="single-blog-post" key={value.id}>
          <h3>{value.title}</h3>
          <div className="post-meta">
            <ul>
              <li><i className="fa fa-user"></i> Author {value.id_auth}</li>
              <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
              <li><i className="fa fa-calendar"></i> {value.created_at}</li>
            </ul>
            <span>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-half-o"></i>
            </span>
          </div>
          <Link to={`/blog/detail/${value.id}`}>
            <img src={blog_image_url + value.image} alt={value.title} />
          </Link>
          <p>{value.description}</p>
          <Link className="btn btn-primary" to={`/blog/detail/${value.id}`}>Read More</Link>
        </article>
      ));
    }
  }

  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>
        {fetchData()}
      </div>
    </div>
  );
}

export default Blog;
