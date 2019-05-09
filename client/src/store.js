import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  is:false,
  mes:null
};
const mutations = {
  isChange(state,payload){
    state.is = payload;
  },
  mesChange(state,payload){
    state.mes = payload || null;
  }
};
const getters = {
  isGet(state){
    return state.is; 
  },
  mesGet(state){
    return state.mes;
  }
};
const actions = {
  // 执行mutations里面的方法
  isAct(context,payload){
    context.commit('isChange' , payload);
  },
  mesAct({commit} , payload){
    commit('mesChange' , payload);
  },
  clear({commit}){
    commit('isChange',false);
    commit('mesChange',null);
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
});

