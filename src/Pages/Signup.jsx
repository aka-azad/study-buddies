import { updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import auth from "../firebase/firebase.config";
import axios from "axios";
import AuthContext from "../Context/AuthContext";

const Signup = () => {
  const { setLoading, signUpWithEmailPassword } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    e.preventDefault();
    setError("");
    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);

      return;
    }
    setLoading(true);

    signUpWithEmailPassword(email, password)
      .then(() => {
        updateProfile(auth.currentUser, { displayName: name, photoURL });
        axios
          .post("https://study-buddies-server.vercel.app/users", {
            displayName: name,
            photoURL,
            email,
          })
          .then((res) => {
            if (res?.data?.insertedId) {
              toast.success("Successfully registered!");
              navigate("/");
            }
          });
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
            <span className="label-text">Photo URL</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
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
        {error && <p className="text-red-500">{error}</p>}
        <div className="form-control">
          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </div>
      </form>
      <div className="flex flex-col items-center mt-4">
        <p>
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
