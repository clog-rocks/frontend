import axios from "axios";

export const coreService = {
  getCountries: async () => {
    return await axios.get("http://127.0.0.1:8000/api/core/country/");
  },
};
