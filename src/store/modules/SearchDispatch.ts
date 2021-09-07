import Vue from "vue";
import Vuex from "vuex";
import axios from "../../plugins/axios";

Vue.use(Vuex, axios);

const state = {
  wordList: [],
};

const getters = {
  wordList: (state: any) => state.wordList,
};

const mutations = {
  SET_WORD_LIST(state: any, wordList: any) {
    state.wordList = wordList;
  },
};

const actions = {
  async wordList({ commit }: any, payload: any) {
    return new Promise((resolve, reject) => {
      axios
        .get("/pug/compound/name/" + payload.word + "/synonyms/json")
        .then((data) => {
          commit("SET_WORD_LIST", data.data);
          resolve(data.data);
        })
        .catch((error) => {
          commit("SET_WORD_LIST", error.response);
          reject(error.response);
        });
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
