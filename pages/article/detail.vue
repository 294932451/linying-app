<template>
	<div class="diary-view-container">
		<header class="diary-header">
			<h1 class="title-center">查看日记</h1>
		</header>
		<div class="diary-content">
			<div class="diary-section">
				<div class="diary-label">标题</div>
				<div class="diary-title">{{ title }}</div>
			</div>

			<div class="diary-section">
				<div class="diary-label">内容</div>
				<div class="diary-text">{{ content }}</div>
			</div>
			<div class="diary-section">
				<div class="diary-label">时间</div>
				<div class="diary-text">{{ date_time }}</div>
			</div>

			<div class="diary-section image-view">
				<div class="diary-label">上传的图片</div>
				<div class="image-preview">
					<div v-for="(image, index) in selectedImages" :key="index" class="image-item">
						<image style="width: 200px; height: 200px; background-color: #eeeeee;" :src="image"
							@tap="previewImage(index, selectedImages)" mode="aspectFill"></image>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import request from '../../common/request';
	export default {
		data() {
			return {
				title: '',
				content: '',
				selectedImages: [],
				date_time: '',
			};
		},
		onLoad(e) {
			this.getData(e)
		},
		methods: {
			previewImage(index, images) {
				uni.previewImage({
					current: images[index], // 当前显示的图片的 URL
					urls: images // 图片 URL 数组
				});
			},
			getData(e) {
				request({
					url: 'daily_article/detail/' + e.id,
				}).then(res => {
					this.title = res.data.title
					this.content = res.data.content
					this.date_time = res.data.created_at
					this.selectedImages = res.data.images
				}).catch(err => {
					uni.showToast({
						title: '服务异常',
						icon: 'error'
					})
				})
			}
		},
	};
</script>

<style scoped>
	.diary-view-container {
		max-width: 600px;
		margin: 0 auto;
		padding: 20px;
		background: #f9f9fc;
		border-radius: 15px;
		box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.1);
		font-family: 'Arial', sans-serif;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.diary-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 10px;
	}

	.title-center {
		flex-grow: 1;
		text-align: center;
		font-size: 24px;
		margin-bottom: 20px;
	}

	.diary-content {
		padding: 20px;
		background-color: #ffffff;
		border-radius: 15px;
		box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
		margin-bottom: 20px;
	}

	.diary-section {
		margin-bottom: 20px;
	}

	.diary-label {
		font-size: 18px;
		font-weight: bold;
		color: #ff6f91;
		margin-bottom: 10px;
	}

	.diary-title {
		font-size: 22px;
		color: #333;
		margin-bottom: 10px;
	}

	.diary-text {
		font-size: 18px;
		color: #666;
		line-height: 1.6;
	}

	.image-preview {
		display: flex;
		flex-wrap: wrap;
	}

	.image-item {
		width: 100px;
		height: 100px;
		margin-right: 10px;
		margin-bottom: 10px;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
	}

	.image-item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>