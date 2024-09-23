
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import uView from '@/uni_modules/uview-ui'
import VueI18n from 'vue-i18n'
import zh from 'static/lang/zh.js'
import en from 'static/lang/en.js'
import store from './common/store'
import './common/css/common.css'  // 假设你的 common.css 放在根目录
Vue.use(uView)
Vue.use(VueI18n)
// 引入全局样式


// 调用setConfig方法，方法内部会进行对象属性深度合并，可以放心嵌套配置
// 需要在Vue.use(uView)之后执行
uni.$u.setConfig({
	// 修改$u.config对象的属性
	config: {
		// 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
		unit: 'rpx'
	},
	// 修改$u.props对象的属性
	props: {
		// 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
		radio: {
			size: 15
		}
		// 其他组件属性配置
		// ......
	}
})



Vue.config.productionTip = false

const baseURL = 'http://39.98.115.211:8787'

// 获取用户当前语言，默认使用中文
const i18n = new VueI18n({
  locale: 'zh', // 设置默认语言
  messages: {
      zh,
      en,
    },
})

Vue.prototype.siteBaseUrl = baseURL + '/api/'
App.mpType = 'app'

const app = new Vue({
	store,
	i18n,  // 将 i18n 实例传递给 Vue 实例
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif