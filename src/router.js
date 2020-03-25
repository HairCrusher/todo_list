import VueRouter from "vue-router";
import Home from './pages/index';
import Single from './pages/single';

export default new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: Home},
        {path: '/:id', component: Single},
    ]
});