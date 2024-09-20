<template>
	<view class="container">
		<!-- 头部导航条 -->
		<Header />
		<!-- 添加音频播放器 -->
		<view class="floating-audio-btn" @tap="playAudio">
			<text>{{ isPlaying  ? $t('index.pause') : $t('index.play') }}</text>
		</view>
		<!-- 添加音频播放器 -->
		<view class="logout-btn" @tap="logout()">
			<text>{{$t('index.logout')}}</text>
		</view>
		<view class="content-wrap">
			<view class="bg-wrap">
				<u-swiper :list="banner" height="200px"></u-swiper>
			</view>
		
			<view class="content-text">
				<uni-title type="h2" :title="$t('index.together')" align="center" style="color: #fff;"></uni-title>
			</view>
			<view class="content-time">
				<p class="time-text">{{ days }} {{$t('index.days')}} {{ hours }} {{$t('index.hours')}} {{ minutes }}
					{{$t('index.minutes')}} {{ seconds }} {{$t('index.seconds')}}</p>
			</view>
		</view>
		<u-divider text=""></u-divider>
		<view class="content-notice">
			<u-notice-bar :text="xingzuo_notice" class="notice-bar" :speed="30" :fontSize="30"></u-notice-bar>
		</view>
		<view class="content-calendar">
			<!-- 插入模式 -->
			<uni-calendar lunar class="uni-calendar--hook" :selected="info.selected" :showMonth="true" @change="change"
				@monthSwitch="monthSwitch" />
		</view>

		<view class="content-card">
			<view class="card" @click="handleClick('/pages/article/list')">
				<uni-card :is-shadow="false" is-full>
					<text class="uni-h6">{{$t('index.suisuinian')}}</text>
				</uni-card>
			</view>
			<view class="card" @click="handleClick('/pages/photo_cate/index')">
				<uni-card :is-shadow="false" is-full>
					<text class="uni-h6">{{$t('index.old_photos')}}</text>
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
			<!-- 使用 uni-transition 实现视频页面弹出效果 -->
			<uni-transition :show="showVideoPage" mode="fade" :duration="300">
				<view class="video-popup" :style="{ zIndex: showVideoPage ? 999 : -1 }">
					<button class="close-btn" @click="closeVideo">关闭</button>
					<video id="myVideo" src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/wap2appvsnative.mp4">
					</video>
				</view>
			</uni-transition>

		</view>



	</view>
</template>
<script>
	import Header from '@/components/header/Header.vue';
	import {
		goToPage
	} from '@/common/utils.js';
	import request from '../../common/request';

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
				audioContext: null, // 音频上下文
				isPlaying: false, // 音频是否在播放
				banner: [],
				xingzuo_notice: '',
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
				showVideoPage: false, // 控制视频页面显示/隐藏
				videoSrc: 'https://linying01.oss-cn-beijing.aliyuncs.com/%E6%9C%89%E6%88%91%E5%91%A2.wav' // 视频链接
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
			// this.$i18n.locale = uni.getStorageInfoSync('lang');
			// 初始化音频上下文
			this.audioContext = uni.createInnerAudioContext();
			this.audioContext.src = this.videoSrc; // 替换成你的音频文件地址
			this.audioContext.autoplay = false; // 设置为 false，用户手动控制
			this.getBanner()
			this.getIndex()


		},
		onReady() {
			this.$nextTick(() => {
				this.showCalendar = true
			})
		},
		mounted() {
			this.updateTimer();
			this.timer = setInterval(this.updateTimer, 1000);
		},
		beforeDestroy() {
			clearInterval(this.timer);
		},
		methods: {
			logout() {
			try {
				uni.clearStorageSync();
				uni.redirectTo({
					url:'/pages/login/login'
				})
			} catch (e) {
				// error
				uni.showToast({
					title:'失败',
					icon:'error'
				})
			}
			},
			// 控制音频播放和暂停
			playAudio() {
				if (this.isPlaying) {
					this.audioContext.pause(); // 暂停音频
				} else {
					this.audioContext.play(); // 播放音频
				}
				this.isPlaying = !this.isPlaying; // 切换播放状态
			},
			getIndex() {
				request({
					url: 'index',
				}).then(res => {
					this.xingzuo_notice = res.data.xing_zuo
					this.info.selected = res.data.rili
				}).catch(err => {
					uni.showToast({
						title: '服务异常',
						icon: 'error'
					})
				})
			},
			//获取轮播图
			getBanner() {
				request({
					url: 'banner',
				}).then(res => {
					this.banner = res.data
				}).catch(err => {
					uni.showToast({
						title: '服务异常',
						icon: 'error'
					})
				})
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
				if (Object.keys(e.extraInfo).length) {
					this.showVideoPage = true; // 点击日期后显示视频页面
				}
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
			closeVideo() {
				this.showVideoPage = false; // 关闭视频页面
			}
		},
		onUnload() {
			// 页面销毁时释放音频资源
			if (this.audioContext) {
				this.audioContext.destroy();
			}
		}
	}
