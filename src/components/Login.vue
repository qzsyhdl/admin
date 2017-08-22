<template>
	<el-form :model="formData" :rules="formRule" ref="formRule" class="login">
		<h3 class="title">系统登录</h3>
		<el-form-item prop="account">
			<el-input type="text" v-model="formData.account" auto-complete="off" placeholder="账号"></el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input type="password" v-model="formData.password" auto-complete="off" placeholder="密码"></el-input>
		</el-form-item>
		<el-checkbox v-model="checked" :checked="checked" class="remember">记住账号</el-checkbox>
		<el-form-item style="width:100%;">
			<el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="loading">登录</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
	import {requestLogin} from '../api/api';
	export default {
		name: 'login', //--组件名称
		data() {
			return {
				loading: false,
				formData: {
					account: '',
					password: ''
				},
				formRule: {
					account: [
						{required:true, message:'请输入账号', trigger:'blur'}
					],
					password: [
						{required:true, message:'请输入密码', trigger:'blur'}
					]
				},
				checked: false
			};
		},
		methods: {
			handleSubmit(ev) {
				this.$refs.formRule.validate(valid => {
					if (valid) {
						this.loading = true;
						let params = {username: this.formData.account, password: this.formData.password};
						requestLogin(params).then(res => {
							this.loading = false;
							let {msg, code, user} = res.data;
							if (code !== 200) {
								this.$message({
									message: msg,
									type: 'error'
								});
							} else {
								if (this.checked) {
									this.setCookie('account', this.formData.account, 15);
									this.setCookie('rememberLogin', this.checked, 15);
								} else {
									this.removeCookie('account');
									this.removeCookie('rememberLogin');
								}
								sessionStorage.setItem('user', JSON.stringify(user));
								this.$router.push({path: '/template'});
							}
						});
					} else {
						console.log('error submit!');
						return false;
					}
				});
			},
			setCookie(name, value, days) {
				var d = new Date;
				d.setTime(d.getTime() + 24*60*60*1000*days);
				window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
			},
			getCookie(name) {
				var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
				return v ? v[2] : null;
			},
			removeCookie(name) {
				this.setCookie(name, '', -1);
			}
		},
		beforeMount() {
			if (this.getCookie('account')) {
				this.formData.account = this.getCookie('account');
			}
			if (this.getCookie('rememberLogin')) {
				this.checked = true;
			}
		}
	}
</script>
<style lang="less" scoped>
	.login {
		-webkit-border-radius: 5px;
		border-radius: 5px;
		-moz-border-radius: 5px;
		background-clip: padding-box;
		margin: 180px auto;
		width: 350px;
		padding: 35px 35px 15px 35px;
		background: #fff;
		border: 1px solid #eaeaea;
		box-shadow: 0 0 25px #cac6c6;
		.title {
			margin: 0px auto 40px auto;
			text-align: center;
			color: #505458;
		}
		.remember {
			margin: 0px 0px 35px 0px;
		}
	}
</style>