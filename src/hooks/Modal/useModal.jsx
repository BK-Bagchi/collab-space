const Modal = ({ render, setActiveModal }) => {
  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={() => setActiveModal(false)}
    >
      <button
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-4xl font-bold transition"
        onClick={() => setActiveModal(false)}
      >
        &times;
      </button>
      {render}
    </div>
  );
};

export default Modal;
