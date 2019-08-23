import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Login = () => import(/* webpackChunkName: "login" */ './views/login.vue')
const Register = () => import(/* webpackChunkName: "register" */ './views/register.vue')
const Posts = () => import(/* webpackChunkName: "posts" */ './views/posts.vue')
const Users = () => import(/* webpackChunkName: "users" */ './views/users.vue')

let routers = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: 'Register'
      }
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts,
      meta: {
        title: 'Posts'
      }
    },
    {
      path: '/users',
      name: 'users',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Users,
      meta: {
        title: 'users'
      }
    }
  ]
})

routers.beforeEach((to, from, next) => {
  document.querySelector('#title').innerText = to.meta.title
  next()
})

export default routers
