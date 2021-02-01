const states = {
    isHideCompleted: true,
};

const getters = {
    isHideCompleted: (state) => state.isHideCompleted,
};

const actions = {
    toggleHideCompleted({ commit }) {
        commit("setHideCompleted");
    },
};

const mutations = {
    setHideCompleted(state) {
        state.isHideCompleted = !state.isHideCompleted;
        console.log(state.isHideCompleted);
    },
};

export default {
    states,
    actions,
    getters,
    mutations,
};
