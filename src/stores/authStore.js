import { defineStore } from "pinia";

export const useAuthStore = defineStore("authentication", {
  state: () => ({
    counter: 0,
    isAuth: sessionStorage.getItem("token") !== null,
    username: sessionStorage.getItem("username"),
  }),

  getters: {
    doubleCount: (state) => state.counter * 2,
  },

  actions: {
    increment() {
      this.counter++;
    },

    login(state, response) {
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("roles", response.data.roles);
      sessionStorage.setItem("username", response.data.username);
      state.username = response.data.username;
      state.isAuth = true;
    },

    logout(state) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("roles");
      sessionStorage.removeItem("username");
      state.isAuth = false;
      state.username = "";
    },
  },
});
