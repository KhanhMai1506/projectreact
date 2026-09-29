import { useEffect, useState } from "react";
import API from "../../api";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    status: "1",
    sale: "0",
    company: "",
    detail: "",
  });

  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [avatar, setAvatar] = useState({});

  useEffect(() => {
   getCategoryBrand();
  }, []);

  const getCategoryBrand = async() => {
    try {
        const res = await API.get("/category-brand");
        setCategory(res.data.category);
        setBrand(res.data.brand);
    } catch (error) {
        console.log("Lỗi lấy dữ liệu:", error);
    }
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setProduct({
        ...product,
        [name]: value
    })
  }

  const handleSelect = (e) => {
    const { name, value } = e.target;
    setProduct({
        ...product,
        [name]: value
    })
  }

  const handleImage = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 3) {
        alert("Chỉ upload tối đa 3 ảnh!");
        e.target.value = "";
        return;
    }

    for (let file of files) {
        if (file.type !== "image/jpeg" && file.type !== "image/jpg" && file.type !== "image/png") {
            alert("Chỉ được upload định dạng JPG, JPEG và PNG");
            e.target.value = "";
            return;
        }

        if (file.size >= 1024 * 1024) {
            alert("Mỗi hình ảnh phải nhỏ hơn 1MB");
            e.target.value = "";
            return;
        }
    }

        const newAvt = {};
        files.forEach((file, index) => {
            newAvt[index] = file;
        });

        setAvatar(newAvt);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem("token");
        console.log("Token: ", token);

        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price);
        formData.append("category", product.category);
        formData.append("brand", product.brand);
        formData.append("status", product.status);
        formData.append("sale", product.sale);
        formData.append("company", product.company);
        formData.append("detail", product.detail);

        Object.keys(avatar).map((item) => {
            formData.append("file[]", avatar[item]);
        })

        console.log("Dữ liệu gửi:", product);
        console.log("Ảnh:", avatar);

        const config = {
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json",
            },
        };
        
        const res = await API.post("/user/product/add", formData, config)
        console.log("Thêm sản phẩm: ", res.data);
        alert("Thêm sản phẩm thành công")
    } catch (error) {
        console.log("Lỗi thêm sản phẩm: ", error);
        if (error.response) {
            console.log("Response:", error.response.data);
        }
    }
  }

  return (
    <>
      <div className="col-sm-9">
        <div className="blog-post-area">
          <div className="signup-form">
            <h2>Create Product!</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Name" value={product.name} onChange={handleInput}/>
              <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleInput}/>
              <select name="category" value={product.category} onChange={handleSelect}>
                <option value="">Please choose category</option>
                {category.map((value) => (
                    <option key={value.id} value={value.id}>
                        {value.category}
                    </option>
                ))}
              </select>
              <select name="brand" value={product.brand} onChange={handleSelect}>
                <option value="">Please choose brand</option>
                {brand.map((value) => (
                    <option key={value.id} value={value.id}>
                        {value.brand}
                    </option>
                ))}
              </select>
              <select name="status" value={product.status} onChange={handleSelect}>
                <option value="1">New</option>
                <option value="0">Sale</option>
              </select>
              {product.status === "0" && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }} >
                <input type="number" name="sale" value={product.sale} onChange={handleInput} min="0" max="100" placeholder="Sale" style={{ width: "150px" }}/>
                <span>%</span>
              </div>
              )}
              <input type="text" name="company" value={product.company} onChange={handleInput} placeholder="Company Profile" />
              <input type="file" accept="image/jpeg,image/jpg,image/png" multiple onChange={handleImage}/>
              <textarea rows={8} name="detail" value={product.detail} onChange={handleInput} placeholder="Detail" />
              <button type="submit" className="btn btn-default">
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
