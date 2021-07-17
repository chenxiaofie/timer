import { createStore } from 'vuex'

const defaultState = {
  feactureNum: ''
}

// Create a new store instance.
export default createStore({
  state() {
    return defaultState
  },
  mutations: {
    increment(state,value) {
      state.feactureNum=value
    }
  },
  actions: {
    increment(context,value) {
      context.commit('increment',value)
    }
  },
  getters: {
    double(state) {
      return 2 * state.count
    }
  }
})

