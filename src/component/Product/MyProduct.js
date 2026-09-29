import { useState, useEffect } from "react";
import { Link } from "react-router";
import API from "../../api";

const product_image_url = "http://localhost/laravel8/public/upload/product/";

function MyProduct() {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        getMyProduct();
    }, []);

    const getMyProduct = () => {
        const auth = localStorage.getItem("auth");
        const token = localStorage.getItem("token");

        if (!auth) {
            alert("Bạn chưa đăng nhập!");
            return;
        }

        let authData;
        try {
            authData = JSON.parse(auth);
        } catch (error) {
            console.log("Lỗi auth: ", error);
            return;
        }

        const config = {
             headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json",
            },
        };

        API.get("user/my-product", config)
        .then((res) => {
            console.log("My Product: ", res.data.data);
            setProduct(res.data.data);
        })
        .catch((err) => {
            console.log("Lỗi lấy danh sách product: ", err.response?.data);
        })
    }

    const getImage = (img) => {
        if (!img) {
            return "";
        }

        try {
            const image = JSON.parse(img);

            if (Array.isArray(image) && image.length > 0) {
                return image[0];
            }

            return "";
        } catch (error) {
            console.log("Lỗi khi parse image: ", error);
            return "";
        }
    }

    const handleDelete = (id) => {
        const confirmDlt = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
        if (!confirmDlt) {
            return;
        }

        const token = localStorage.getItem("token");
        const config = {
        headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
        },
        };

        API.get("/user/product/delete/" + id, config)
        .then((res) => {
            console.log("Delete: ", res.data);
            alert("Xóa thành công!");
            getMyProduct();
        })
        .catch((err) => {
            console.log("Lỗi xóa: ", err.response?.data);
            alert("Xóa thất bại");
        })
    }
  return (
    <>
      <div className="col-sm-9">
        <div className="table-responsive cart_info">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {product.length > 0 ? (
                    product.map((value) => {
                        const image = getImage(value.image);

                        return (
                            <tr key={value.id}>
                                <td>
                                    {value.id}
                                </td>
                                <td>
                                    {value.name}
                                </td>
                                <td>
                                    {image ? (
                                        <img src={product_image_url + JSON.parse(localStorage.getItem("auth")).id + "/" + image} 
                                        alt={value.name}
                                        style={{
                                            width: "60px",
                                            height: "60px",
                                            objectFit: "cover",
                                        }}></img>
                                    ) : ("Không có hình ảnh")}
                                </td>
                                <td>
                                    {value.price}
                                </td>
                                <td>
                                    <Link to={"/account/product/edit/" + value.id} className="btn btn-sm btn-primary" style={{marginRight: "10px"}}><i className="fa fa-edit"></i></Link>
                                    <button type="button" className="btn btn-sm btn-danger" ><i className="fa fa-times" onClick={() => handleDelete(value.id)}></i></button>
                                </td>
                            </tr>
                        )
                    })
                ) : (
                    <tr>
                        <td colSpan="5" style={{textAlign: "center"}}>
                            Bạn chưa có sản phẩm nào
                        </td>
                    </tr>
                )}
            </tbody>
          </table>
        </div>
        <div>
            <Link to="/account/product/add" className="btn btn-warning">Add New</Link>
        </div>
      </div>
    </>
  );
}

export default MyProduct;
