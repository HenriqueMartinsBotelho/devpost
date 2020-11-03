import Vue from 'vue';
import Router from 'vue-router';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import firebase from './services/firebaseConnection';


Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes:[
        {
            path: '/',
            component: Home,
            meta:{
                requiresAuth: true,
            }
        },
        {
            path: '/dashboard',
            component: Dashboard,
            meta:{
                requiresAuth: true,
            }
        },
        {
            path: '/perfil/:userid',
            component: Perfil,
            props:true,
            meta:{
                requiresAuth: true,
            }
        },
        {
            path: '/login',
            component: Login,
        },
    ]
});

router.beforeEach((to, from, next)=>{
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    //Verificando se alguma rota tem esse requiresAuth.

    if(requiresAuth && !firebase.auth().currentUser){
        next('/login');
    }else{
        next();
    }
})

export default router;