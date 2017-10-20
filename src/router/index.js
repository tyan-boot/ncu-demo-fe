import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/SignIn'
import Comment from '@/components/Comment'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Comments',
      component: Comment
    },
    {
      path: '/signin',
      name: 'Sign In',
      component: SignIn
    },
    {
      path: '/comments',
      name: 'Comments',
      component: Comment
    }
  ]
})
