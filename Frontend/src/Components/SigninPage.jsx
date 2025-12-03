import { useState } from "react";
import PropTypes from "prop-types";
import "./LoginPage.css";

const SigninPage = ({ switchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const fullName = e.target.fullName.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (!fullName || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:2025/api';
      const response = await fetch(`${apiBaseUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: fullName,
          email: email,
          password: password
        })
      });

      if (response.ok) {
        // ✅ Store full name in localStorage
        localStorage.setItem("username", fullName);
        localStorage.setItem("user", JSON.stringify({ fullName, email }));

        alert(`Welcome, ${fullName}`);
        window.location.reload(); // ✅ Refresh to update Navbar with username
      } else {
        const errorText = await response.text();
        alert(`Sign up failed: ${errorText}`);
      }
    } catch (error) {
      console.error("Sign up error:", error);
      alert("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSignUp}>
        <h2 className="title">Create Account</h2>
        <p className="subtitle">Please fill in the details to sign up</p>

        <input
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          required
          className="input-field"
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="input-field"
        />

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            required
            className="input-field"
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            onKeyDown={(e) => e.key === 'Enter' && setShowPassword(!showPassword)}
            role="button"
            tabIndex={0}
            aria-label="Toggle password visibility"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <div className="password-container">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password"
            required
            className="input-field"
          />
          <span
            className="toggle-password"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            onKeyDown={(e) => e.key === 'Enter' && setShowConfirmPassword(!showConfirmPassword)}
            role="button"
            tabIndex={0}
            aria-label="Toggle confirm password visibility"
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <div className="footer-text">
          Already have an account?{" "}
          <span className="link" onClick={switchToLogin}>Login</span>
        </div>
      </form>
    </div>
  );
};

SigninPage.propTypes = {
  switchToLogin: PropTypes.func.isRequired
};

export default SigninPage;
