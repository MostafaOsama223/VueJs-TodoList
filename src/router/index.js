import Vue from "vue"
import VueRouter from "vue-router"

/*  Views   */
import Home from "../views/Home.vue"
import List from "../views/List.vue"

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: "Home",
        component: Home
    },
    {
        path: '/l/:id',
        name: "List",
        component: List,
        props: true
    }
];

const router = new VueRouter({
    mode: "history",
    // base: process.env.BASE_URL,
    routes
})

export default router;