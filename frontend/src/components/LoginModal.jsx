import React from "react";

function LoginModal({ show, close }) {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Welcome</h2>
        <p>Login for seamless experience</p>

        <input type="text" placeholder="Enter Mobile Number" />

        <button className="btn">Login with OTP</button>

        <p className="skip" onClick={close}>Skip</p>
      </div>
    </div>
  );
}

export default LoginModal;