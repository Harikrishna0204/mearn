import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Validation
    if (!email.trim() || !password.trim()) {
      alert("❌ Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      console.log("📤 Logging in with:", { email });
      
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: email.trim(),
        password: password.trim(),
      });

      console.log("✅ Login response:", res.data);
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("✅ Login successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("❌ Login error:", err);
      const errorMsg = err.response?.data?.message || "Invalid credentials";
      alert(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>🎬 SubTracker Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />

        <button 
          className="login-btn" 
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="register-text">
          Don't have an account? 
          <span 
            onClick={() => window.location.href = "/register"}
            style={{ cursor: "pointer", color: "#6c63ff" }}
          >
            {" "}Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;