<template>
	<view class="container">
		<!-- 头部导航条 -->
		<Header />
		<view class="content-wrap">
			<view class="bg-wrap">
				  <u-swiper
				            :list="banner"
				            @change="change"
				            @click="click"
							height = "200px"
				    ></u-swiper>
				<!-- <image src="/static/images/bg.png" mode="aspectFit" class="background-image"></image> -->
			</view>
			<view class="content-text">
				<uni-title type="h2" title="我们在一起已经" align="center"  style="color: #fff;"></uni-title>
			</view>
			<view class="content-time">
				<p class="time-text">{{ days }} 天 {{ hours }} 小时 {{ minutes }} 分钟 {{ seconds }} 秒</p>
			</view>
		</view>
		<u-divider text=""></u-divider>
		<view class="content-notice">
			<u-notice-bar :text="text1" class="notice-bar" :speed="30"  :fontSize="30"></u-notice-bar>
		</view>
		<view class="content-calendar">
			<!-- 插入模式 -->
			<uni-calendar class="uni-calendar--hook" :selected="info.selected" :showMonth="false" @change="change"
				@monthSwitch="monthSwitch" />
		</view>

		<view class="content-card">
			<view class="card" @click="handleClick('/pages/article/list')">
				<uni-card :is-shadow="false" is-full>
					<text class="uni-h6">碎碎念</text>
				</uni-card>
			</view>
			<view class="card" @click="handleClick('/pages/photo_cate/index')">
				<uni-card :is-shadow="false" is-full>
					<text class="uni-h6">老照片</text>
				</uni-card>
			</view>
			<!-- <view class="card">
				<uni-card :is-shadow="false" is-full>
					<text class="uni-h6">相册</text>
				</uni-card>
			</view>
			<view class="card">
				<uni-card :is-shadow="false" is-full>
					<text class="uni-h6">纪念</text>
				</uni-card>
			</view> -->

		</view>

	</view>
</template>
<script>
	import Header from '@/components/header/Header.vue';
	import { goToPage } from '@/common/utils.js';

	/**
	 * 获取任意时间
	 */
	function getDate(date, AddDayCount = 0) {
		if (!date) {
			date = new Date()
		}
		if (typeof date !== 'object') {
			date = date.replace(/-/g, '/')
		}
		const dd = new Date(date)

		dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期

		const y = dd.getFullYear()
		const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
		const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
		return {
			fullDate: y + '-' + m + '-' + d,
			year: y,
			month: m,
			date: d,
			day: dd.getDay()
		}
	}
	export default {
		components: {
			Header
		},
		data() {
			return {
				banner: [],
				text1: 'uView UI众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让您快速集成，开箱即用',

				showCalendar: false,
				info: {
					lunar: true,
					range: true,
					insert: false,
					selected: []
				},
				startTime: new Date('2024-06-14T00:00:00').getTime(), // 开始计时的时间，可以修改为你需要的时间
				currentTime: 0,
				timer: null,
			}
		},
		computed: {
			days() {
				return Math.floor(this.currentTime / (1000 * 60 * 60 * 24));
			},
			hours() {
				return Math.floor((this.currentTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			},
			minutes() {
				return Math.floor((this.currentTime % (1000 * 60 * 60)) / (1000 * 60));
			},
			seconds() {
				return Math.floor((this.currentTime % (1000 * 60)) / 1000);
			},
		},
		onLoad() {
			this.getBanner()
		
		},
		onReady() {
			this.$nextTick(() => {
				this.showCalendar = true
			})
			// TODO 模拟请求异步同步数据
			setTimeout(() => {
				this.info.date = getDate(new Date(), -30).fullDate
				this.info.startDate = getDate(new Date(), -60).fullDate
				this.info.endDate = getDate(new Date(), 30).fullDate
				this.info.selected = [{
						date: getDate(new Date(), -3).fullDate,
						info: '打卡'
					},
					{
						date: getDate(new Date(), -2).fullDate,
						info: '签到',
						data: {
							custom: '自定义信息',
							name: '自定义消息头'
						}
					},
					{
						date: getDate(new Date(), -1).fullDate,
						info: '已打卡'
					}
				]
			}, 2000)
		},
		mounted() {
			this.updateTimer();
			this.timer = setInterval(this.updateTimer, 1000);
		},
		beforeDestroy() {
			clearInterval(this.timer);
		},
		methods: {
			//获取轮播图
			getBanner() {
				uni.request({
				    url: this.siteBaseUrl + 'banner',
				    success: (res) => {
				       this.banner = res.data.data
				    }
				});

			},
			
			 handleClick(url) {
			      goToPage(url);
			    },
			open() {
				this.$refs.calendar.open()
			},
			close() {
				console.log('弹窗关闭');
			},
			change(e) {
				console.log('change 返回:', e)
				// 模拟动态打卡
				if (this.info.selected.length > 5) return
				this.info.selected.push({
					date: e.fulldate,
					info: '打卡'
				})
			},
			confirm(e) {
				console.log('confirm 返回:', e)
			},
			monthSwitch(e) {
				console.log('monthSwitchs 返回:', e)
			},
			updateTimer() {
				const now = new Date().getTime();
				this.currentTime = now - this.startTime;
			},
		}
	}
</script>

<style scoped>
/* 背景图片 */
.bg-wrap {
	width: 100%;
	overflow: hidden;
	position: relative;
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
	margin-bottom: 20px;
	height: auto;
	background-size: cover;
}

.background-image {
	width: 100%;
	border-radius: 10px;
}

/* 时间显示部分 */
.content-time {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 10px;
}

.time-text {
	font-size: 22px;
	font-weight: bold;
	color: #fff;
	background-color: rgba(0, 0, 0, 0.6);
	padding: 15px 25px;
	border-radius: 12px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	text-shadow: 0 0 5px rgba(255, 255, 255, 0.5); /* 发光效果 */
}

/* 通知栏 */
.content-notice {
	margin: 15px 10px;
}

.notice-bar {
	background-color: rgba(0, 0, 0, 0.8);
	color: #fff;
	border-radius: 8px;
	padding: 5px 10px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* 日历部分 */
.content-calendar {
	margin-top: 20px;
	padding: 0 10px;
}

.uni-calendar--hook {
	border-radius: 10px;
	background-color: rgba(255, 255, 255, 0.9);
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
	padding: 10px;
}

/* 卡片部分 */
.content-card {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-top: 20px;
	padding: 0 10px;
}

.content-card .card {
	flex: 1;
	min-width: 48%;
	margin-bottom: 20px;
}

.uni-card {
	border-radius: 10px;
	background-color: rgba(0, 0, 0, 0.6);
	color: #fff;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	padding: 15px;
	text-shadow: 0 0 3px rgba(255, 255, 255, 0.3); /* 轻微发光效果 */
}

.uni-h6 {
	font-size: 18px;
	font-weight: 500;
	color: #fff;
}

/* 通用样式 */
.container {
   padding: 20px 0;
      background: url('/static/images/pink-bg.png') no-repeat center center; /* 替换为你的星空背景图 */
      background-size: cover;
      min-height: 100vh;
      color: #fff;
	  padding-top: 70px; /* 增加顶部内边距，确保内容不被头部遮挡 */
}

</style>