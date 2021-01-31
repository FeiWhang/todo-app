import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "@/firebase";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../views/Home.vue"),
    },
    {
        path: "/todo",
        name: "Todo",
        component: () => import("../views/Todo.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue"),
        meta: {
            preventByAuth: true,
        },
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("../views/Register.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

const beforeRouteEnter = async (to, from, next) => {
    if (to.meta.requiresAuth) {
        auth.currentUser ? next() : next("/login");
    } else if (to.meta.preventByAuth) {
        auth.currentUser ? next("/") : next();
    } else {
        next();
    }
};

router.beforeEach(beforeRouteEnter);

export default router;
