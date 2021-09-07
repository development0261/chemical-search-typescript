import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import Search from "./modules/SearchDispatch";

Vue.use(Vuex, axios);

export default new Vuex.Store({
  modules: {
    Search,
  },
});
