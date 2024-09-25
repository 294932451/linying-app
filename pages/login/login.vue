<template>
	<div class="login-container">
		<div class="background">
			<div class="cartoon-couple"></div>
			<div class="top-decoration"></div>
		</div>
		
		<div class="login-form">
			<!-- 合并的语言切换按钮 -->
			<div class="language-switch">
				<button @click="toggleLanguageMenu" class="language-button">
					{{currentLanguageLabel}}
				</button>
				<ul v-if="showLanguageMenu" class="language-menu">
					<li @click="changeLanguage('en')">English</li>
					<li @click="changeLanguage('zh')">中文</li>
				</ul>
			</div>
			<div class="form-header">
				<p>{{$t('login.title')}}</p>
			</div>
		
			<div class="avatar-selection">
				<div class="avatar" v-for="(avatar, index) in defaultAvatar" :key="index">
					<img :src="avatar" alt="avatar" />
				</div>
			</div>
			<div class="input-group">
				<i class="icon-user"></i>
				<input type="text" v-model="username" :placeholder=" $t('login.username') " class="input-field" />
			</div>
			<div class="input-group">
				<i class="icon-lock"></i>
				<input type="password" v-model="password" :placeholder="$t('login.password')" class="input-field" />
			</div>
			<button @click="login" class="login-button">
				<i class="icon-heart"></i>
				{{$t('login.login')}}
			</button>
			<div class="bottom-decoration"></div>
		</div>
	</div>
</template>



<script>
	import request from '@/common/request.js'
	export default {
		data() {
			return {
				username: '',
				password: '',
				defaultAvatar: [
					"http://39.98.115.211:8787/app/admin/upload/img/20240912/66e2b6609949.jpg",
					"http://39.98.115.211:8787/app/admin/upload/img/20240912/66e2b6577353.jpg",
				],
				showLanguageMenu: false,
				currentLanguageLabel: 'English', // 默认展示的语言
			};
		},
		onLoad() {

		},
		methods: {
			toggleLanguageMenu() {
				this.showLanguageMenu = !this.showLanguageMenu;
			},
			changeLanguage(lang) {
				this.$i18n.locale = lang;
				this.currentLanguageLabel = lang === 'zh' ? '中文' : 'English';
				uni.setStorageSync('lang', lang);
				this.showLanguageMenu = false; // 切换语言后关闭菜单

			},
			login() {
				request({
					url: 'login/login',
					method: 'POST',
					data: {
						username: this.username,
						password: this.password
					},
				}).then(res => {
					if (res.code == 200) {
						// 登录成功，将 token、refreshToken 和 userinfo 保存到本地存储
						const {
							accessToken,
							refreshToken,
							userInfo
						} = res.data;
						// 存储 accessToken
						uni.setStorageSync('access_token', accessToken);
						// 存储 refreshToken
						uni.setStorageSync('refresh_token', refreshToken);
						// 存储用户信息
						uni.setStorageSync('user_info', userInfo);
						uni.showToast({
							title: res.msg,
							icon: 'success'
						});
						uni.switchTab({
							url: '/pages/index/index'
						})

					} else {
						uni.showToast({
							title: res.msg,
							icon: 'success'
						})
					}
					console.log(res);
				}).catch(err => {
					console.log(err);
					uni.showToast({
						title: '登录失败，请重试',
						icon: 'none'
					});
				})
			},
		},
	};
</script>

<style scoped>
	.language-switch {
			position: relative;
			margin-bottom: 20px;
			display: flex;
			justify-content: center;
		}
	
		.language-button {
			background-color: #ff6f91;
			color: white;
			border: none;
			border-radius: 20px;
			cursor: pointer;
			font-size: 15px;
			box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
			transition: transform 0.2s, background-color 0.2s;
		}
	
		.language-button:hover {
			transform: scale(1.05);
		}
	
		.language-menu {
			position: absolute;
			top: 50px;
			background-color: white;
			border-radius: 10px;
			box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
			list-style: none;
			padding: 10px 0;
			width: 100px;
			text-align: center;
		}
	
		.language-menu li {
			padding: 10px;
			cursor: pointer;
			color: #ff6f91;
			transition: background-color 0.2s;
		}
	
		.language-menu li:hover {
			background-color: #ff6f91;
			color: white;
		}
	.login-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-image: url('http://39.98.115.211:8787/app/admin/upload/bgimgs/login-bg.png');
		background-size: contain;
		/* 确保图片完整显示 */
		/* 确保路径正确 */
		position: relative;
		padding: 20px;
		box-sizing: border-box;
	}

	.background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: -1;
	}

	.cartoon-couple {
		position: absolute;
		bottom: 20px;
		right: 20px;
		width: 150px;
		height: 150px;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.top-decoration {
		position: absolute;
		top: 10px;
		left: 50%;
		transform: translateX(-50%);
		width: 120px;
		height: 60px;
		background-size: contain;
		background-repeat: no-repeat;
	}

	.login-form {
		position: relative;
		background-color: #fff;
		border-radius: 20px;
		padding: 30px 40px;
		text-align: center;
		box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.2);
		width: 350px;
	}

	.form-header {
		margin-bottom: 20px;
	}

	.form-header h2 {
		font-size: 24px;
		margin-bottom: 10px;
	}

	.form-header p {
		font-size: 14px;
		color: #666;
	}

	.avatar-selection {
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
	}

	.avatar {
		width: 60px;
		height: 60px;
		margin: 0 10px;
		border-radius: 50%;
		overflow: hidden;
		background-color: #f0f0f0;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s;
	}

	.avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.avatar:hover {
		transform: scale(1.1);
	}

	.input-group {
		position: relative;
		margin: 10px 0;
		width: 100%;
	}

	.input-group .icon-user,
	.input-group .icon-lock {
		position: absolute;
		left: 15px;
		top: 50%;
		transform: translateY(-50%);
		font-size: 18px;
		color: #ff9a9e;
	}

	.input-field {
		padding: 10px 15px 10px 40px;
		border: 2px solid #ff9a9e;
		border-radius: 20px;
		outline: none;
		box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
	}

	.login-button {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 80%;
		padding: 12px;
		background: linear-gradient(135deg, #ff6f91, #ff4f70);
		border: none;
		border-radius: 20px;
		color: white;
		font-weight: bold;
		cursor: pointer;
		transition: transform 0.2s, background-color 0.2s;
	}

	.login-button i {
		margin-right: 8px;
	}

	.login-button:hover {
		transform: scale(1.05);
	}

	.bottom-decoration {
		position: absolute;
		bottom: -20px;
		left: 50%;
		transform: translateX(-50%);
		width: 150px;
		height: 60px;
		opacity: 0.8;
	}
</style>