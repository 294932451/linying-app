<template>
  <view class="album-detail-container">
    <!-- 顶部大图和标题 -->
    <view class="header">
      <image class="header-image" src="/static/images/header.jpg"></image>
      <view class="header-content">
        <text class="album-title">关于tc 🐶</text>
        <text class="photo-count">34张</text>
      </view>
    </view>

    <!-- 照片列表按日期分组 -->
    <view class="photo-group" v-for="(group, index) in photoGroups" :key="index">
      <text class="photo-date">{{ group.date }}</text>
      <view class="photo-grid">
        <view class="photo-item" v-for="(photo, index) in group.photos" :key="index">
          <image :src="photo.url" class="photo-thumbnail"></image>
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
export default {
  data() {
    return {
      photoGroups: [
        {
          date: '23 08月, 2024',
          photos: [
            { url: '/static/images/photo1.jpg' },
            { url: '/static/images/photo2.jpg' },
          ],
        },
        {
          date: '15 08月, 2024',
          photos: [
            { url: '/static/images/photo3.jpg' },
            { url: '/static/images/photo4.jpg' },
          ],
        },
        {
          date: '11 08月, 2024',
          photos: [
            { url: '/static/images/photo5.jpg' },
            { url: '/static/images/photo6.jpg' },
          ],
        },
      ],
    };
  },
  methods: {
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
      this.photoGroups[0].photos.push({ url: url });
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
