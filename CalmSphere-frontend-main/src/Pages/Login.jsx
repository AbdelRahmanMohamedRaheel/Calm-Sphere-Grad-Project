import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";

const Login = () => {
  const { user, loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Redirect to home page if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await loginUser(username, password);
      if (success) {
        toast.success("Login successful!");
        navigate("/"); // Redirect to home after successful login
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container my-2 text-center">
      <div className="col-md-10 mx-auto col-lg-5">
        <img
          className="mb-2"
          src="src/assets/logo.png"
          alt=""
          width={330}
          height={300}
        />
        <h1 className="h3 mb-3 fw-normal">Login to your profile</h1>
        <form
          onSubmit={loginUser}
          className="p-4 p-md-5 border rounded-3 bg-light"
        >
          <div className="form-floating mb-3">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control my-2"
              id="floatingInput"
              required
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control my-2"
              id="floatingPassword"
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button 
          className="btn btn-primary w-100 my-2" type="submit">
            Login
          </button>
          <Link to={`/signup`} className="btn btn-outline-success w-100 my-2">
            Register New Account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
