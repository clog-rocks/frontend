import axios from "axios";

export default {
  getGyms: async () => {
    return await axios.get("http://127.0.0.1:8000/api/training/gym/");
  },

  getSessions: async () => {
    return await axios.get("http://127.0.0.1:8000/api/training/session/");
  },
};
