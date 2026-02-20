import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Snackbar from "../components/Snackbar";
import Loader from "../components/Loader";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ message: "", type: "success" });


  /* 🔁 REDIRECT BY ROLE */
  const redirectByRole = (role) => {
    if (role === "ADMIN") navigate("/admin/dashboard");
    else navigate("/dashboard");
  };

  /* 🔐 EMAIL LOGIN */
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email: email.trim(),
        password: password.trim(),
      });


      if (!res.data.token) {
  throw new Error("Token not received from server");
}
      console.log("LOGIN RESPONSE:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      console.log("User role:", res.data.user.role); // Debugging line
       setSnackbar({
    message: "Login successful",
    type: "success",
  });

      redirectByRole(res.data.user.role);
    } catch (err) {
      setSnackbar({
        message: err.response?.data?.message || "Login failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  /* 🔐 EMAIL SIGNUP */
  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      localStorage.setItem("token", res.data.token);
       localStorage.setItem("role", res.data.user.role); // Store role for redirection

      redirectByRole(res.data.user.role);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="login-container">
  <div className="login-card">
    <div className="login-left">
      <h2>{isSignup ? "Create your account" : "Welcome Back 👋"}</h2>
      <p className="subtitle">
        {isSignup ? "Sign up to get started" : "Sign in to continue"}
      </p>

      {isSignup && (
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={isSignup ? handleSignup : handleLogin} disabled={loading}>
        {loading ? "Please wait..." : isSignup ? "Create Account" : "Login"}
      </button>

      <p className="toggle">
        {isSignup ? "Already have an account?" : "New here?"}{" "}
        <span onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Login" : "Create account"}
        </span>
      </p>
    </div>

    <div className="login-right">
      <h1>Product Management</h1>
      <p>Secure • Scalable • Role-Based</p>
    </div>
  </div>
  {loading && <Loader />}
{snackbar && (
  <Snackbar
    message={snackbar.message}
    type={snackbar.type}
    onClose={() => setSnackbar(null)}
  />
)}
</div>


  );
}

export default Login;