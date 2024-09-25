<template>
	<view class="container">
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
		<view class="floating-button" @click="chooseImages">
			<uni-icons type="upload" size="50" color="#fff"></uni-icons>
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
				type: 3,
				uploadedImages: [],
			};
		},
		onLoad(e) {
			this.cate_name = e.cate_name
			this.cover = e.cover
			this.cate_id = e.cate_id
			this.getPhotos()
		},
		methods: {
			previewImage(currentUrl, photos) {
				uni.previewImage({
					current: currentUrl, // 当前预览的图片
					urls: photos.map(photo => photo.url) // 图片数组
				})
			},
			getPhotos() {
				request({
					url: 'photo/list/' + this.cate_id,
				}).then(res => {
					this.total = res.data.count
					this.photoGroups = res.data
				}).catch(err => {
					uni.showToast({
						title: '服务异常',
						icon: 'error'
					})
				})
			},
			chooseImages() {
				uni.chooseImage({
					count: 9, // 允许用户一次选择多张图片，最多5张
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						this.uploadImages(tempFilePaths); // 调用上传函数上传所有图片
					},
					fail: (err) => {
						console.error('Failed to choose images:', err);
					},
				});
			},
			uploadImages(filePaths) {
				const promises = filePaths.map((filePath) => {
					return new Promise((resolve, reject) => {
						uni.uploadFile({
							url: `${this.siteBaseUrl}upload/file?type=${this.type}`,
							filePath: filePath,
							name: 'file',
							success: (uploadFileRes) => {
								const data = JSON.parse(uploadFileRes.data);
								if (data.code==200) {
									this.uploadedImages.push(data.data.url); // 保存上传成功的图片 URL
									resolve();
								} else {
									uni.showToast({
										title: '上传失败',
										icon: 'none',
									});
									reject(new Error('上传失败'));
								}
							},
							fail: (err) => {
								console.error('Failed to upload image:', err);
								uni.showToast({
									title: '上传失败',
									icon: 'none',
								});
								reject(err);
							},
						});
					});
				});

				// 等待所有图片上传完成后执行
				Promise.all(promises)
					.then(() => {
						this.savePhotos(); // 所有图片上传成功后调用保存方法
					})
					.catch((err) => {
						console.error('Error uploading images:', err);
					});
			},
			savePhotos() {
				// 提交保存图片的接口
				request({
						url: 'photo/save_photos',
						method: 'POST',
						data: {
							cate_id: this.cate_id, // 当前的分类 ID
							uid: uni.getStorageSync('user_info').id, // 用户 ID
							photos: this.uploadedImages, // 上传成功的图片 URL 列表
						},
					}).then((res) => {
						if (res.code == 200) {
							uni.showToast({
								title: '保存成功',
								icon: 'success',
							});
							this.getPhotos(); // 重新获取图片列表
						} else {
							uni.showToast({
								title: '保存失败',
								icon: 'none',
							});
						}
					})
					.catch((err) => {
						console.log(err);
						uni.showToast({
							title: '服务异常',
							icon: 'error',
						});
					});
			},
		},
	};
</script>

<style scoped>

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
		gap: 20px;
	}

	.photo-item {
		width: 45%;
		aspect-ratio: 1;
		overflow: hidden;
		border-radius: 10px;
		background-color: #e0e0e0;
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

</style>