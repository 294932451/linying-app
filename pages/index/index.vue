<template>
	<view class="container">
		<!-- 头部导航条 -->
	    <Header />
		<view class="content-wrap">
			<view class="bg-wrap">
				<image src="/static/images/bg.png" mode="aspectFit" style="width: 100%; "></image>
			</view>
			<view class="content-text">
				<uni-title type="h2" title="我们在一起已经" align="center"></uni-title>
			</view>
			<view class="content-time">
				<uni-countdown :day="1" :hour="1" :minute="12" :second="40" />
			</view>
		</view>
		<u-divider text="" ></u-divider>
		<view class="content-notice">
			<u-notice-bar :text="text1"></u-notice-bar>
		</view>
		<view class="content-calendar">
			<!-- 插入模式 -->
			<uni-calendar class="uni-calendar--hook" :selected="info.selected" :showMonth="false" @change="change"
				@monthSwitch="monthSwitch" />
		</view>
		
		<view class="content-card">
			<view class="card">
				<uni-card :is-shadow="false" is-full >
					<text class="uni-h6">点点滴滴</text>
				</uni-card>
			</view>
			<view class="card">
				<uni-card :is-shadow="false" is-full >
					<text class="uni-h6">关于我们</text>
				</uni-card>
			</view>
			<view class="card">
				<uni-card :is-shadow="false" is-full >
					<text class="uni-h6">相册</text>
				</uni-card>
			</view>
			<view class="card">
				<uni-card :is-shadow="false" is-full >
					<text class="uni-h6">纪念</text>
				</uni-card>
			</view>
		
		</view>

	</view>
</template>

<script>
	import Header from '@/components/header/Header.vue';

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
		components: {Header},
		data() {
			return {
				list1: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				],
				text1: 'uView UI众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让您快速集成，开箱即用',
	
				showCalendar: false,
				info: {
					lunar: true,
					range: true,
					insert: false,
					selected: []
				},
			}
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
		methods: {
	
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
			}
		}
	}
</script>

<style>
	

	.bg-wrap {
		width: 100%;
	}

	.content-time {
		display: flex;
		justify-content: center;
	}

	.content-card {
		height: 350px;
		margin-top: 20px;
		text-align: center;
		
	}

	.content-card .card {
		margin-top: 30px;
	}

	.foot-wrap {
		position: fixed;
		bottom: 0;
		width: 100%;
	}
	.content-notice {
		margin: 10px 10px 0 0;
	}

	.calendar-button {
		flex: 1;
		font-weight: bold;
		font-size: 32rpx;
	}
	.content-calendar {
		margin-top: 15px;
	}
</style>