import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Navbar = ({ setCategory, setModalOpen }) => {
  const [theme, setTheme] = useState("light");
  const [username, setUsername] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Theme toggle logic
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-bs-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Logout logic
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("user");
    setUsername(null);
    window.location.reload();
  };

  // Load username and theme on mount
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedTheme = localStorage.getItem("theme") || "light";
    setUsername(storedUsername);
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-bs-theme", storedTheme);
  }, []);

  const categoryLinks = [
    { name: "Technology", value: "technology" },
    { name: "Business", value: "business" },
    { name: "Health", value: "health" },
    { name: "Sports", value: "sports" },
    { name: "Entertainment", value: "entertainment" }
  ];

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        theme === "dark" ? "bg-dark" : "bg-light"
      }`}
      data-bs-theme={theme}
      style={{
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        transition: "all 0.3s ease"
      }}
    >
      <div className="container-fluid" style={{ padding: "0.3rem 1.5rem" }}>
        <a
          className={`navbar-brand d-flex align-items-center gap-2`}
          href="#"
          style={{
            fontWeight: "700",
            fontSize: "1.1rem",
            transition: "transform 0.3s ease",
            textDecoration: "none"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <img 
            src="/logo.svg" 
            alt="News Aggregator Logo" 
            style={{
              width: "35px",
              height: "35px",
              objectFit: "contain",
              animation: "float 3s ease-in-out infinite"
            }}
          />
          <span className="badge fs-6" style={{
            background: "linear-gradient(135deg, #FF6B6B 0%, #FF3B30 100%)",
            color: "white",
            padding: "0.4rem 0.9rem",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(255, 59, 48, 0.3)",
            animation: "bounce 2s ease-in-out infinite"
          }}>
            News Aggregator
          </span>
        </a>

        {/* Hamburger Menu Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          style={{
            border: "none",
            outline: "none"
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ gap: "0.5rem" }}>
            {categoryLinks.map((category) => (
              <li className="nav-item" key={category.value}>
                <div
                  className="nav-link"
                  onClick={() => {
                    setCategory(category.value);
                    setIsMenuOpen(false);
                  }}
                  style={{
                    cursor: "pointer",
                    fontWeight: "500",
                    padding: "0.4rem 0.8rem",
                    borderRadius: "8px",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = theme === "dark" ? "#34495e" : "#e9ecef";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {category.name}
                </div>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-2">
            {/* User Info or Login Button */}
            {username ? (
              <div className="dropdown">
                <button
                  className="btn btn-success dropdown-toggle rounded-pill px-3 py-1"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    fontWeight: "500",
                    fontSize: "0.9rem",
                    transition: "all 0.3s ease"
                  }}
                >
                  👋 {username}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      🚪 Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <button
                className="btn btn-danger btn-sm d-flex align-items-center rounded-pill px-3 py-2"
                onClick={() => {
                  setModalOpen(true);
                  setIsMenuOpen(false);
                }}
                style={{
                  gap: "8px",
                  fontWeight: "500",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <i className="bi bi-person-circle fs-5"></i>
                <span>Login/SignUp</span>
              </button>
            )}

            {/* Theme Toggle */}
            <button
              className="btn btn-outline-secondary"
              onClick={toggleTheme}
              aria-label="Toggle Dark/Light Mode"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                border: theme === "dark" ? "2px solid #555" : "2px solid #ddd"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "rotate(180deg) scale(1.1)";
                e.currentTarget.style.background = theme === "dark" ? "#34495e" : "#f8f9fa";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "rotate(0deg) scale(1)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {theme === "dark" ? (
                <i className="bi bi-sun-fill" style={{ fontSize: "1.1rem" }}></i>
              ) : (
                <i className="bi bi-moon-fill" style={{ fontSize: "1.1rem" }}></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  setCategory: PropTypes.func.isRequired,
  setModalOpen: PropTypes.func.isRequired
};

export default Navbar;
