import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    text: null,
    num: null,
    cond: false
  },
  mutations: {
    changeText(state,data) {
      state.text = data[0]
      state.num = data[1]+1
    },
    setCond(state,data){
      state.cond = data
    }
  },
  actions: {
  },
  modules: {
  }
})
