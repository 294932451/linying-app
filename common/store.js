import Vue from 'vue';
import Vuex from 'vuex';

// 让 Vue 使用 Vuex
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        accessToken: uni.getStorageSync('access_token') || '',
        refreshToken: uni.getStorageSync('refresh_token') || ''
    },
    mutations: {
        setAccessToken(state, token) {
            state.accessToken = token;
            uni.setStorageSync('access_token', token);  // 同步更新本地存储
        },
        setRefreshToken(state, token) {
            state.refreshToken = token;
            uni.setStorageSync('refresh_token', token); // 同步更新本地存储
        }
    }
});

export default store;
