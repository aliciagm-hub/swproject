import { createWebHistory, createRouter } from 'vue-router'
import MainPage from './views/MainPage.vue'
import Menu from './views/Menu.vue'
import Detail from './views/Detail.vue'

const routes = [
    {path: '/', component: MainPage},
    {path: '/menu/:url', component: Menu, props: true},
    {path: '/detail', name: 'detail', component: Detail, props: {dataUrl: true}}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router