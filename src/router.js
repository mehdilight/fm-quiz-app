// libs
import {createRouter, createWebHistory} from 'vue-router';
// screens
import Home from './screens/Home.vue';
import Quiz from './screens/Quiz.vue';

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/:quiz',
        component: Quiz
    }
];


export default createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
});
