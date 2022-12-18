import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleView from '@/views/articles/ArticleView'
import CreateView from '@/views/articles/CreateView'
import DetailView from '@/views/articles/DetailView'
import EditView from '@/views/articles/EditView'

import store from '@/store/index.js'
import SignUpView from '@/views/accounts/SignUpView'
import LogInView from '@/views/accounts/LogInView'
import ProfileView from '@/views/accounts/ProfileView'
import ProfileEditView from '@/views/accounts/ProfileEditView'
import ProfileMiniView from '@/views/accounts/ProfileMiniView'

import MovieView from '@/views/movies/MovieView'
import MovieDetailView from '@/views/movies/MovieDetailView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ArticleView',
    component: ArticleView
  },
  
  {
    path: '/create',
    name: 'CreateView',
    component: CreateView
  },
  
  {
    path: '/article/:id',
    name: 'DetailView',
    component: DetailView,
  },

  {
    path: '/edit',
    name: 'EditView',
    component: EditView
  },
  
  ////////////////////////////////////////////////
  
  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },
  
  {
    path: '/login',
    name: 'LogInView',
    component: LogInView
  },

  {
    path: '/profile/edit/:username',
    name: 'ProfileEditView',
    component: ProfileEditView
  },
  
  {
    path: '/profile/:username',
    name: 'ProfileView',
    component: ProfileView
  },

  {
    path: '/profilemini/:username',
    name: 'ProfileMiniView',
    component: ProfileMiniView
  },

  ///////////////////////////////////////////////////

  {
    path: '/movies',
    name: 'MovieView',
    component: MovieView,
  },

  {
    path: '/movies/:id',
    name: 'MovieDetailView',
    component: MovieDetailView,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  const isLogin = store.getters.isLogin
  const allowPages = [
    'HomeView','LogInView','SignUpView','MovieView']
  const forUserPages = !allowPages.includes(to.name)

  if (!isLogin && forUserPages) {
    alert('로그인이 필요합니다.')
    next({name:'LogInView'})
  } else {
    next()
  }
})


export default router
