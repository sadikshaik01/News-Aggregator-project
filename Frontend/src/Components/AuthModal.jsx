// AuthModal.jsx
import React from "react";
import LoginPage from "./LoginPage";
import SigninPage from "./SigninPage";
import "./AuthModal.css"; // Create this CSS file

const AuthModal = ({ isOpen, onClose, showLogin }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>
        {showLogin ? <LoginPage /> : <SigninPage />}
      </div>
    </div>
  );
};

export default AuthModal;