import React from "react";
import { FaTrash } from "react-icons/fa"; // Import the trash icon
import { format } from "date-fns";

const ProjectCard = ({
  imageSrc,
  title,
  episodes,
  lastEdited,
  onClick,
  onDelete,
}) => {
  const handleProjectOpening = () => {
    onClick();
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent the card click event from triggering
    onDelete();
  };

  const formattedLastEdited = format(
    new Date(lastEdited),
    "dd MMM yyyy | HH:mm"
  );

  return (
    <div
      className="projectCard flex gap-4 border-2 border-zinc-400 rounded-xl cursor-pointer relative"
      onClick={handleProjectOpening}
    >
      <div className="flex gap-5 m-2 w-full">
        <img
          src={imageSrc}
          alt={`${title} thumbnail`}
          className="rounded-3xl h-[16vh]"
        />
        <div className="projectInfo flex flex-grow">
          <div className="flex flex-col justify-between w-full">
            <div className="h-[100%] justify-center flex flex-col">
              <p className="text-[30px] font-bold text-[#7e22ce]">{title}</p>
              <div className="flex gap-1">
                <p>{episodes}</p>
                <p>Episodes</p>
              </div>
            </div>
            <p className="mt-5">{formattedLastEdited}</p>
          </div>
        </div>
      </div>
      <button
        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
        onClick={handleDelete}
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default ProjectCard;
