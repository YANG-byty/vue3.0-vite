import { createStore } from 'vuex';

//引入
import actions from "./actions.js";
import mutations from "./mutations.js";
import state from "./state.js";

export default createStore({
  state,
  mutations,
  actions,
})
