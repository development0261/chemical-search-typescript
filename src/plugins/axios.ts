import axios from "axios";
const token = localStorage.getItem("token");
const options = {
  baseURL: "https://pubchem.ncbi.nlm.nih.gov/rest",
  headers: {
    Accept: "application/json",
  },
};
export default axios.create(options);
