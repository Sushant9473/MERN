import { User, Project, Episode } from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({ message: "Please provide all fields" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).send({ message: "User already exists" });
  }

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    createToken(res, newUser._id); // Create and set the JWT token
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch {
    return res.status(400).send({ message: "Invalid user data" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Please provide all fields" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid) {
      createToken(res, existingUser._id); // Create and set the JWT token
      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
      });
    } else {
      return res.status(401).send({ message: "Invalid email or password" });
    }
  } else {
    return res.status(401).send({ message: "Invalid email or password" });
  }
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // Delete all projects associated with the user
    for (let projectId of user.projects) {
      await Project.findByIdAndDelete(projectId);
    }

    // Delete the user
    await User.deleteOne({ _id: user._id });
    res.json({
      message:
        "User, all associated projects, and all associated episodes removed",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const createProject = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const userId = req.user._id;

  const newProject = new Project({ name });
  const user = await User.findById(userId);

  if (user) {
    user.projects.push(newProject);
    await user.save();
    await newProject.save();
    res.status(201).json(newProject);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteProject = asyncHandler(async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const project = await Project.findById(projectId);
    for (let episode of project.episodes) {
      await Episode.findByIdAndDelete(episode);
    }
    //delete project from user
    const user = await User.findById(req.user._id);
    user.projects = user.projects.filter(
      (project) => project.toString() !== projectId
    );

    await user.save();
    await Project.findByIdAndDelete(projectId);

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting project", error: error.message });
  }
});

const getAllProjects = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).populate("projects");

  if (user) {
    res.json(user.projects);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const createEpisode = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { name, description } = req.body;
  const project = await Project.findById(projectId);

  if (project) {
    const newEpisode = new Episode({ name, description });
    project.episodes.push(newEpisode);
    await project.save();
    await newEpisode.save();
    res.status(201).json(newEpisode);
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
});

const getAllEpisodes = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId).populate("episodes");

  if (project) {
    res.json(project.episodes);
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
});

const updateEpisode = asyncHandler(async (req, res) => {
  const { projectId, episodeId } = req.params;
  const { name, description } = req.body;

  const project = await Project.findById(projectId);

  if (project) {
    const episode = await Episode.findById(episodeId);

    if (episode) {
      episode.name = name || episode.name;
      episode.description = description || episode.description;

      await episode.save();
      res.json(episode);
    } else {
      res.status(404);
      throw new Error("Episode not found");
    }
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
});

const getUniqueEpisode = asyncHandler(async (req, res) => {
  const { projectId, episodeId } = req.params;
  const episode = await Episode.findById(episodeId);
  if (episode) {
    res.json(episode);
  } else {
    res.status(404);
    throw new Error("Episode not found");
  }
});

const deleteEpisode = asyncHandler(async (req, res) => {
  const { projectId, episodeId } = req.params;
  const userId = req.user._id;

  const user = await User.findById(userId);
  const project = await Project.findById(projectId);

  if (user) {
    if (project) {
      const episodeIndex = project.episodes.findIndex(
        (e) => e._id.toString() === episodeId
      );

      if (episodeIndex > -1) {
        project.episodes.splice(episodeIndex, 1);
        await project.save();
        await Episode.findByIdAndDelete(episodeId);
        res.json({ message: "Episode removed" });
      } else {
        res.status(404);
        throw new Error("Episode not found");
      }
    } else {
      res.status(404);
      throw new Error("Project not found");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteCurrentUserProfile,
  createProject,
  deleteProject,
  createEpisode,
  deleteEpisode,
  getAllProjects,
  getAllEpisodes,
  getUniqueEpisode,
  updateEpisode,
};
