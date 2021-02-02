import Vue from "vue";
import Vuex from "vuex";
import authentication from "./modules/authentication";
import todo from "./modules/todo";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const userState = createPersistedState({
    paths: ["userProfile"],
});

const store = new Vuex.Store({
    plugins: [userState],
    modules: {
        authentication,
        todo,
    },
});

export default store;
