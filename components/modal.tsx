// components/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
          &times; {/* Close icon */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
