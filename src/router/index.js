import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/store'
import * as types from '@/store/types'

Vue.use(Router);

const router = new Router({

  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require([`@/views/home`],resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require([`@/views/login/login`],resolve)
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require([`@/views/login/register`],resolve)
    },
    {
      path: '/edit_password',
      name: 'register',
      component: resolve => require([`@/views/login/edit_password`],resolve)
    },
    {
      path: '/task/add/:id',
      name: 'task_add',
      component: resolve => require([`@/views/task/add`],resolve)
    },
    {
      path: '/task/list',
      name: 'task_list',
      component: resolve => require([`@/views/task/list`],resolve)
    },
    {
      path: '/task/detail/:id',
      name: 'task_detail',
      component: resolve => require([`@/views/task/detail`],resolve)
    },
    {
      path: '/task/dist_detail',
      name: 'task_detail',
      component: resolve => require([`@/views/task/dist_detail`],resolve)
    },
    {
      path: '/task/start/:id',
      name: 'task_start',
      component: resolve => require([`@/views/task/start`],resolve)
    },
    {
      path: '/task/reward',
      name: 'reward_list',
      component: resolve => require([`@/views/task/reward_list`],resolve)
    },
    {
      path: '/task/check/:id',
      name: 'check',
      component: resolve => require([`@/views/task/check_list`],resolve)
    },
    {
      path: '/task/check_detail/:id',
      name: 'check',
      component: resolve => require([`@/views/task/check_detail`],resolve)
    },
    {
      path: '/user',
      name: 'user',
      component: resolve => require([`@/views/user/user`],resolve)
    },
	  {
		  path: '/user/set_user',
		  name: 'set_user',
		  component: resolve => require([`@/views/user/set_user`],resolve)
	  },
  ],
});

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
	store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
		if (store.state.token) {  // 通过vuex state获取当前的token是否存在
			next();
		}
		else {
			next({
				path: '/login',
				query: {redirect: to.fullPath, id: from.params}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
			})
		}
	}
	else {
		next();
	}
});

export default router
