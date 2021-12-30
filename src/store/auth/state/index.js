export default {
  // Component which should be displayed on Auth view.
  // Login or Register.
  activeComponent: "LoginForm",
  isAuthenticated: localStorage.getItem("isAuthenticated") || false,
  user: JSON.parse(localStorage.getItem("user") || "{}"),
  token: localStorage.getItem("token"),
};
