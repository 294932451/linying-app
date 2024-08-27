<template>
	<view class="container">
		<!-- Header -->
		<Header />

		<!-- Main Section -->
		<view class="main">
			<view class="album">
				<u-album :urls="urls2" multipleSize=200></u-album>
			</view>
		</view>

		<!-- Event List -->
		<view class="event-list">
			<view class="event-item" v-for="(event, index) in events" :key="index">
				<view class="event-icon" :class="event.iconClass"></view>
				<view class="event-info">
					<text class="event-name">{{ event.name }}</text>
					<text class="event-days">{{ event.days !== null ? event.days + ' 天' : '' }}</text>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import Header from '@/components/header/Header.vue';
	export default {
		components: {
			Header
		},
		data() {
			return {
				days: 100, // 计算得出的相爱天数
				startDate: '2019-8-20',
				events: [{
						name: '猪猪boy您的生日还有',
						days: 50,
						iconClass: 'birthday-icon'
					},
					{
						name: '我哈你的生日还有',
						days: 20,
						iconClass: 'birthday-icon'
					},
					{
						name: '我们第一次拥抱',
						days: null,
						iconClass: 'hug-icon'
					},
					{
						name: '我们第一次接吻',
						days: null,
						iconClass: 'kiss-icon'
					},
				],
				urls2: [
					'/static/images/1.jpg',
					'/static/images/2.jpg',
					'/static/images/3.jpg',
					'/static/images/4.jpg',
					'/static/images/5.jpg',
					'/static/images/6.jpg',
					'/static/images/7.jpg',
					'/static/images/8.jpg',
					'/static/images/9.jpg',
				],
			};
		},
		methods: {
			goBack() {
				uni.navigateBack();
			}
		}
	};
</script>

<style scoped>
	.container {
		background: url('/static/images/pink-bg.png') no-repeat center center;
		/* 替换为你的星空背景图 */
		/* 温暖的粉色背景 */
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 70px; /* 增加顶部内边距，确保内容不被头部遮挡 */
	}



	.add-icon {
		width: 20px;
		height: 20px;
		background-image: url('/static/icons/add.png');
		/* 替换为加号图标的路径 */
	}

	.title {
		font-size: 18px;
		color: #333;
	}

	.main {
		width: 90%;
		padding: 20px;
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 10px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	}

	.count-box {
		background-color: #ffd9e6;
		/* 柔和的粉色，用于显示相爱天数的卡片 */
		padding: 30px 20px;
		border-radius: 10px;
		text-align: center;
		margin-bottom: 30px;
	}

	.count-text {
		font-size: 16px;
		color: #ff6699;
	}

	.days {
		font-size: 50px;
		color: #ff3366;
		margin: 10px 0;
	}

	.days-unit {
		font-size: 24px;
	}

	.date {
		font-size: 14px;
		color: #999;
	}

	.event-list {
		margin-top: 20px;
	}

	.event-item {
		display: flex;
		align-items: center;
		background-color: #ffffff;
		padding: 15px;
		margin-bottom: 15px;
		border-radius: 10px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	}

	.event-icon {
		width: 40px;
		height: 40px;
		margin-right: 15px;
		border-radius: 50%;
		background-color: #ffb3c6;
		/* 更深的粉色，用于事件图标 */
	}

	.event-info {
		flex: 1;
	}

	.event-name {
		font-size: 16px;
		color: #333;
	}

	.event-days {
		font-size: 14px;
		color: #999;
	}

	.birthday-icon {
		background-image: url('/static/icons/birthday.png');
		/* 替换为生日图标的路径 */
	}

	.hug-icon {
		background-image: url('/static/icons/hug.png');
		/* 替换为拥抱图标的路径 */
	}

	.kiss-icon {
		background-image: url('/static/icons/kiss.png');
		/* 替换为接吻图标的路径 */
	}

	.album {
		display: flex;
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */
		flex-wrap: wrap;
		margin-bottom: 20px;
		/* 与下方内容间距 */
	}

	.album img {
		border-radius: 10px;
		/* 圆角图片 */
		margin: 5px;
		/* 图片间距 */
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		/* 图片阴影 */
		transition: transform 0.3s ease-in-out;
		/* 鼠标悬停效果 */
	}

	.album img:hover {
		transform: scale(1.05);
		/* 放大效果 */
	}
</style>