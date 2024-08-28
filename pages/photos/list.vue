<template>
  <view class="album-list-container">
    <view class="header">
      <text class="title">甜蜜相册</text>
    </view>
    <view class="album-grid">
      <view 
        class="album-item" 
        v-for="(album, index) in albums" 
        :key="index"
        @click="goToAlbum(album.id)"
      >
        <image :src="album.thumbnail" class="album-thumbnail"></image>
        <text class="album-title">{{ album.title }}</text>
      </view>
    </view>
  </view>
</template>


<script>
	export default {
	  data() {
	    return {
	      albums: [
	        { id: 1, title: '我们的初遇', thumbnail: '/static/images/album1.png' },
	        { id: 2, title: '第一次约会', thumbnail: '/static/images/album2.png' },
	        { id: 3, title: '旅行记忆', thumbnail: '/static/images/album3.png' },
	        { id: 4, title: '浪漫晚餐', thumbnail: '/static/images/album4.png' },
	        // 更多相册数据...
	      ],
	    };
	  },
	  methods: {
	    goToAlbum(albumId) {
	      uni.navigateTo({
	        url: `/pages/albumDetail/albumDetail?id=${albumId}`
	      });
	    }
	  }
	};
</script>

<style>
	.album-list-container {
	  padding: 20px;
	  background: linear-gradient(135deg, #ff9a9e, #fad0c4);
	  min-height: 100vh;
	}
	
	.header {
	  text-align: center;
	  margin-bottom: 20px;
	}
	
	.title {
	  font-size: 24px;
	  color: #fff;
	  font-weight: bold;
	}
	
	.album-grid {
	  display: flex;
	  flex-wrap: wrap;
	  gap: 15px;
	  justify-content: space-between;
	}
	
	.album-item {
	  width: 48%;
	  background-color: #fff;
	  border-radius: 15px;
	  overflow: hidden;
	  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
	  transition: transform 0.2s;
	  text-align: center;
	}
	
	.album-item:hover {
	  transform: scale(1.05);
	}
	
	.album-thumbnail {
	  width: 100%;
	  height: 100px;
	  object-fit: cover;
	  border-bottom: 2px solid #ff6f91;
	}
	
	.album-title {
	  padding: 10px;
	  font-size: 16px;
	  color: #ff6f91;
	  font-weight: bold;
	}

</style>