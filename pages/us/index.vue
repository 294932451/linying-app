<template>
	<view class="container">
		<!-- Header -->
		<Header />

		<!-- Main Section -->
		<view class="main">
			<view class="album">
				<u-album :urls="images" multipleSize=200></u-album>
			</view>
		</view>

		<!-- Event List -->
		<view class="event-list">
			<view class="event-row">
				<view class="event-item" v-for="(event, index) in events.slice(0, 2)" :key="index">
					<view class="event-icon">
						<image :src="event.iconClass" mode=""></image>
					</view>
					<view class="event-info">
						<text class="event-name">{{ event.name }}</text>
						<text class="event-days">{{ event.days !== null ? event.days + ' 天' : '' }}</text>
					</view>
				</view>
			</view>
			<!-- 其他 event-item 仍然按列排列 -->
			<view class="event-item" v-for="(event, index) in events.slice(2)" :key="index + 2">
				<view class="event-icon">
					<image :src="event.iconClass" mode=""></image>
				</view>
				<view class="event-info">
					<text class="event-name">{{ event.name }}</text>
					<text class="event-days">{{ event.days}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/header/Header.vue';
	import request from '../../common/request';
	export default {
		components: {
			Header
		},
		data() {
			return {
				events: [],
				images: [],
			};
		},
		onLoad() {
			this.getIndex()
			this.getImages()
		},
		methods: {
			//获取下面列表
			getIndex() {
				request({
					url: 'my/index',
				}).then(res=>{
					console.log('res++++',res);
					this.events = res.data
				}).catch(err=>{
					uni.showToast({
						title:'服务异常',
						icon:'error'
					})
				})
			},
			//获取轮播图
			getImages() {
				request({
					url: 'my/images',
				}).then(res=>{
					this.images = res.data
				}).catch(err=>{
					uni.showToast({
						title:'服务异常',
						icon:'error'
					})
				})
			},
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
		padding-top: 70px;
		/* 增加顶部内边距，确保内容不被头部遮挡 */
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
	
	.event-row {
		display: flex;
		justify-content: space-between; /* 让两个事件在一排内左右分布 */
		margin-bottom: 15px;
	}

	.event-item {
		display: flex;
		align-items: center;
		background-color: #ffffff;
		padding: 15px;
		margin-bottom: 15px;
		border-radius: 10px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
			flex: 1; /* 使事件项在一排内平分空间 */
			margin-right: 10px; /* 添加间距 */
	}
	
	.event-item:last-child {
		margin-right: 0; /* 取消最后一个元素的右边距 */
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
		 font-size: 18px;
		    color: #FFB347; /* 柔和的金色 */
		    font-weight: bold;
		    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3); /* 轻微阴影 */
		    background-color: rgba(255, 255, 255, 0.8); /* 半透明白色背景 */
		    border-radius: 8px; /* 圆角背景 */
			margin-left: 10px;
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

	.event-icon image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		/* 图片按比例缩放并填充图标区域 */
		border-radius: 50%;
		/* 圆形图标 */
	}
</style>