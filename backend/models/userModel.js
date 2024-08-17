import mongoose from "mongoose";

// Episode Schema
const episodeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  },
  { timestamps: true }
);

// Project Schema
const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    episodes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Episode" }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Middleware to delete associated episodes when a project is deleted
projectSchema.pre("findOneAndDelete", async function (next) {
  const projectId = this.getFilter()._id;
  await Episode.deleteMany({ project: projectId });
  next();
});

// User Schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  },
  { timestamps: true }
);

// Middleware to delete associated projects when a user is deleted
userSchema.pre("findOneAndDelete", async function (next) {
  const userId = this.getFilter()._id;
  const projects = await Project.find({ user: userId });
  for (const project of projects) {
    await Project.findOneAndDelete({ _id: project._id });
  }
  next();
});

// Create models
const Episode = mongoose.model("Episode", episodeSchema);
const Project = mongoose.model("Project", projectSchema);
const User = mongoose.model("User", userSchema);

export { User, Project, Episode };
