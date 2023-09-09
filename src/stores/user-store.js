import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuth: sessionStorage.getItem('token') !== null,
    username: sessionStorage.getItem('username'),
  }),
  actions: {
    setUserDetails(res) {
        console.log('setUserDetails', res.data)
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("username", res.data.username);
        //this.$state.username = res.data.username;
          this.$state.isAuth = true;
        //this.$state.token = res.data.token
        //this.$state.username = res.data.username
    },

    clearUser() {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('username')    
      state.isAuth = false
      state.username = ''
    }
  },
  persist: true,
})