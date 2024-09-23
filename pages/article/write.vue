<template>
	<div class="container">
		<header class="diary-header">
			<h1 class="title-center">{{$t('article_write.write')}}</h1>
		</header>
		<div class="diary-content">
			<input type="text" class="title-input" :placeholder="$t('article_write.title')" v-model="title" />
			<textarea class="content-textarea" :placeholder="$t('article_write.content')" v-model="content"></textarea>
			<div class="image-upload">
				<uni-section :title="$t('article_write.upload1')" type="line">
					<view class="example-body">
						<uni-file-picker v-model="localImages" fileMediatype="image" mode="grid" @select="select"
							limit="9" :title="$t('article_write.upload')" :image-styles="imageStyles"></uni-file-picker>
					</view>
				</uni-section>
			</div>
		</div>
		<button class="complete-button" @click="submitForm">{{$t('article_write.done')}}</button>
	</div>
</template>

<script>
	import {
		goToPage
	} from '@/common/utils.js';
	import request from '../../common/request';

	export default {
		data() {
			return {
				title: '',
				content: '',
				imageStyles: {
					width: 100,
					height: 100
				},
				localImages: [],
				selectedImages: [],
				type: 2
			};
		},
		onLoad() {
			// this.$i18n.locale = uni.getStorageInfoSync('lang');
		},
		methods: {
			select(e) {
				this.uploadFiles(e.tempFilePaths);
			},
			uploadFiles(filePaths) {
				filePaths.forEach((filePath) => {
					uni.uploadFile({
						url: `${this.siteBaseUrl}upload/file?type=${this.type}`,
						filePath,
						name: 'file',
						success: (uploadFileRes) => {
							const data = JSON.parse(uploadFileRes.data);
							this.selectedImages.push(data.data.url);
						},
						fail: (err) => {
							console.error('上传失败', err);
							uni.showToast({
								title: '上传失败',
								icon: 'error'
							});
						}
					});
				});
			},
			submitForm() {
				const formData = {
					title: this.title,
					content: this.content,
					images: this.selectedImages,
				};

				request({
					url: 'daily_article/save',
					method: 'POST',
					data: formData,
					header: {
						'Content-Type': 'application/json'
					},
				}).then(res => {
					if (res.code === 200) {
						uni.showToast({
							title: '提交成功',
							icon: 'success'
						});
						setTimeout(() => goToPage('/pages/article/list'), 2000);
					}
				}).catch(err => {
					uni.showToast({
						title: '服务异常',
						icon: 'error'
					});
				});
			}
		}
	};
</script>

<style>
	.container {
		max-width: 600px;
		margin: 0 auto;
		padding: 20px;
		border-radius: 15px;
		box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.1);
		font-family: 'Arial', sans-serif;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.diary-header {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: 10px;
	}

	.complete-button {
		position: fixed;
		bottom: 20px;
		right: 20px;
		background-color: #ff6f91;
		color: #fff;
		border: none;
		border-radius: 15px;
		padding: 10px 20px;
		font-size: 18px;
		cursor: pointer;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
		transition: background-color 0.3s, transform 0.3s;
	}

	.complete-button:hover {
		background-color: #ff4f70;
		transform: scale(1.05);
	}

	.title-center {
		flex-grow: 1;
		text-align: center;
	}

	.diary-content {
		background-color: #ffffff;
		border-radius: 15px;
		box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
		margin-bottom: 20px;
		height: auto;
	}

	.content-textarea {
		width: 100%;
		height: 300px;
		border: 1px solid #ddd;
		border-radius: 15px;
		box-shadow: inset 0px 1px 5px rgba(0, 0, 0, 0.05);
		resize: none;
		margin-bottom: 15px;
		font-size: 18px;
		background-color: #fdfdfd;
	}

	.image-upload {
		margin-top: 15px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.example-body {
		padding: 10px;
		padding-top: 0;
	}

	.title-input {
		width: 100%;
		margin-bottom: 10px;
		font-size: 20px;
		border: 1px solid #ccc;
		border-radius: 5px;
		box-sizing: border-box;
		padding: 10px;
		height: auto;
	}
</style>