</script>

<style scoped>
	/* 悬浮按钮样式 */
	.floating-audio-btn {
		position: fixed;
		/* 固定定位 */
		top: 280px;
		/* 距离页面底部20px */
		right: 10px;
		/* 距离页面右侧20px */
		width: 60px;
		/* 按钮宽度 */
		height: 60px;
		/* 按钮高度 */
		/* background-color: #007aff; */
		/* 按钮背景颜色 */
		color: rgba(0, 0, 0, 0.5);
		/* 字体颜色 */
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		/* 圆形按钮 */
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
		/* 阴影效果 */
		z-index: 1;
		/* 确保在页面内容的上层 */
		font-size: 18px;
	}
	/* 悬浮按钮样式 */
	.logout-btn {
		position: fixed;
		/* 固定定位 */
		top: 280px;
		/* 距离页面底部20px */
		/* 距离页面右侧20px */
		width: 60px;
		/* 按钮宽度 */
		height: 60px;
		color: #ffffff;
		/* 字体颜色 */
		display: flex;
		align-items: center;
		justify-content: center;
		/* 圆形按钮 */
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		/* 阴影效果 */
		z-index: 1;
		/* 确保在页面内容的上层 */
		font-size: 18px;
	}

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
		text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
		/* 发光效果 */
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
		text-shadow: 0 0 3px rgba(255, 255, 255, 0.3);
		/* 轻微发光效果 */
	}

	.uni-h6 {
		font-size: 18px;
		font-weight: 500;
		color: #fff;
	}

	/* 通用样式 */
	.container {
		padding: 20px 0;
		background: url('/static/images/pink-bg.png') no-repeat center center;
		/* 替换为你的星空背景图 */
		background-size: cover;
		min-height: 100vh;
		color: #fff;
		padding-top: 70px;
		/* 增加顶部内边距，确保内容不被头部遮挡 */
	}

	/* 视频弹窗的样式 */
	.video-popup {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 90%;
		height: 60%;
		background-color: rgba(255, 255, 255, 0.9);
		/* 半透明白色背景 */
		border-radius: 15px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 1;
		/* 调高 z-index 以确保在所有内容上方显示 */
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
		/* background-image: url('/static/images/video-bg.png'); */
		/* 替换为适合的视频背景图片 */
		background-size: cover;
		background-position: center;
	}

	/* 视频播放器 */
	.video-player {
		width: 100%;
		height: 100%;
		border-radius: 10px;
	}

	/* 关闭按钮样式 */
	.close-btn {
		position: absolute;
		top: 10px;
		right: 10px;
		background-color: rgba(255, 0, 0, 0.7);
		color: white;
		border: none;
		border-radius: 50%;
		padding: 10px;
		cursor: pointer;
		/* 确保按钮显示在视频内容上方 */
	}

	.close-btn:hover {
		background-color: rgba(255, 0, 0, 0.9);
	}
</style>