import express from "express";
import {
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
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(createUser);

router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile)
  .delete(authenticate, deleteCurrentUserProfile);

router
  .route("/projects")
  .get(authenticate, getAllProjects)
  .post(authenticate, createProject);

router
  .route("/projects/:projectId")
  .post(authenticate, createEpisode)
  .get(authenticate, getAllEpisodes)
  .delete(authenticate, deleteProject);

router
  .route("/projects/:projectId/:episodeId")
  .get(authenticate, getUniqueEpisode)
  .put(authenticate, updateEpisode)
  .delete(authenticate, deleteEpisode);

export default router;
