import { useState } from "react";
import API from "../../api";

function Register() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    phone: "",
    address: "",
  });

  const [avatar, setAvatar] = useState("");
  const [file, setFile] = useState();
  const [err, setErr] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleUserInputFile = (e) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const selectedFile = files[0];
    const type = ["png", "jpg", "jpeg"];
    const selectedExtensionFile = selectedFile.name.split(".").pop().toLowerCase();

    if (!type.includes(selectedExtensionFile)) {
      setErr({
        ...err,
        avatar: "Avatar không phải là file hình ảnh png, jpg hoặc jpeg",
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

    setFile(selectedFile);

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

    const newErr = {};

    if (!form.name) {
      newErr.name = "Name không được để trống";
    }

    if (!form.email) {
      newErr.email = "Email không được để trống";
    }

    if (!form.password) {
      newErr.password = "Password không được để trống";
    }

    if (!form.phone) {
      newErr.phone = "Phone không được để trống";
    }

    if (!form.address) {
      newErr.address = "Address không được để trống";
    }

    if (!avatar) {
      newErr.avatar = "Avatar không được để trống";
    }

    setErr(newErr);

    if (Object.keys(newErr).length > 0) {
      return;
    }

    const data = {
      name: form.name,
      email: form.email,
      password: form.password,
      phone: form.phone,
      address: form.address,
      avatar: avatar,
      level: 0,
    };

    console.log("Data gửi API:", data);

    API.post("register", data)
      .then((res) => {
        if (res.data.errors) {
          setErr(res.data.errors);
          return;
        }

        alert("Đăng ký thành công!");
      })
      .catch((err) => {
        if (err.response?.data?.errors) {
          setErr(err.response.data.errors);
        }
      });
  };

  return (
    <>
      <div className="signup-form">
        <h2>New User Signup!</h2>

        <form
          onSubmit={handleSubmit}
          action="#"
          encType="multipart/form-data"
        >
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />
          <p>{err.email}</p>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
          <p>{err.name}</p>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <p>{err.password}</p>

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />
          <p>{err.phone}</p>

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />
          <p>{err.address}</p>

          <input
            type="file"
            name="avatar"
            accept="image/png,image/jpeg"
            onChange={handleUserInputFile}
          />

          <p>{err.avatar}</p>

          <button type="submit" className="btn btn-default">
            Signup
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;