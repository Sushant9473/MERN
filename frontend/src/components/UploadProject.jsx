import React, { useState } from "react";

const UploadProject = ({ closeModal, onUpload }) => {
  const [uploadName, setUploadName] = useState("");
  const [uploadDescription, setUploadDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (uploadName.trim() === "") {
      setError("Name Can't be empty");
    } else {
      setError("");
      console.log(uploadName, uploadDescription);
      onUpload(uploadName, uploadDescription);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
      <div className="bg-white p-8 rounded-lg max-w-[40vw] min-w-[40vw]">
        <p className="text-xl font-semibold mb-4">Upload New Episode</p>
        <div className="mb-4">
          <label
            htmlFor="uploadName"
            className="block text-gray-700 font-semibold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="uploadName"
            value={uploadName}
            onChange={(e) => setUploadName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7e22ce]"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <label
            htmlFor="uploadDescription"
            className="block text-gray-700 font-semibold mb-2 mt-5"
          >
            Description
          </label>
          <textarea
            id="uploadDescription"
            value={uploadDescription}
            onChange={(e) => setUploadDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7e22ce]"
            rows="4"
          />
        </div>
        <div className="flex justify-end gap-5">
          <button onClick={closeModal} className="text-[#f04f4f] font-medium">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-2 text-white font-semibold bg-[#7e22ce] rounded-lg"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadProject;
