export const state = () => ({
  loginFormActive: true,
})

export const actions = {
  async login(state, { email, password }) {
    let { data } = await this.$auth.loginWith('local', {
      data: {
        email,
        password,
      },
    })

    return data
  },
  async switchForm({ commit }, loginFormValue) {
    await commit('setLogin', loginFormValue)
  },
}

export const mutations = {
  setLogin(state, loginFormValue) {
    state.loginFormActive = !state.loginFormActive
  },
}
