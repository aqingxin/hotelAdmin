import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Lock from './views/Lock.vue'

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
  },
  {
    path: '/lock',
    name: 'Lock',
    component: Lock,
    meta:{
      requireAuth: true
    }
  },
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

  if(to.meta.requireAuth&&window.localStorage.getItem('lock')!==null&&eval(window.localStorage.getItem('lock').toLowerCase())){
    console.log(2222)
    next({
      path:'/lock'
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

