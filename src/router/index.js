import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../components/Main/index.vue'
import Chat from '../components/Chat/index.vue'
import Chess from '../components/Game/index.vue'

Vue.use(VueRouter)

// const routerPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error=> error)
// }
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/main',
        component: Main,
      },
      {
        path: '/chat',
        component: Chat,
        meta: {
          needLogin: true,
        }
      },
      {
        path: '/chess',
        component: Chess,
        meta: {
          needLogin: true,
        }
      }
    ]
    // children:[
    //   {
    //     path: '/box-container',
    //     component: () => import('../components/Main/index.vue')
    //   },

    // ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/aside',
    name: 'Aside',
    component: () => import('../components/Aside/index.vue')
  },
  {
    path: '/navbar',
    name: 'Navbar',
    component: () => import('../components/Navbar/index.vue')
  },
  {
    path: '/box',
    component: () => import('../components/Main/Box.vue')
  },
  {
    path: '/box-container',
    component: () => import('../components/Main/index.vue')
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('../components/Chat/index.vue'),
    meta: {
      needLogin: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: ()=>import('../views/Login.vue')
  },
  {
    path: '/random',
    name: 'random',
    component: ()=>import('../views/Random.vue')
  },
  {
    path: '/block',
    name: 'block',
    component: ()=>import('../components/Block/index.vue')
  }
  // {
  //   path: 'box-container',
  //   component: 
  // }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next)=>{
  if(to.meta.needLogin){
    let user = JSON.parse(sessionStorage.getItem('user'));
    console.log(user);
    let isLogin = user ? true : false;
    if(isLogin) {
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next();
  }
  
})

export default router
