import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  projectCode: {
    type: String,
    required: true,
  },
  projectManager: {
    type: String,
    required: true,
  },
  clientProjectManager: {
    type: String,
    required: true,
  },
  incidenceRate: {
    type: String,
    required: true,
  },
  loi: {
    type: String,
    required: true,
  },
  scope: {
    type: Number,
    required: true,
  },
  selectedOption: {
    type: String,
    required: true,
  },
  targetDescription: {
    type: String,
    required: true,
  },
  selectedCountry: {
    type: String,
    required: true,
  },
  onlineOffline: {
    type: String,
    required: true,
  },
  selectedDiv: {
    type: String,
    required: true,
  },
  billingComments: {
    type: String,
    required: true,
  },
});
userSchema.pre("save", function (next) {
  // Check if incidenceRate is present and convert it to String, then append ' Min' to it
  if (this.incidenceRate !== undefined && this.incidenceRate !== null) {
    this.incidenceRate = this.incidenceRate.toString() + "%";
  }
  next();
});
userSchema.pre("save", function (next) {
  // Check if incidenceRate is present and convert it to String, then append ' Min' to it
  if (this.loi !== undefined && this.loi !== null) {
    this.loi = this.loi.toString() + " Min";
  }
  next();
});
const ProjectDetails =
  mongoose.models.ProjectDetails ||
  mongoose.model("ProjectDetails", userSchema);
export default ProjectDetails;
