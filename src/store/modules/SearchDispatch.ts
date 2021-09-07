import Vue from "vue";
import Vuex from "vuex";
import axios from "../../plugins/axios";

Vue.use(Vuex, axios);

const state = {
  chapterList: [],
};

const getters = {
  chapterList: (state: any) => state.chapterList,
};

const mutations = {
  SET_CHAPTER_LIST(state: any, chapterList: any) {
    state.chapterList = chapterList;
  },
};

const actions = {
  async chapterList({ commit }: any, payload: any) {
    return new Promise((resolve, reject) => {
      axios
        .get("/pug/compound/name/" + payload.word + "/synonyms/json")
        .then((data) => {
          commit("SET_CHAPTER_LIST", data.data);
          resolve(data.data);
        })
        .catch((error) => {
          commit("SET_CHAPTER_LIST", error.response);
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
