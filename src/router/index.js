import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'//@表示当前项目路径
import Login from '@/components/Login'
import NotFind from '@/components/404'
import Template from '@/components/Template'
import Home from '@/components/Home'
import Poster from '@/components/Poster'
import Sign from '@/components/Sign'
import UserCase from '@/components/UserCase'
import HomeCase from '@/components/HomeCase'
import DetailCase from '@/components/DetailCase'
import ShowCase from '@/components/ShowCase'
import Team from '@/components/Team'


Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/Login',
			component: Login,
			name: ''
		},
		{
			path: '/404',
			component: NotFind,
			name: ''
		},
		{
			path: '/',//根路径进行跳转
			name: '模板列表',
			component: Home,
			icon: 'fa fa-th-list',//图标
			isMenu: true,//导航菜单
			children: [
				{
					path: '/template',
					name: '模板列表',
					component: Template
				}
			]
		},
		{
			path: '/',
			name: '免费设计',
			component: Home,
			icon: 'fa fa-pencil',
			isMenu: true,//导航菜单
			children: [
				{
					path: '/poster',
					name: '海报列表',
					component: Poster
				},
				{
					path: '/sign',
					name: '店招列表',
					component: Sign
				}
			]
		},
		{
			path: '/',
			name: '案例管理',
			component: Home,
			icon: 'fa fa-tasks',
			isMenu: true,//导航菜单
			children: [
				{
					path: '/case-case',
					name: '客户案例',
					component: UserCase
				},
				{
					path: '/home-case',
					name: '首页案例',
					component: HomeCase
				},
				{
					path: '/detail-case',
					name: '详情案例',
					component: DetailCase
				},
				{
					path: '/show-case',
					name: '工具案例',
					component: ShowCase
				}
			]
		},
		{
			path: '/',
			name: '宇辰伙伴',//命名路由
			component: Home,
			// title: '',
			icon: 'fa fa-user',//图标
			isMenu: true,//导航菜单
			children: [
				{
					path: '/team',
					name: '宇辰伙伴',
					component: Team
				}
			]
		}
	]
})
