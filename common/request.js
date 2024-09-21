// 引入本地存储工具，假设你将 Token 存储在本地
import store from '@/common/store.js'; // Vuex 或其他存储库

// 定义请求基础地址
const baseURL = 'http://39.98.115.211:8787/api/'; // 替换为你的API地址

// 请求封装
const request = (options) => {
	return new Promise((resolve, reject) => {
		// 从 Vuex 或本地存储中获取 access_token
		const token = store.state.accessToken || uni.getStorageSync('access_token');

		// 拦截请求，设置 Authorization 头
		const headers = options.headers || {};
		if (options.url !== 'login/login' && token) {
			headers['Authorization'] = `Bearer ${token}`; // 设置JWT Token
		}

		// 发送请求
		uni.request({
			url: baseURL + options.url, // 拼接完整URL
			method: options.method || 'GET',
			data: options.data || {},
			header: headers,
			success: (res) => {
				if (res.data.code === 401) {
					// 如果服务器返回 401，说明 Token 过期
					refreshToken().then(newToken => {
						// 更新 accessToken
						uni.setStorageSync('access_token', newToken);
						// 刷新 Token 成功后重新发送请求
						return request(options).then(resolve).catch(reject);
					}).catch(() => {
						// 刷新失败，跳转到登录页
						clearTokenAndRedirect();
						uni.redirectTo({
							url: '/pages/login/login'
						});
						reject('Unauthorized');
					});
				} else {
					resolve(res.data); // 返回成功的响应数据
				}
			},
			fail: (err) => {
				reject(err); // 处理请求失败的情况
			}
		});
	});
};

// 刷新 Token 方法
const refreshToken = () => {
	return new Promise((resolve, reject) => {
		const refreshToken = store.state.refreshToken || uni.getStorageSync('refresh_token');
		if (!refreshToken) {
			reject('No refresh token found');
		}

		// 调用刷新 Token API
		uni.request({
			url: baseURL + 'login/refresh_token',
			method: 'POST',
			data: {
				refresh_token: refreshToken
			},
			success: (res) => {
				if (res.statusCode === 200) {
					const newAccessToken = res.data.access_token;
					// 更新新的 access_token
					store.commit('setAccessToken', newAccessToken);
					uni.setStorageSync('access_token', newAccessToken);
					resolve();
				} else {
					reject('Failed to refresh token');
				}
			},
			fail: (err) => {
				reject(err);
			}
		});
	});
};
// 清除本地 token 并跳转到登录页面
function clearTokenAndRedirect() {
    uni.removeStorageSync('access_token');
    uni.removeStorageSync('refresh_token');
    uni.removeStorageSync('user_info');
    
    // 跳转到登录页面
    uni.redirectTo({
        url: '/pages/login/login'
    });
}

export default request;