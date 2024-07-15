const SelectedTabModule = {
  namespaced: true,
  state() {
    return {
      selectedTab: 1
    }
  },
  mutations: {
    setSelectedTab(state, tab) {
      state.selectedTab = tab
    }
  },
  actions: {
    updateSelectedTab(context, tab) {
      context.commit('setSelectedTab', tab)
    }
  },
  getters: {
    selectedTab: (state) => {
      return state.selectedTab
    }
  }
}

export default SelectedTabModule
