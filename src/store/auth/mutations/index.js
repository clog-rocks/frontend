import axios from "axios";

import { Mutation } from "../types";
import api from "@/_services/api";

export default {
  // Change component displayed on Auth view.
  [Mutation.SHOW_COMPONENT]: (state, component) =>
    (state.activeComponent = component),

  // Set up user as logged in.
  [Mutation.LOGIN_SUCCESS]: (state, payload) => {
    api.defaults.headers.common["Authorization"] = "Token " + payload.token;
    state.user = payload.user;
    state.token = payload.token;
    localStorage.setItem("user", JSON.stringify(payload.user));
    localStorage.setItem("token", payload.token);
    localStorage.setItem("isAuthenticated", true);
    state.isAuthenticated = true;
  },

  [Mutation.LOGOUT_SUCCESS]: (state) => {
    axios.defaults.headers.common["Authorization"] = null;
    state.user = {};
    state.token = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    state.isAuthenticated = false;
  },
};
