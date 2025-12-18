import { Image, Paperclip, Send, Upload } from "lucide-react";

const SentMultiMedia = ({
  message,
  uploading,
  handleTyping,
  sendMessage,
  handleFileUpload,
  showUploadMenu,
  setShowUploadMenu,
  project,
}) => {
  return (
    // Input
    <div className="relative flex p-2 border-t border-gray-200 gap-2 items-center bg-white dark:bg-darkSlate">
      {/* Upload Menu Toggle */}
      <div className="relative">
        <button
          onClick={() => setShowUploadMenu((prev) => !prev)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-darkSlate transition"
        >
          <span className="text-2xl text-gray-600 dark:text-gray-200 font-bold">
            +
          </span>
        </button>

        {/* Upload Options Menu */}
        {showUploadMenu && (
          <div className="absolute bottom-12 left-0 bg-white border border-gray-200 shadow-lg rounded-xl p-2 w-40 z-10">
            {uploading ? (
              <label className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                <Upload size={20} />
                <span>Uploading...</span>
              </label>
            ) : (
              <>
                <label
                  htmlFor="upload-image"
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm text-gray-700"
                >
                  <Image size={20} />
                  <span>Send Image</span>
                </label>
                <input
                  type="file"
                  id="upload-image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />

                <label
                  htmlFor="upload-file"
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm text-gray-700"
                >
                  <Paperclip size={20} />
                  <span>Send File</span>
                </label>
                <input
                  type="file"
                  id="upload-file"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </>
            )}
          </div>
        )}
      </div>

      {/* Text Input */}
      <input
        type="text"
        value={message}
        onChange={handleTyping}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder={project ? `Message ${project.title}` : "Type a message..."}
        className="flex-1 rounded-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-electricBlue text-charcoalGray dark:text-softWhite"
      />

      {/* Send Button */}
      <button
        onClick={sendMessage}
        className="p-2 bg-electricBlue text-white rounded-full hover:bg-[#1E63D1] transition"
      >
        <Send size={16} />
      </button>
    </div>
  );
};

export default SentMultiMedia;
