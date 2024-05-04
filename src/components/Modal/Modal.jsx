import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { Icon } from "../Icon/Icon";

export const SimpleModal = ({ isOpen, onClose, children }) => {
  const handleOutsideClick = (event) => {
    if (event.target.classList.contains(css.modalWrapper)) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.classList.add("modal-open");
      document.addEventListener("keydown", handleKeyPress);
    } else {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, onClose]);

  return createPortal(
    <>
      {isOpen && (
        <div className={css.modal}>
          <div
            onClick={handleOutsideClick}
            className={css.modalWrapper}
            role="presentation"
          >
            <div className={css.modalContent}>
              <button className={css.modalCloseButton} onClick={onClose}>
                <Icon width="32" height="32" id="icon-x-close" />
              </button>
              {children}
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
};
