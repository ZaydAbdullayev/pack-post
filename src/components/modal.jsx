// components/Modal.jsx
import { useEffect } from "react";
import "./index.scss";

export const Modal = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};
