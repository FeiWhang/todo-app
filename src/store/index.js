import Vue from "vue";
import Vuex from "vuex";
import authentication from "./modules/authentication";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const userState = createPersistedState({
    paths: ["userProfile"],
});

const store = new Vuex.Store({
    plugins: [userState],
    modules: {
        authentication,
    },
});

export default store;
