import * as fb from "@/firebase";
import router from "@/router/index";

const state = {
    userProfile: {},
    errorMessage: "",
};

const getters = {
    user: (state) => state.userProfile,
    error: (state) => state.errorMessage,
};

const actions = {
    async login({ commit }, form) {
        try {
            // sign user in
            const response = await fb.auth.signInWithEmailAndPassword(
                form.email,
                form.password
            );

            if (response) {
                // set user profile  in state
                commit("setUserProfile", response.user);
                router.push("/todo");
            } else {
                console.log(response);
            }
        } catch (e) {
            commit("setError", e.message);
        }
    },
};

const mutations = {
    setUserProfile(state, userData) {
        state.userProfile = userData;
    },
    setError(state, errorMessage) {
        state.errorMessage = errorMessage;
        console.log(state.errorMessage);
    },
};

export default {
    state,
    actions,
    getters,
    mutations,
};
