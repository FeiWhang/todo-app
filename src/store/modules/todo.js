const states = {
    todos: {},
};

const getters = {
    todos: (state) => state.todos,
};

const actions = {
    updateTodo({ commit }, todos) {
        commit("setTodo", todos);
    },
};

const mutations = {
    setTodo(state, todos) {
        state.todos = todos;
    },
};

export default {
    states,
    actions,
    getters,
    mutations,
};
