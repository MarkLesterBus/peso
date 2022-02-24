export const state = () => ({
  sideBar: {
    drawer: false,
    clipped: false,
    mini: false,
  },
  appBar: {
    clippedLeft: false,
  },
})

export const mutations = {
  SET_DRAWER(state, payload) {
    state.sideBar.drawer = payload
  },
  SET_CLIPPED(state, payload) {
    state.sideBar.clipped = payload
  },
  SET_MINI(state, payload) {
    state.sideBar.mini = payload
  },
  SET_CLIPPED_LEFT(state, payload) {
    state.appBar.clippedLeft = payload
  },
}

export const actions = {
  setDrawer({ commit }, payload) {
    commit('SET_DRAWER', payload)
  },
  setClipped({ commit }, payload) {
    commit('SET_CLIPPED', payload)
  },
  setMini({ commit }, payload) {
    commit('SET_MINI', payload)
  },
  setClippedLeft({ commit }, payload) {
    commit('SET_CLIPPED_LEFT', payload)
  },
}
