// libs
import { createRouter, createWebHistory } from 'vue-router';
// screens
import Home from './screens/Home.vue';

const routes = [
    {
        path: '/',
        component: Home,
        name: 'Home'
    },
    {
        path: '/quiz/:quiz',
        component: () => import('./screens/Quiz.vue'),
        name: 'Quiz',
    }
];


export default createRouter({
    history: createWebHistory(),
    routes,
});
