import { useEffect, useState } from "react";
import API from "../../api";

const user_avatar_url =
  "http://localhost/laravel8/public/upload/user/avatar/";

function Update() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [avatar, setAvatar] = useState("");
  const [err, setErr] = useState({});

  useEffect(() => {
    const auth = localStorage.getItem("auth");

    if (auth) {
      try {
        const data = JSON.parse(auth);

        setUser({
          name: data.name || "",
          email: data.email || "",
          password: "",
          phone: data.phone || "",
          address: data.address || "",
        });

        setAvatar(data.avatar || "");
      } catch (error) {
        console.log("Lỗi lấy thông tin user", error);
      }
    }
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleAvatar = (e) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const selectedFile = files[0];

    const allowedExtensions = ["png", "jpg", "jpeg"];

    const extension = selectedFile.name
      .split(".")
      .pop()
      .toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      setErr({
        ...err,
        avatar: "Avatar phải là file png, jpg hoặc jpeg",
      });

      return;
    }

    if (selectedFile.size >= 1024 * 1024) {
      setErr({
        ...err,
        avatar: "Dung lượng avatar phải nhỏ hơn 1MB",
      });

      return;
    }

    setErr({
      ...err,
      avatar: "",
    });

    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result);
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const auth = localStorage.getItem("auth");

    if (!token || !auth) {
      alert("Vui lòng đăng nhập");
      return;
    }

    let authData;

    try {
      authData = JSON.parse(auth);
    } catch (error) {
      console.log(error);
      alert("Thông tin đăng nhập không hợp lệ");
      return;
    }

    const data = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      password: user.password,
      avatar: avatar,
    };
    
    const config = {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    };

    API.post("user/update/" + authData.id, data, config)
      .then((res) => {
        console.log("Update:", res.data);

        if (res.data.errors) {
          setErr(res.data.errors);
          return;
        }

        alert("Cập nhật thông tin thành công");

        const updatedAuth = res.data.Auth;

        localStorage.setItem("auth", JSON.stringify(updatedAuth));
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }

        setUser({
          name: updatedAuth.name || "",
          email: updatedAuth.email || "",
          password: "",
          phone: updatedAuth.phone || "",
          address: updatedAuth.address || "",
        });

        setAvatar(updatedAuth.avatar || "");
      })
      .catch((err) => {
        console.log("Lỗi khi cập nhật thông tin:", err.response?.data);
        if (err.response?.data?.errors) {
          setErr(err.response.data.errors);
        }
        alert("Cập nhật thất bại");
      });
  };

  return (
    <>
      <div className="col-sm-9">
        <div className="signup-form">
          <h2>Update User!</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={user.name}
              onChange={handleInput}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              readOnly
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleInput}
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={user.address}
              onChange={handleInput}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={user.phone}
              onChange={handleInput}
            />

            <input
              type="file"
              name="avatar"
              accept="image/png,image/jpeg"
              onChange={handleAvatar}
            />

            <p>{err.avatar}</p>

            <button
              type="submit"
              className="btn btn-default"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Update;