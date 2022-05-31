export const state = () => ({
  thefts: [],
  filteredThefts: [],
  oneTheft: {},
  filter: {
    search: '',
    status: '',
  },
})

export const getters = {
  getThefts(state) {
    return state.thefts
  },
  getFilteredThefts(state) {
    return state.filteredThefts
  },
}

export const actions = {
  async fetchAllThefts({ commit }) {
    const thefts = await this.$axios.get('/api/thefts')
    await commit('setThefts', thefts.data)
    await commit('setFilteredThefts', thefts.data)
  },

  async filterStatus({ commit, dispatch }, status) {
    await commit('setFilterStatus', status)
    dispatch('filterThefts')
  },
  async filterSearch({ commit, dispatch }, search) {
    await commit('setFilterSearch', search)
    dispatch('filterThefts')
  },
  async filterThefts({ commit }) {
    await commit('filterThefts')
  },
}

import * as Filters from '~/helpers/filters'

export const mutations = {
  setThefts(state, thefts) {
    state.thefts = [...thefts]
  },
  setFilteredThefts(state, thefts) {
    state.filteredThefts = [...thefts]
  },
  setFilterStatus(state, status) {
    state.filter.status = status
  },
  setFilterSearch(state, search) {
    state.filter.search = search
  },
  filterThefts(state) {
    const thefts = [...state.thefts]
    state.filteredThefts = thefts
    state.filteredThefts = Filters.filterThefts(state.filter, thefts)
  },
}
