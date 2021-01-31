import * as fb from "@/firebase";
import router from "@/router/index";

const state = {
    userProfile: null,
    loginErrorMessage: "",
    registerErrorMessage: "",
};

const getters = {
    user: (state) => state.userProfile,
    authenticated: () => state.userProfile != null,
    loginErrorMessage: (state) => state.loginErrorMessage,
    registerErrorMessage: (state) => state.registerErrorMessage,
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
            commit("setLoginError", e);
        }
    },

    async logout({ commit }) {
        await fb.auth.signOut();
        commit("setUserProfile", null);
        router.push("/login");
    },

    async register({ commit }, form) {
        try {
            const response = await fb.auth.createUserWithEmailAndPassword(
                form.email,
                form.password
            );

            if (response) {
                // successfully registers
                commit("setUserProfile", response.user);
                router.push("/todo");
            }
        } catch (e) {
            commit("setRegisterError", e);
        }
    },
};

const mutations = {
    setUserProfile(state, userProfile) {
        state.userProfile = userProfile;
    },
    setLoginError(state, e) {
        if (e.code == "auth/user-not-found") {
            state.loginErrorMessage = "User not found";
        } else if (e.code == "auth/invalid-email") {
            state.loginErrorMessage = "Bad email format";
        } else if (e.code == "auth/wrong-password") {
            state.loginErrorMessage = "Incorrect password";
        } else {
            state.loginErrorMessage = "Login failed";
        }
    },
    setRegisterError(state, e) {
        console.log(e.code);
        if (e.code == "auth/invalid-email") {
            state.registerErrorMessage = "Bad email format";
        } else if (e.code == "auth/weak-password") {
            state.registerErrorMessage =
                "Password must be at least 6 characters";
        } else {
            state.registerErrorMessage = "Login failed";
        }
    },
};

export default {
    state,
    actions,
    getters,
    mutations,
};
