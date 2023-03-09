import { createStore } from "vuex";
import axiosClient from "../axios";

// const tmpSurveys = [
//   {
//     id: 100,
//     title: 'This is a test-survey',
//     slug: 'this-is-a-test-survey',
//     status: 'draft',
//     image: 'https://pbs.twimg.com/profile_images/11180595350030177221/9ZwEYqj2_400x400.png',
//     description: 'This is a test survey to see if the site works',
//     created_at: "2023-03-9 09:00:00",
//     updated_at: "2023-03-9 09:00:00",
//     expire_date: "2024-03-9 09:00:00",
//     questions: [
//       {
//         id: 1,
//         type: "select",
//         question: "From which country are you?",
//         description: null,
//         data: {
//           options: [
//           ]
//         }
//       }
//     ],
//   }
// ]

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN'),
    }
  },
  getters: {},
  actions: {
    register({ commit }, user) {
      return axiosClient.post('/register', user).
        then(({ data }) => {
          commit('setUser', data)
          return data;
        })
    },
    login({ commit }, user) {
      return axiosClient.post('/login', user).
        then(({ data }) => {
          commit('setUser', data)
          return data;
        })
    },
    logout({ commit }) {
      return axiosClient.post('/logout')
        .then(response => {
          commit('logout')
          return response;
        })
    },
  },
  mutations: {
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.token = userData.user;
      sessionStorage.setItem('TOKEN', userData.token)
    }
  },
  modules: {}
});

export default store;
