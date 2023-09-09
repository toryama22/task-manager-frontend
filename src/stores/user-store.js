import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    username: null,
  }),
  actions: {
    setUserDetails(res) {
        console.log('setUserDetails', res.data)
        this.$state.token = res.data.token
        this.$state.username = res.data.user.username
    },

    clearUser() {
        this.$state.token = null
        this.$state.email = null        
    }
  },
  persist: true
})