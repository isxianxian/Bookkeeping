import Vue from 'vue'
import Router from 'vue-router'

import NotFound from './views/NotFound.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';
import Index from './views/Index.vue';
import Home from './views/Home.vue';
import Person from './views/Person.vue';
import Fund from './views/Fund.vue';


Vue.use(Router)

let router = new Router({
  mode:'hash',
  routes:[
    {path:'/' , redirect:'/login'},
    {path:'/register' , component:Register},
    {path:'/login' , component:Login},
    {
      path:'/index' , component:Index,
      children:[
        {path:'home' , component:Home},
        {path:'person' , component:Person},
        {path:'fund' , component:Fund},
        {path:'' , component:Home}
      ]
    },
    {path:'/*' , component:NotFound}
  ]
})

// 路由守卫
router.beforeEach((to,from,next)=>{
  let isLogin = localStorage.getItem('eleToken')? true:false;
  if(to.path == '/login' || to.path == '/register'){
    next();
  }else{
    isLogin?next():next('/login');
  }
})

export default router;

