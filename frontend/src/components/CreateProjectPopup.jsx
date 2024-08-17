import React, { useState } from "react";

const CreateProjectPopup = ({ closeModal, createProject }) => {
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (projectName.trim() === "") {
      setError("Project Name Can't be empty");
    } else {
      // Handle the project creation logic here
      setError("");
      // Close the modal after submission
      closeModal();
      //Create Project update bool
      createProject({ name: projectName });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
      <div className="bg-white p-8 rounded-lg max-w-[40vw] min-w-[40vw]">
        <p className="text-xl font-semibold mb-4">Create Project</p>
        <div className="mb-4">
          <label
            htmlFor="projectName"
            className="block text-gray-700 font-semibold mb-2"
          >
            Enter Project Name:
          </label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Type here"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div className="flex justify-end gap-5">
          <button onClick={closeModal} className="text-[#f04f4f] font-medium">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-2 text-white font-semibold bg-[#7e22ce] rounded-lg"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectPopup;
