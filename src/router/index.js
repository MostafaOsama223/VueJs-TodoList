import Vue from "vue"
import VueRouter from "vue-router"

/*  Views   */
import Home from "../views/Home.vue"
import List from "../views/List.vue"
import ViasTest from '../views/ViasTest.vue'
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: "Home",
        component: Home
    },
    {
        path: '/l/:listId',
        name: "List",
        component: List,
        props: true
    },
    {
        path: '/x',
        name: "VisaTest",
        component: ViasTest,
        props: true
    }
];

const router = new VueRouter({
    mode: "history",
    // base: process.env.BASE_URL,
    routes
})

export default router;