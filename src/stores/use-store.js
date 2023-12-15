import { defineStore } from "pinia";
export const useStore = defineStore("store", {
  state: () => ({
    account: {},
    isAccount: Boolean
  }),
  getters: {
    log() {
        console.log(this.account);
    }
  },
  actions: {
    onAccount(data, boolean) {
        this.isAccount = boolean
        this.account = data
    },
    onLogout() {
        this.isAccount = false
    }
  },
});
