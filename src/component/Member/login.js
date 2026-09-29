import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

function Login() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErr = {};

    if (!input.email) {
      newErr.email = "Vui lòng nhập email";
    }

    if (!input.password) {
      newErr.password = "Vui lòng nhập password";
    }

    setErr(newErr);

    if (Object.keys(newErr).length > 0) {
      return;
    }

    const data = {
      email: input.email,
      password: input.password,
      level: 0,
    };

    API.post("login", data)
      .then((res) => {
        console.log("Login response:", res.data);

        if (res.data.errors) {
          setErr(res.data.errors);
          return;
        }
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("auth", JSON.stringify(res.data.Auth));

        alert("Đăng nhập thành công");
        navigate("/");
      })
      .catch((err) => {
        console.log("Lỗi login:", err);
        console.log("Response error:", err.response?.data);
      });
  };

  return (
    <>
      <div className="login-form">
        <h2>Login to your account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={input.email}
            onChange={handleChange}
          />

          <p>{err.email}</p>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={input.password}
            onChange={handleChange}
          />

          <p>{err.password}</p>

          <button type="submit" className="btn btn-default">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;