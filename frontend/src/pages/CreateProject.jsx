import React, { useState, useEffect } from "react";
import { FaRegBell } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineSettings } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CreateProjectImg from "../assets/CreateProjectImg.png";
import QuesLogoPurple from "../assets/QuesLogoPurple.png";
import sampleProjectImg from "../assets/sampleProjectImg.png";
import CreateProjectPopup from "../components/CreateProjectPopup";
import ProjectCard from "../components/ProjectCard";
import {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useLogoutMutation,
} from "../redux/api/usersApiSlice";
import { logout as logoutAction } from "../redux/features/auth/authSlice";

function CreateProject() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: projectsData,
    isLoading,
    isError,
    refetch,
  } = useGetProjectsQuery();
  const [createProject] = useCreateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    if (projectsData) {
      setProjects(projectsData);
    }
  }, [projectsData]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleProjectNavigation = (projectId, projectName) => {
    navigate(`/projects/${projectId}?name=${projectName}`);
  };

  const handleCreateProject = async (projectData) => {
    try {
      await createProject(projectData).unwrap();
      refetch();
      setIsModalOpen(false);
      toast.success("Project created successfully!");
    } catch (err) {
      console.error("Failed to create project:", err);
      toast.error(
        err?.data?.message || "Failed to create project. Please try again."
      );
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId).unwrap();
      refetch();
      toast.success("Project deleted successfully!");
    } catch (err) {
      console.error("Failed to delete project:", err);
      toast.error(
        err?.data?.message || "Failed to delete project. Please try again."
      );
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutAction());
      localStorage.removeItem("userToken");
      navigate("/", { replace: true });
      // window.location.reload();
      toast.success("Logged out successfully!");
    } catch (err) {
      console.error("Failed to logout:", err);
      toast.error("Failed to logout. Please try again.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    toast.error("Error loading projects. Please refresh the page.");
    return <div>Error loading projects</div>;
  }

  return (
    <div className="h-[100vh] w-full">
      <div className="header w-full pt-20 px-28 flex justify-between items-center">
        <div className="logo">
          <img src={QuesLogoPurple} alt="ques.ai logo" className="w-[268px]" />
        </div>
        <div className="navIcon flex gap-3 items-center">
          <div className="setting">
            <MdOutlineSettings size={50} />
          </div>
          <div className="bell">
            <FaRegBell size={50} />
          </div>
          <div className="logout">
            <RxExit
              size={45}
              color="red"
              className="cursor-pointer"
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
      {projects.length === 0 ? (
        <div className="createContainer w-full flex justify-center items-center pt-20 px-28 flex-col">
          <p className="heading text-[6vh] font-bold text-[#7E22CE]">
            Create a New Project
          </p>
          <img src={CreateProjectImg} alt="" className="mt-5" />
          <p className="text-zinc-500 font-semibold mt-10 text-[2vh]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore
          </p>
          <p className="text-zinc-500 font-semibold text-[2vh] -translate-y-[20%]">
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea
          </p>
          <p className="text-zinc-500 font-semibold text-[2vh] -translate-y-[40%]">
            commodo consequat. Duis aute irure dolor in reprehenderit in
          </p>
          <button
            className="flex items-center justify-center bg-black py-3 px-4 gap-4 rounded-lg mt-5"
            onClick={openModal}
          >
            <div className="rounded-lg bg-white">
              <IoMdAdd size={35} color="black" />
            </div>
            <p className="text-white text-[3vh]">Create New Project</p>
          </button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center pt-20 px-28">
            <p className="text-[5vh] text-[#7e22ce] font-bold">Projects</p>
            <button
              className="flex items-center justify-center bg-black py-3 px-4 gap-4 rounded-lg mt-5"
              onClick={openModal}
            >
              <div className="rounded-lg bg-white">
                <IoMdAdd size={35} color="black" />
              </div>
              <p className="text-white text-[3vh]">Create New Project</p>
            </button>
          </div>
          <div className="projectCards pt-20 pl-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 pr-28">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                imageSrc={project.imageSrc || sampleProjectImg}
                title={project.name}
                episodes={project.episodes?.length || 0}
                lastEdited={project.updatedAt}
                onClick={() =>
                  handleProjectNavigation(project._id, project.name)
                }
                onDelete={() => handleDeleteProject(project._id)}
              />
            ))}
          </div>
        </div>
      )}
      {isModalOpen && (
        <CreateProjectPopup
          closeModal={closeModal}
          createProject={handleCreateProject}
        />
      )}
    </div>
  );
}

export default CreateProject;
