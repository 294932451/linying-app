<template>
	<div class="login-container">
		<div class="background">
			<div class="cartoon-couple"></div>
			<div class="top-decoration"></div>
		</div>
		<div class="login-form">
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
	export default {
		data() {
			return {
				username: '',
				password: '',
				defaultAvatar: [
					"http://39.98.115.211:8787/app/admin/upload/img/20240912/66e2b6609949.jpg",
					"http://39.98.115.211:8787/app/admin/upload/img/20240912/66e2b6577353.jpg",
				],
			};
		},
		methods: {
			login() {
				uni.request({
					url:this.siteBaseUrl + 'login/login',
					method:'POST',
					data:{
						username:this.username,
						password:this.password
					},
					success: (res) => {
						console.log(res);
						if(res.data.code==200) {
							uni.showToast({
								title: res.data.msg,
								icon: 'success'
							});
							setTimeout(function () {
								uni.switchTab({
									url:'/pages/index/index'
								})
							}, 2000);
							// 登录逻辑处理
							
						}else{
							uni.showToast({
								title: res.data.msg,
								icon: 'error'
							});
						}
					}
				})
				
				
			},
		},
	};
</script>

<style scoped>
	.login-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-image: url('/static/images/login-bg-1.png');
		 background-size: contain; /* 确保图片完整显示 */
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