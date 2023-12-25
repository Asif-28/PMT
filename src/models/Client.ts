import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  projectCode: {
    type: String,
    required: true,
  },
  inputField: {
    type: String,
    required: true,
  },
  selectedCountry: {
    type: String,
    required: true,
  },

  countryCode: {
    type: String,
    required: true,
  },
  scope: {
    type: Number,
    required: true,
  },
  testLink: {
    type: String,
    required: true,
  },

  liveLink: {
    type: String,
    required: true,
  },
});

const Client = mongoose.models.Client || mongoose.model("Client", userSchema);
export default Client;
