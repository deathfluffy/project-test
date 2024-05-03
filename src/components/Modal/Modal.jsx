import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { Icon } from "../Icon/Icon";

export const SimpleModal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  const onWrapperClick = (event) => {
    if (event.target.classList.contains("modalWrapper")) onClose();
  };

  return createPortal(
    <>
      {isOpen && (
        <div className={`${css.modal}`}>
          <div className={css.modalWrapper} onClick={onWrapperClick}>
            <div className={css.modalContent}>
              <button
                className={css.modalCloseButton}
                onClick={() => onClose()}
              >
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
