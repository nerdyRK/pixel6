/* eslint-disable react/prop-types */
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-30 backdrop-blur-sm">
      <div className="relative p-6 rounded-md shadow-lg w-full max-w-lg bg-white max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-4xl text-red-700 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
