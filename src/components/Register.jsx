import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register_route } from "../api/routes";
import ReactSVG from "../assets/react.svg";

function Register() {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
  });
  const [authRes, setAuthRes] = useState(null);

  const handleInputs = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(register_route, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerForm),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/");
      } else {
        setAuthRes(data.message);
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
        <label className="font-header font-poppins font-bold mb-3">
          Register
        </label>
        <form onSubmit={handleSubmission}>
          <input
            type="email"
            name="email"
            value={registerForm.email}
            onChange={handleInputs}
          />
          <input
            type="password"
            name="password"
            value={registerForm.password}
            onChange={handleInputs}
          />
          {authRes && (
            <label className="text-red text-center font-poppins">
              {authRes}
            </label>
          )}
          <button type="submit">Register</button>
          <Link to="/" className="text-center td-none font-poppins mt-2 center-link register-link">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;