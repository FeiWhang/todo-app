import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "./firebase";
import VueMeta from "vue-meta";

Vue.config.productionTip = false;
Vue.use(VueMeta);

let app;
auth.onAuthStateChanged((user) => {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: (h) => h(App),
        }).$mount("#app");
    }
    if (user && router.currentRoute.path != "/login") {
        store.dispatch("fetchProfile", user);
    }
});
