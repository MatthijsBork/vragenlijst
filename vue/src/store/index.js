import {createStore} from "vuex";

const store = createStore({
  state: {
    user: {
      data: {
        data: {name: 'matthijs'},
        token: null
      }
    }
  },
  getters: {},
  actions: {},
  mutations: {},
  modules: {}
})

export default store;
