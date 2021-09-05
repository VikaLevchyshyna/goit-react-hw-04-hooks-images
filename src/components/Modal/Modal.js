import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, largeImageURL }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };
  const handleBackdrop = event => {
    if (event.currentTarget !== event.target) return false;
    onClose();
  };

  return createPortal(
    <div className="Overlay" onClick={handleBackdrop}>
      <div className="Modal">
        <img src={largeImageURL} alt="img" />
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
