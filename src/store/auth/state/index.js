export default {
  // Component which should be displayed on Auth view.
  // Login or Register.
  activeComponent: "Login",
  isAuthenticated: localStorage.getItem("isAuthenticated") || false,
  user: JSON.parse(localStorage.getItem("user") || "{}"),
  token: localStorage.getItem("token"),
};
