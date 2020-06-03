import axios from "axios";

export default {
  getGrades: async () => {
    return await axios.get("http://127.0.0.1:8000/api/logbook/grade/");
  },

  getStyles: async () => {
    return await axios.get("http://127.0.0.1:8000/api/logbook/style/");
  },

  getCrags: async () => {
    return await axios.get("http://127.0.0.1:8000/api/logbook/crag/");
  },

  getSectors: async () => {
    return await axios.get("http://127.0.0.1:8000/api/logbook/sector/");
  },

  getRoutes: async () => {
    return await axios.get("http://127.0.0.1:8000/api/logbook/route/");
  },

  getAscents: async () => {
    return await axios.get("http://127.0.0.1:8000/api/logbook/ascent/");
  },
};
