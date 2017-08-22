<template>
	<el-row class="container">
		<el-col :span="24" class="head">
			<div class="slogen" :class="isCollapse ? 'slogen-collapse' : 'slogen-expand'">
				{{isCollapse ? sysNameClose : sysNameOpen}}
			</div>
			<div class="tools" @click.prevent="collapse">
				<i class="fa fa-align-justify"></i>
			</div>
			<div class="logout">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo"><img :src="this.headImage"/>{{username}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</el-col>
		<el-col :span="24" class="body">
			<!-- 菜单 -->
			<div class="menu" :class="isCollapse ? 'menu-collapse' : 'menu-expand'">
				<!-- 菜单展开 -->
				<div v-show="!isCollapse">
					<!-- router 启用该模式在激活导航时以 index 作为 path 进行路由跳转 -->
					<el-menu :default-active="$route.path" unique-opened router :collapse="false">
						<template v-for="(item, index) in $router.options.routes" v-if="item.isMenu">
							<el-submenu :index="index+''" v-if="item.children.length>1">
								<template slot="title">
									<i :class="item.icon"></i>
									<span slot="title">{{item.name}}</span>
								</template>
								<el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
									<span slot="title">{{child.name}}</span>
								</el-menu-item>
							</el-submenu>
							<el-menu-item v-if="item.children.length==1" :index="item.children[0].path">
								<i :class="item.icon"></i>
								<span slot="title">{{item.children[0].name}}</span>
							</el-menu-item>
						</template>
					</el-menu>
				</div>
				<!-- 菜单折叠 -->
				<div v-show="isCollapse">
					<el-menu :default-active="$route.path" unique-opened router :collapse="true">
						<template v-for="(item, index) in $router.options.routes" v-if="item.isMenu">
							<el-submenu :index="index+''" v-if="item.children.length>1">
								<template slot="title">
									<i :class="item.icon"></i>
									<span slot="title">{{item.name}}</span>
								</template>
								<el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
									<span slot="title">{{child.name}}</span>
								</el-menu-item>
							</el-submenu>
							<el-menu-item v-if="item.children.length==1" :index="item.children[0].path">
								<i :class="item.icon"></i>
								<span slot="title">{{item.children[0].name}}</span>
							</el-menu-item>
						</template>
					</el-menu>
				</div>
			</div>
			<!-- 内容 -->
			<div class="main">
				<el-col :span="24" class="breadcrumb">
					<strong class="bread-hd">{{$route.name}}</strong>
					<el-breadcrumb separator="/" class="bread-bd">
						<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
							{{item.name}}
						</el-breadcrumb-item>
					</el-breadcrumb>
				</el-col>
				<transition name="fade" mode="out-in">
					<router-view></router-view>
				</transition>
			</div>
		</el-col>
	</el-row>
</template>
<script>
	export default {
		name: 'Home', //--组件名称
		data() {
			return {
				sysNameClose: '品',
				sysNameOpen: '品如设计 - 后台管理',
				username: '',
				headImage: '',
				isCollapse: false
			}
		},
		methods: {
			logout() {
				this.$confirm('确认退出吗?', '提示', {

				}).then(() => {
					sessionStorage.removeItem('user');
					this.$router.push('/login');
				})
			},
			collapse() {
				this.isCollapse = !this.isCollapse;
			}
		},
		beforeMount() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.username = user.name;
				this.headImage = user.headImage;
			}
		}
	}
</script>
<style lang="less">
	.container {
		width: 100%;
		position: absolute!important;
		left: 0;
		top: 0;
		bottom: 0;
		.head {
			width: 100%;
			height: 64px;
			color: #fff;
			line-height: 64px;
			background: #20A0FF;
			.slogen {
				float: left;
				height: 100%;
				font-size: 20px;
				text-align: center;
				border-right: 1px solid #5DB8DF;
				&.slogen-collapse {
					width: 64px;
				}
				&.slogen-expand {
					width: 200px;
				}
			}
			.tools {
				float: left;
				margin-left: 20px;
				i {
					cursor: pointer;
				}
			}
			.logout {
				float: right;
				cursor: pointer;
				margin-right: 30px;
				.userinfo {
					color: #fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 50%;
						margin: 10px 0 10px 10px;
						float: right;
					}
				}
			}
		}
		.body {
			width: 100%;
			position: absolute;
			top: 64px;
			bottom: 0;
			display: flex;
			.menu {
				height: 100%;
				background: #eef1f6;
				position: relative;
				.fa {
					margin-right: 6px;
				}
				&.menu-expand {
					flex: 0 0 200px;
				}
				&.menu-collapse {
					flex: 0 0 64px;
				}
				.el-submenu {
					z-index: 999999;
				}
			}
			.main {
				flex: 1;
				padding: 20px;
				overflow: auto;
				position: relative;
				.breadcrumb {
					float: right;
					height: 26px;
					margin-bottom: 15px;
					border-bottom: 1px solid #D3DCE6;
					.bread-hd{
						color: #475669;
						float: left;
						font-size: 13px;
					}
					.bread-bd {
						float: right;
					}
				}
			}	
		}
	}
</style>