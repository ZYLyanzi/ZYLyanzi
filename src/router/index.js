import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  	routes: [
	    {
	      	path: '/',
	      	name: 'home',
	      	component: resolve => require([`@/views/home`],resolve)
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
  	],
});
