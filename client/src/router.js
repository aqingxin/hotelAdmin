import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

const routes=[
  {
    path: '/',
    name: 'home',
    component: Home,
    meta:{
      requireAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router=new Router({
  routes
});

router.beforeEach((to,from,next)=>{
  if(to.meta.requireAuth&&window.localStorage.getItem('loginToken')==null){
    next({
      path:'/login'
    })
  }else{
    next();
  }
})

export default router

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home,
//       meta:{
//         requireAuth: true
//       }
//     },
//     {
//       path: '/login',
//       name: 'Login',
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: Login
//     }
//   ]
// })

