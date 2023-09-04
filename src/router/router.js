import { createRouter, createWebHistory } from 'vue-router'
import Main from '../pages/Main.vue'


const routes = [
    {
        path: '/',
        component: Main

    },


]

const router = createRouter({
    routes,
    // history: createWebHistory(process.env.BASE_URL),
    history: createWebHistory()
})

export default router;