一、构建项目
	$ cnpm i vue-cli -g 			# 全局安装 vue-cli
	$ vue init webpack admin 		# 创建一个基于webpack模板的新项目
	$ cd admin
	$ cnpm i						# 安装依赖
	$ npm run dev					# 启动项目


二、安装依赖包
	1、安装element-ui(网站快速成型工具)
		$ cnmp i element-ui -S

	2、安装font-awesome图标库(一套绝佳的图标字体库和CSS框架)
		$ cnmp i font-awesome -S

	3、安装axios(一个基于promise的HTTP库)
		$ cnpm i axios -S

	4、安装less(一门CSS预处理语言)
		$ cnmp i less less-loader -D

		打开./build/webpack.base.conf.js文件，在rules里添加
		{
			test: /\.less$/,
			loader: "style-loader!css-loader!less-loader"
		}

		打开.vue文件，在style标签里添加lang="less"

	5、安装babel-polyfill(更全面的支持ES6语法，支持Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局API)
		$ cnpm i babel-polyfill -D
		

	6、安装axios-mock-adapter(axios的模拟调试器)
		$ cnpm i axios-mock-adapter -D

	7、安装mockjs(生成随机数据)
		$ cnpm i mockjs -D


三、打开./src/components文件夹，新建所有的页面文件
	
四、打开./src/router/index.js文件，配置路由信息

五、打开./src/mian.js文件，配置信息

六、打开./src/components/Home.vue文件，编写路由功能

七、完成各个页面开发

八、最后完成登录模块

九、npm run build 生成环境环境代码



文件说明：
	-admin
		-build
		-config
		-dist(生成环境环境代码)
		-node-modules
		-src(主要项目文件)
			-api(ajax后台交互)
			-assets(静态资源文件)
			-common(公共文件代码)
			-components(组件代码)
			-mock(模拟数据)
			-router(路由文件)
		-static
		-test



参考手册地址：
	vue2.0				https://cn.vuejs.org/v2/guide/installation.html
	element-ui  		http://element.eleme.io/#/zh-CN/component/installation
	mockjs 				http://mockjs.com/
	font-awesome 		http://fontawesome.io/
	axios 				https://www.npmjs.com/package/axios
	axios-mock-adapter	https://www.npmjs.com/package/axios-mock-adapter



	
	




