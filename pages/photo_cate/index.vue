<template>
  <view class="album-list-container">
    <view class="header">
      <text class="title">甜蜜相册</text>
    </view>
    <view class="album-grid" @click="handleClick('/pages/photos/list')">
      <view 
        class="album-item" 
        v-for="(album, index) in albums" 
        :key="index"
        @click="goToAlbum(album.id)"
      >
        <image :src="album.cover" class="album-thumbnail"></image>
        <text class="album-title">{{ album.name }}</text>
      </view>
    </view>
  </view>
</template>


<script>
	import { goToPage } from '@/common/utils.js';
	export default {
	  data() {
	    return {
	      albums: [],
	    };
	  },
	  onLoad() {
	  	this.get_cate()
	  },
	  methods: {
		  handleClick(url) {
		       goToPage(url);
		     },
			 get_cate() {
				uni.request({
					url:this.siteBaseUrl + 'photo/cate',
					success: (res) => {
					   this.albums = res.data.data
					   console.log('11',this.albums)
					}
				}) 
			 },
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
		height: 150px; /* 图片高度自动根据宽度调整 */
		max-height: 200px; /* 限制最大高度 */
		object-fit: cover;
		border-bottom: 2px solid #ff6f91;
		border-radius: 10px;
	}
	
	.album-title {
	  padding: 10px;
	  font-size: 16px;
	  color: #ff6f91;
	  font-weight: bold;
	}

</style>