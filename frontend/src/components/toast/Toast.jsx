import React from "react";
import "./Toast.css";

const Toast = ({ type, message, visible }) => {
  return (
    <div
      className={`toast toast-${type} ${
        visible ? "toast-visible" : "toast-hidden"
      }`}
    >
      <div className="toast-icon">
        {type === "success" && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM6.4 12L2.4 8L3.8 6.6L6.4 9.2L12.2 3.4L13.6 4.8L6.4 12Z"
              fill="currentColor"
            />
          </svg>
        )}
        {type === "error" && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM12 10.9L10.9 12L8 9.1L5.1 12L4 10.9L6.9 8L4 5.1L5.1 4L8 6.9L10.9 4L12 5.1L9.1 8L12 10.9Z"
              fill="currentColor"
            />
          </svg>
        )}
        {type === "info" && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM9 12H7V7H9V12ZM8 6C7.4 6 7 5.6 7 5C7 4.4 7.4 4 8 4C8.6 4 9 4.4 9 5C9 5.6 8.6 6 8 6Z"
              fill="currentColor"
            />
          </svg>
        )}
      </div>
      <div className="toast-message">{message}</div>
    </div>
  );
};

export default Toast;
