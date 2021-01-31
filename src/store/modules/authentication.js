import * as fb from "@/firebase";
import router from "@/router/index";

const state = {
    userProfile: null,
    errorMessage: "",
};

const getters = {
    user: (state) => state.userProfile,
    authenticated: () => state.userProfile != null,
    errorMessage: (state) => state.errorMessage,
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
                console.log("got here???");
                // set user profile  in state
                commit("setUserProfile", response.user);
                router.push("/todo");
            } else {
                console.log(response);
            }
        } catch (e) {
            commit("setError", e);
        }
    },

    async logout({ commit }) {
        await fb.auth.signOut();
        commit("setUserProfile", null);
        router.push("/login");
    },
};

const mutations = {
    setUserProfile(state, userProfile) {
        state.userProfile = userProfile;
    },
    setError(state, e) {
        if (e.code == "auth/user-not-found") {
            state.errorMessage = "User not found";
        } else if (e.code == "auth/invalid-email") {
            state.errorMessage = "Bad email format";
        } else if (e.code == "auth/wrong-password") {
            state.errorMessage = "Incorrect password";
        } else {
            state.errorMessage = "Login failed";
        }
    },
};

export default {
    state,
    actions,
    getters,
    mutations,
};
