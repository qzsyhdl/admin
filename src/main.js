// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import babelpolyfill from 'babel-polyfill'//更全面的支持ES6环境

import Vue from 'vue'
import App from './App'
import router from './router'//默认引入router文件下的index.js

import ElementUI from 'element-ui'//引入element-ui
import 'element-ui/lib/theme-default/index.css'//引入element-ui默认样式主题

import 'font-awesome/css/font-awesome.min.css'//引入font-awesome图标库
import Mock from './mock'//引入mock下面的index.js文件


Vue.use(ElementUI)
Vue.use(router)


Vue.config.productionTip = false//阻止Vue在启动时生成生产提示


router.beforeEach((to, from, next) => {//验证是否登录
	if (to.path === '/login') {
		sessionStorage.removeItem('user');
	}
	let user = JSON.parse(sessionStorage.getItem('user'));
	if (!user && to.path !== '/login') {
		next({path: '/login'});
	} else {
		next();
	}
});


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',//加载App.vue, <div id="app"></div>将被替换
	components: { App }
});
