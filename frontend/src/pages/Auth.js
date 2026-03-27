import React, { useState } from "react";
import axios from "axios";

// ✅ FIXED PORT (5001)
const API = "http://localhost:5000/api/auth";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        // 🔐 LOGIN
        const res = await axios.post(`${API}/login`, {
          email: email.trim(),
          password: password.trim(),
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        alert("Login Successful");

        window.location.href = "/dashboard";

      } else {
        // 📝 REGISTER
        await axios.post(`${API}/register`, {
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
        });

        alert("Registered Successfully");
        setIsLogin(true);
      }
    } catch (err) {
      console.error("FRONTEND ERROR:", err);

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Server not reachable (check backend / port / IP)");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>

      {!isLogin && (
        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        {isLogin ? "Login" : "Register"}
      </button>

      <p style={{ marginTop: "10px" }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span
          style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Register" : "Login"}
        </span>
      </p>
    </div>
  );
}

export default Auth;