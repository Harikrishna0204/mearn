import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("❌ Please fill all fields");
      return;
    }

    if (password.length < 6) {
      alert("❌ Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      console.log("📤 Registering user:", { name, email });
      
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      console.log("✅ Registration response:", res.data);
      alert("✅ Registered Successfully! Redirecting to login...");
      
      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      
      // Redirect to login
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      console.error("❌ Registration error:", err);
      const errorMsg = err.response?.data?.message || "Registration failed";
      alert(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>🚀 Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />

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
          placeholder="Password (min 6 chars)"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />

        <button 
          className="login-btn" 
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="register-text">
          Already have an account? 
          <span onClick={() => window.location.href = "/"} style={{ cursor: "pointer", color: "#6c63ff" }}>
            {" "}Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;