import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import AuthContext from "../Context/AuthContext";

const Signin = () => {
  const { user, signInWithEmailPassword, signInWithGoogle, setLoading } =
    useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  if (user) {
    navigate(from);
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };

  const handleSubmit = (e) => {
    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);

      return;
    }
    setLoading(true);
    e.preventDefault();
    setError("");
    signInWithEmailPassword(email, password)
      .then(() => {
        setLoading(false);
        navigate(from);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const handleGoogleLogin = () => {
    setLoading(true);

    signInWithGoogle()
      .then((res) => {
        const userInfo = {
          displayName: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
        };
        setLoading(false);
        axios
          .post("https://study-buddies-server.vercel.app/users", userInfo)
          .then((res) => res.data)
          .then((data) => {
            data.insertedId && toast.success("Account Registered Successfully");
            navigate(from);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Log In</h1>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            className="input input-bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            className="input input-bordered"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <button type="submit" className="btn btn-primary w-full">
            Log In
          </button>
        </div>
      </form>
      <div className="divider max-w-sm mx-auto">OR</div>
      <div className="flex flex-col items-center mt-4">
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleGoogleLogin}
          className="btn btn-primary btn-circle"
        >
          <FcGoogle className="text-2xl" />
        </button>
        <p className="mt-2">
          {"Don't have an account? "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
