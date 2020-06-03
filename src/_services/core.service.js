import axios from "axios";

export default {
  getCountries: async () => {
    return await axios.get("http://127.0.0.1:8000/api/core/country/");
  },

  getCities: async () => {
    return await axios.get("http://127.0.0.1:800/api/core/city/");
  },
};
