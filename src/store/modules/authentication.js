import { db, auth } from "@/firebase";
import router from "@/router/index";

const state = {
    userProfile: {
        firstName: "",
        lastName: "",
        email: "",
    },
    loginErrorMessage: "",
    registerErrorMessage: "",
};

const getters = {
    userProfile: (state) => state.userProfile,
    authenticated: () => (auth.currentUser ? true : false),
    loginErrorMessage: (state) => state.loginErrorMessage,
    registerErrorMessage: (state) => state.registerErrorMessage,
};

const actions = {
    async login({ commit, dispatch }, form) {
        try {
            // sign user in
            const response = await auth.signInWithEmailAndPassword(
                form.email,
                form.password
            );

            if (response) {
                // set user profile  in state
                dispatch("fetchProfile", response.user);
            } else {
                console.log(response);
            }
        } catch (e) {
            commit("setLoginError", e);
        }
    },

    async fetchProfile({ commit }, user) {
        const userProfile = await db
            .ref("users/" + user.uid)
            .once("value")
            .then((snapshot) => snapshot.val());

        commit("setUser", userProfile);

        if (router.currentRoute.path === "/login") {
            router.push("/todo");
        }
    },

    async logout({ commit }) {
        await auth.signOut();
        commit("setUser", {
            firstName: "",
            lastName: "",
            email: "",
        });
        router.push("/login");
    },

    async register({ commit }, form) {
        try {
            // when confirm password doesn't match
            if (form.password != form.confirmPassword) {
                const passNotMatchError = new Error();
                passNotMatchError.code = "pass-not-match";
                throw passNotMatchError;
            }
            const response = await auth.createUserWithEmailAndPassword(
                form.email,
                form.password
            );

            if (response) {
                // successfully registered

                commit("registerUser", {
                    firstName: form.firstName,
                    lastName: form.lastName,
                    email: form.email,
                });
                router.push("/register/success");
            }
        } catch (e) {
            console.log(e);
            commit("setRegisterError", e);
        }
    },
};

const mutations = {
    setUser(state, userProfile) {
        state.userProfile = userProfile;
    },

    registerUser(state, userProfile) {
        state.userProfile = userProfile;

        db.ref("users/" + auth.currentUser.uid).set(userProfile);
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
        if (e.code == "pass-not-match") {
            state.registerErrorMessage = "Confirm password does not match";
        } else if (e.code == "auth/invalid-email") {
            state.registerErrorMessage = "Bad email format";
        } else if (e.code == "auth/weak-password") {
            state.registerErrorMessage =
                "Password must be at least 6 characters";
        } else if (e.code == "auth/email-already-in-use") {
            state.registerErrorMessage = "This email is already taken";
        } else {
            state.registerErrorMessage = "Register failed";
        }
    },
};

export default {
    state,
    actions,
    getters,
    mutations,
};
