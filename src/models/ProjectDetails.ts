import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
});
const ProjectDetails =
  mongoose.models.ProjectDetails ||
  mongoose.model("ProjectDetails", userSchema);
export default ProjectDetails;
