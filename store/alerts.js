export const namespaced = true
export const state = () => ({
  alert: {
    color: '',
    message: '',
    timeout: 5000,
    visible: false,
  },
})

export const mutations = {
  SHOW_ALERT(state, payload) {
    state.alert.color = payload.color
    state.alert.message = payload.message
    state.alert.visible = payload.visible
  },

  REMOVE_ALERT(state, visible) {
    state.alert.visible = visible
  },
}

export const actions = {
  showAlert({ commit }, payload) {
    commit('SET_ALERT', payload)
  },
  removeAlert({ commit }) {
    commit('REMOVE_ALERT', false)
  },
}
