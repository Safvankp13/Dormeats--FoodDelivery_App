import { createPortal } from "react-dom";
import "./modal.scss"; 

const Modal = ({ children, onClose }) => {
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
