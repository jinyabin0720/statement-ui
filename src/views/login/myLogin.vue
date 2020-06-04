<template>
	<div class="login">
		<img class="login-logo" src="../../assets/img/logo-name.png" />
		<div class="login-cont">
			<el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px" class="login-form">
				<h3 class="title">微服务技术中台</h3>
				<el-form-item prop="username">
					<el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号"><i slot="prefix" class="el-input__icon el-icon-user"></i></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin">
						<i slot="prefix" class="el-input__icon el-icon-lock"></i>
					</el-input>
				</el-form-item>
				<el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
				<el-form-item style="width:100%;">

					<a href="/sso-login"><el-button size="medium" type="primary" style="width:100%;">
						快速登录
					</el-button></a>
					<!-- <el-button :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
						<span v-if="!loading">登 录</span>
						<span v-else>登 录 中...</span>
					</el-button> -->
				</el-form-item>
				<p class="login-tip">系统默认用户名：admin，密码：123456</p>
			</el-form>
		</div>
	</div>
</template>

<script>

export default {
	data() {
		return {
			loginForm: {
				username: '',
				password: '',
				rememberMe: false
			},
			loginRules: {
				username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
				password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
			},
			loading: false,
			redirect: undefined
		};
	},
	methods: {
		handleLogin() {
			this.$refs.loginForm.validate(valid => {
				if (valid) {
					this.loading = true;
					this.$router.push({ path: '/homepage' });
				} else {
					return false;
				}
			});
		}
	}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.login-logo {
	position: absolute;
	top: 0;
	left: 5px;
	height: 70px;
	width:auto;
}
.login {
	float: left;
	width: 100%;
	height: 100%;
	display: table;
	background-image: url('../../assets/img/login-bg.jpg');
}
.login-cont {
	display: table-cell;
	text-align: center;
	vertical-align: middle;
}
.title {
	margin: 0px auto 40px auto;
	text-align: center;
	color: #707070;
}

.login-form {
	display: inline-block;
	text-align: left;
	border-radius: 6px;
	background: #ffffff;
	width: 365px;
	padding: 25px 25px 5px 25px;
}
.login-tip {
	font-size: 13px;
	text-align: center;
	color: #bfbfbf;
}
</style>
