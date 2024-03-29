import { createStore } from "vuex";
import axiosClient from "../axios";

const tmpSurveys = [
  {
    id: 100,
    title: 'This is a test-survey',
    slug: 'this-is-a-test-survey',
    status: 'draft',
    image: 'https://pbs.twimg.com/profile_images/11180595350030177221/9ZwEYqj2_400x400.png',
    description: 'This is a test survey to see if the site works',
    created_at: "2023-03-9 09:00:00",
    updated_at: "2023-03-9 09:00:00",
    expire_date: "2024-03-9 09:00:00",
    questions: [
      {
        id: 1,
        type: "select",
        question: "From which country are you?",
        description: null,
        data: {
          options: [
            { uuid: 'f8af96f2-1d80-4632-9e9e-b560670e52ea', text: 'USA' },
            { uuid: 'f8af96f2-1d80-4632-9e9e-b560670e52ea', text: 'USA2' },
            { uuid: 'f8af96f2-1d80-4632-9e9e-b560670e52ea', text: 'USA3' },
            { uuid: 'f8af96f2-1d80-4632-9e9e-b560670e52ea', text: 'USA4' },
          ]
        }
      }
    ],
  },
  {
    id: 102,
    title: 'This is a test-survey 2',
    slug: 'this-is-a-test-survey',
    status: 'draft',
    image: 'https://pbs.twimg.com/profile_images/11180595350030177221/9ZwEYqj2_400x400.png',
    description: 'This is a test survey to see if the site works',
    created_at: "2023-03-9 09:00:00",
    updated_at: "2023-03-9 09:00:00",
    expire_date: "2024-03-9 09:00:00",
    questions: [
      {
        id: 1,
        type: "select",
        question: "From which country are you?",
        description: null,
        data: {
          options: [
            { uuid: 'f8af96f2-1d80-4632-9e9e-b560670e52ea', text: 'USA' },
            { uuid: 'f8af96f2-1d80-4632-9e9e-b560670e52ea', text: 'USA2' },
            { uuid: 'f8af96f2-1d80-4632-9e9e-b560670e52ea', text: 'USA3' },
            { uuid: 'f8af96f2-1d80-4632-9e9e-b560670e52ea', text: 'USA4' },
          ]
        }
      }
    ],
  },
  {
    id: 103,
    title: 'This is a test-survey 3',
    slug: 'this-is-a-test-survey',
    status: 'draft',
    image: 'https://pbs.twimg.com/profile_images/11180595350030177221/9ZwEYqj2_400x400.png',
    description: 'This is a test survey to see if the site works',
    created_at: "2023-03-9 09:00:00",
    updated_at: "2023-03-9 09:00:00",
    expire_date: "2024-03-9 09:00:00",
    questions: [
      {
        id: 1,
        type: "select",
        question: "From which country are you?",
        description: null,
        data: {
          options: [
            { uuid: 'f8af96f2-1d80-4632-9e9e-b560670e52ea', text: 'USA' },
            { uuid: 'f8af96f2-1d80-4632-9e9e-b560670e52ea', text: 'USA2' },
            { uuid: 'f8af96f2-1d80-4632-9e9e-b560670e52ea', text: 'USA3' },
            { uuid: 'f8af96f2-1d80-4632-9e9e-b560670e52ea', text: 'USA4' },
          ]
        }
      }
    ],
  },
]

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN'),
    },
    // ... = spread operator. Maakt een kopie van tmpSurveys
    surveys: [...tmpSurveys],
    // Alle beschikbare types voor survey vragen vaststellen.
    questionTypes: ['text', 'select', 'radio', 'checkbox', 'textarea'],
  },
  getters: {},
  actions: {
    saveSurvey({ commit }, survey) {
      delete survey.image_url;
      let response;
      if (survey.id) {
        console.log('survey ID exists!');
        response = axiosClient
          .put(`/survey/${survey.id}`, survey)
          .then((res) => {
            console.log(res.data);
            commit('updateSurvey', res.data);
            return res;
          });
      } else {
        // Axios: ERR_BAD_RESPONSE hier? fixen!
        // Lijkt op een probleem met api
        console.log(store.state.user.token);
        response = axiosClient.post('/survey', survey).then((res) => {
          commit('saveSurvey', res.data);
          return res;
        });
      }
      return response;
    },
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
    saveSurvey: (state, survey) => {
      state.surveys = [...state.surveys, survey.data];
    },
    updateSurvey: (state, survey) => {
      state.surveys = state.surveys.map((s) => {
        if (s.id == survey.data.id) {
          return survey.data;
        }
        return s;
      });
    },
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
