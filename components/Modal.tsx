import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.4)]"
      onClick={onClose}
    >
      <div
        className="absolute bg-[#ffffff] rounded-lg p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
