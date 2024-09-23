<template>
	<view class="container">
		<uni-card class="fortune-card" :title="xingzuo.name + ' 今日运势'">
			<view class="fortune-content">
				<view class="fortune-item">
					<text class="label">综合指数：</text>
					<text>{{xingzuo.all}}</text>
				</view>
				<view class="fortune-item">
					<text class="label">幸运色：</text>
					<text>{{xingzuo.color}}</text>
				</view>
				<view class="fortune-item">
					<text class="label">健康指数：</text>
					<text>{{xingzuo.health}}</text>
				</view>
				<view class="fortune-item">
					<text class="label">爱情指数：</text>
					<text>{{xingzuo.love}}</text>
				</view>
				<view class="fortune-item">
					<text class="label">财运指数：</text>
					<text>{{xingzuo.money}}</text>
				</view>
				<view class="fortune-item">
					<text class="label">工作指数：</text>
					<text>{{xingzuo.work}}</text>
				</view>
				<view class="fortune-item">
					<text class="label">幸运数字：</text>
					<text>{{xingzuo.number}}</text>
				</view>
				<view class="fortune-item">
					<text class="label">速配星座：</text>
					<text>{{xingzuo.QFriend}}</text>
				</view>
				<view class="fortune-item summary-item">
					<text class="label">今日概述：</text>
					<text class="summary">{{xingzuo.summary}}</text>
				</view>
			</view>
		</uni-card>
	</view>
</template>



<script>
	import request from '../../common/request';
	export default {

		data() {
			return {
				xingzuo: []
			}
		},
		onLoad() {
			this.get_data()
		},
		methods: {
			get_data() {
				request({
					url: 'index',
				}).then(res => {
					this.xingzuo = res.data.xingzuo_details
				}).catch(err => {
					uni.showToast({
						title: '服务异常',
						icon: 'error'
					})
				})
			}
		}
	}
</script>
<style>
	.container {
		padding: 20px;
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f0f0f5;
		/* 增加一个浅色背景 */
	}

	.fortune-card {
		background-color: #fff;
		padding: 20px;
		border-radius: 12px;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
		/* 加深阴影 */
		width: 90%;
		max-width: 600px;
	}

	.fortune-content {
		margin-top: 10px;
	}

	.fortune-item {
		margin-bottom: 10px;
	}

	.label {
		font-weight: bold;
		color: #333;
		font-size: 16px;
	}

	text {
		display: inline-block;
		color: #555;
		font-size: 16px;
		line-height: 1.8;
		/* 增加行高 */
	}

	.summary-item .summary {
		text-align: justify;
		line-height: 1.8;
		font-size: 15px;
		color: #666;
	}
</style>