<template>
	<div class="diary-page-container">
		<header class="diary-header">
			<h1 class="title-center">写日记</h1>
		</header>
		<div class="diary-content">
			<input type="text" class="title-input" placeholder="请输入标题" v-model="title" />

			<textarea class="content-textarea" placeholder="记录详细内容吧，将成为珍贵的回忆喔~" v-model="content"></textarea>

			<div class="image-upload">
			<uni-section title="上传" type="line">
				<view class="example-body">
					<uni-file-picker limit="9" title="点击此处上传" :image-styles="imageStyles"></uni-file-picker>
				</view>
			</uni-section>
			</div>
		</div>
		<button class="complete-button">完成</button>
	</div>
</template>



<script>
	export default {
		data() {
			return {
				title:'',
				content: '',
				imageStyles: {
									width: 100,
									height: 100,
									
								},listStyles: {
					
				},
				selectedImages: [],
								
			};
		},
		methods: {
			 // 处理图片选择事件
			    handleFileSelect(files) {
			      // files 是用户选择的图片文件数组
			      this.selectedImages = files;
			    },
		 // 提交表单
		    submitForm() {
		      // 检查是否选择了图片
		      if (!this.selectedImages.length) {
		        uni.showToast({
		          title: '请上传至少一张图片',
		          icon: 'none'
		        });
		        return;
		      }
		
		      // 构建表单数据
		      const formData = {
		        title: this.title,
		        content: this.content,
		        images: this.selectedImages
		      };
		
		      // 发送请求到后台
		      uni.request({
		        url: 'https://example.com/api/upload', // 替换成你的后台API地址
		        method: 'POST',
		        data: formData,
		        header: {
		          'Content-Type': 'multipart/form-data'
		        },
		        success: (res) => {
		          if (res.statusCode === 200) {
		            uni.showToast({
		              title: '提交成功',
		              icon: 'success'
		            });
		          } else {
		            uni.showToast({
		              title: '提交失败',
		              icon: 'none'
		            });
		          }
		        },
		        fail: (err) => {
		          uni.showToast({
		            title: '请求失败',
		            icon: 'none'
		          });
		        }
		      });
			  }
			
		},
	};
</script>


<style>
	.diary-page-container {
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
		position: relative;
		/* 新增 */
	}

	.diary-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 10px;
	}

	.complete-button {
		position: fixed;
		/* 固定在右下角 */
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

	.title-center {
		flex-grow: 1;
		text-align: center;
		margin-left: -30px;
		/* 确保标题居中对齐 */
	}


	.complete-button:hover {
		background-color: #ff4f70;
		transform: scale(1.05);
	}

	.complete-button {
		background-color: #ff6f91;
	}


	.diary-content {
		padding: 20px;
		background-color: #ffffff;
		border-radius: 15px;
		box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
		margin-bottom: 20px;
		height: 800px
	}

	.diary-date {
		font-size: 20px;
		color: #666;
		margin-bottom: 15px;
	}

	.diary-date span:first-child {
		font-size: 28px;
		font-weight: bold;
		color: #ff6f91;
	}

	.emotion-section {
		display: flex;
		align-items: center;
		margin-bottom: 15px;
	}

	.emotion-icon {
		width: 40px;
		height: 40px;
		margin-right: 10px;
	}

	.emotion-label {
		font-size: 18px;
		color: #ff6f91;
	}

	.content-textarea {
		width: 100%;
		height: 450px;
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



	.image-preview {
		display: flex;
		flex-wrap: wrap;
		margin-top: 15px;
	}

	.image-item {
		position: relative;
		margin-right: 10px;
		margin-bottom: 10px;
	}

	.image-item img {
		width: 80px;
		height: 80px;
		border-radius: 10px;
		object-fit: cover;
		box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
	}

	.image-item button {
		position: absolute;
		top: 5px;
		right: 5px;
		background-color: rgba(255, 0, 0, 0.7);
		color: white;
		border: none;
		border-radius: 50%;
		width: 20px;
		height: 20px;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.image-upload-label:hover {
		background-color: #ffccd1;
	}
	.example-body {
			padding: 10px;
			padding-top: 0;
		}
	
		.custom-image-box {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}
		.title-input {
			width: 100%;
			margin-bottom: 10px;
			font-size: 20px;
			border: 1px solid #ccc;
			border-radius: 5px;
			box-sizing: border-box;
		}
</style>