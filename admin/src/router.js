import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main'
import Login from './views/Login'
import CategoryEdit from './views/CategoryEdit'
import List from './views/CategoryList'

import ItemsEdit from './views/ItemsEdit'
import ItemsList from './views/ItemsList'

import HeroEdit from './views/HeroEdit'
import HeroList from './views/HeroList'

import ArticleEdit from './views/ArticleEdit'
import ArticleList from './views/ArticleList'

import AdsEdit from './views/AdsEdit'
import AdsList from './views/AdsList'

import AdmainUserEdit from './views/AdmainUserEdit'
import AdmainUserList from './views/AdmainUserList'

Vue.use(Router)


const router=new Router({
  routes: [
    {
      path:'/login',
      name:'login',
      component:Login,
      meta:{public:true}
    },
    {
      path: '/',
      name: 'amin',
      component: Main,
      children:[
        {path:'/categories/create',component:CategoryEdit},
        {path:'/categories/list',component:List},
        {path:'/categories/edit/:id',component:CategoryEdit,props:true},

        {path:'/items/create',component:ItemsEdit},
        {path:'/items/list',component:ItemsList},
        {path:'/items/edit/:id',component:ItemsEdit,props:true},

        {path:'/heroes/create',component:HeroEdit},
        {path:'/heroes/list',component:HeroList},
        {path:'/heroes/edit/:id',component:HeroEdit,props:true},

        {path:'/articles/create',component:ArticleEdit},
        {path:'/articles/list',component:ArticleList},
        {path:'/articles/edit/:id',component:ArticleEdit,props:true},

        {path:'/ads/create',component:AdsEdit},
        {path:'/ads/list',component:AdsList},
        {path:'/ads/edit/:id',component:AdsEdit,props:true},

        {path:'/admain_users/create',component:AdmainUserEdit},
        {path:'/admain_users/list',component:AdmainUserList},
        {path:'/admain_users/edit/:id',component:AdmainUserEdit,props:true},
      ]
    },

  ]
})

router.beforeEach((to, from, next) => {
  if(!to.meta.public && !localStorage.token){
    return next('/login')
  }

  next()
})

export default router
