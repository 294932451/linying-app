<template>
	<view class="album-detail-container">
		<!-- 顶部大图和标题 -->
		<view class="header">
			<image style="width: 100%; height: 300px; " :src="cover" mode="aspectFill"></image>
			<!-- <image class="header-image" :src="cover"></image> -->
			<view class="header-content">
				<text class="album-title">{{cate_name}}</text>
				<text class="photo-count">{{total}}张</text>
			</view>
		</view>

		<!-- 照片列表按日期分组 -->
		<view class="photo-group" v-for="(group, index) in photoGroups" :key="index">
			<text class="photo-date">{{ group.created_at }}</text>
			<view class="photo-grid">
				<view class="photo-item" v-for="(photo, index) in group.photos" :key="index">
					<image style="width: 100%; height: 300px; " :src="photo.url" mode="aspectFill"
						@tap="previewImage(photo.url,group.photos)"></image>
				</view>
			</view>
		</view>

		<!-- 悬浮上传按钮 -->
		<view class="floating-button" @click="chooseImage">
			<image src="/static/images/add-icon.png" class="floating-icon"></image>
		</view>
	</view>
</template>

<script>
	import request from '../../common/request';
	export default {
		data() {
			return {
				cate_id: '',
				cover: '',
				cate_name: '',
				total: 0,
				photoGroups: [],
			};
		},
		onLoad(e) {
			this.cate_name = e.cate_name
			this.cover = e.cover
			this.cate_id = e.cate_id
			this.getPhotos()
		},
		methods: {
			previewImage(currentUrl,photos) {
				uni.previewImage({
					current: currentUrl, // 当前预览的图片
					urls: photos.map(photo=>photo.url) // 图片数组
				})
			},
			getPhotos() {
				request({
					url: 'photo/list/' + this.cate_id,
				}).then(res=>{
					this.total = res.data.count
					this.photoGroups = res.data
				}).catch(err=>{
					uni.showToast({
						title:'服务异常',
						icon:'error'
					})
				})
			},
			chooseImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						const tempFilePath = res.tempFilePaths[0];
						this.uploadImage(tempFilePath);
					},
					fail: (err) => {
						console.error('Failed to choose image:', err);
					},
				});
			},
			uploadImage(filePath) {
				uni.uploadFile({
					url: 'https://your-upload-api-url.com/upload', // 上传的API接口
					filePath: filePath,
					name: 'file',
					success: (uploadFileRes) => {
						const data = JSON.parse(uploadFileRes.data);
						if (data.success) {
							this.addPhotoToList(data.url);
							uni.showToast({
								title: '上传成功',
								icon: 'success',
							});
						} else {
							uni.showToast({
								title: '上传失败',
								icon: 'none',
							});
						}
					},
					fail: (err) => {
						console.error('Failed to upload image:', err);
						uni.showToast({
							title: '上传失败',
							icon: 'none',
						});
					},
				});
			},
			addPhotoToList(url) {
				// 你可以在这里将上传成功的照片添加到相册列表中
				this.photoGroups[0].photos.push({
					url: url
				});
			},
		},
	};
</script>

<style scoped>
	.album-detail-container {
		background-color: #f5f5f5;
	}

	.header {
		position: relative;
	}

	.header-image {
		width: 100%;
		height: 200px;
		object-fit: cover;
	}

	.header-content {
		position: absolute;
		bottom: 20px;
		left: 20px;
		color: white;
	}

	.album-title {
		font-size: 24px;
		font-weight: bold;
		margin-right: 10px;
	}

	.photo-count {
		font-size: 16px;
		margin-top: 5px;
	}

	.photo-group {
		padding: 10px 20px;
	}

	.photo-date {
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 10px;
	}

	.photo-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.photo-item {
		width: 48%;
		aspect-ratio: 1;
		overflow: hidden;
		border-radius: 10px;
		background-color: #e0e0e0;
	}

	.photo-thumbnail {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.floating-button {
		position: fixed;
		bottom: 30px;
		right: 20px;
		width: 60px;
		height: 60px;
		background-color: #ff4081;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}

	.floating-icon {
		width: 30px;
		height: 30px;
	}
</style>