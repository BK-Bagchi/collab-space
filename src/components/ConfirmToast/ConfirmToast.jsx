import { toast } from "react-toastify";

const confirmToast = (message) => {
  return new Promise((resolve) => {
    toast(
      ({ closeToast }) => (
        <div className="p-2">
          <p className="font-medium mb-2">{message}</p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                resolve(true);
                closeToast();
              }}
              className="px-5 py-1 bg-electricBlue text-white rounded"
            >
              Yes
            </button>

            <button
              onClick={() => {
                resolve(false);
                closeToast();
              }}
              className="px-5 py-1 bg-red-600 text-white rounded"
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
      }
    );
  });
};

export default confirmToast;
