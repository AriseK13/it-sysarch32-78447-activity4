import { Link } from "react-router-dom";
import { useState } from "react";
import { login_route } from "../api/routes.js";
import ReactSVG from "../assets/react.svg";
function Login() {
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const [authRes, setAuthRes] = useState(null);

  const handleInputs = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(login_route, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formLogin),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        window.location.href = "/products";
      } else {
        setAuthRes("Please Try Again!");
      }
    } catch (error) {
      console.log(error);
      setAuthRes("Please Try Again");
    }
  };

  return (
    <div className="wrapper">
      <div className="side">
      <img className="image-absolute" src="https://i.pinimg.com/736x/d6/17/65/d61765bcf71b83f38d704d480a5e319f.jpg" alt="Descriptive Text" />
        <div className="desc-relative">
          <label className="big-header font-poppins">Black Market</label>
          <label className="big-subheader font-poppins text-gray">
            Buy and Sell
          </label>
        </div>
      </div>
      <div className="main">
      <div className="login-container">
        <label className="font-header font-poppins font-bold mb-3">Login</label>
        <form onSubmit={handleSubmission}>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={formLogin.email}
            onChange={handleInputs}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formLogin.password}
            onChange={handleInputs}
            required
          />
          {authRes && (
            <label className="text-red text-center font-poppins ">
              {authRes}
            </label>
          )}
          <button className="font-poppins" type="submit">
            Login
          </button>
          <Link
            to="/register"
            className="text-center td-none font-poppins mt-2 center-link register-link"
          >
            Register Here
          </Link>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Login;
