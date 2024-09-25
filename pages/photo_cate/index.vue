<template>
  <view class="container">
    <view class="header">
      <text class="title">{{$t('photo_cate.albums_cate')}}</text>
    </view>
    <view class="album-grid">
      <view 
        class="album-item" 
        v-for="(album, index) in albums" 
        :key="index"
        @click="goToAlbum(`/pages/photos/list?cate_id=${album.id}&cover=${album.cover}&cate_name=${album.name}`)"
      >
	   <image style="width: 200px; height: 200px; " :src="album.cover" mode="aspectFill"></image>
        <text class="album-title">{{ album.name }}</text>
      </view>
    </view>
	<!-- 悬浮上传按钮 -->
	<view class="floating-button" @tap="createPhotoCate()">
		<uni-icons type="images" size="50" color="#fff"></uni-icons>
	</view>
  </view>
</template>


<script>
	import { goToPage } from '@/common/utils.js';
	import request from '../../common/request';
	export default {
	  data() {
	    return {
	      albums: [],
	    };
	  },
	  onLoad() {
// this.$i18n.locale = uni.getStorageInfoSync('lang');
	  	this.get_cate()
	  },
	  methods: {
		  createPhotoCate() {
			  uni.showModal({
			  	title:'新建相册',
				editable:true,
				content:'',
				placeholderText:'请输入相册名称',
				success:function(res) {
					request({
						url:'photo/create_photo_cate',
						method:'POST',
						data:{
							cate_name:res.content,
							uid:uni.getStorageSync('user_info').id
						}
					}).then(res1=>{
						if (res1.code == 200) {
							uni.showToast({
								title:res1.msg,
								icon:'success'
							})
						}
					})
				}
			  })
		  },
		  handleClick(url) {
		       goToPage(url);
		     },
			 get_cate() {
				 request({
				 	url:'photo/cate',
				 }).then(res=>{
				 	this.albums = res.data
				 }).catch(err=>{
				 	uni.showToast({
				 		title:'服务异常',
				 		icon:'error'
				 	})
				 })
				
			 },
	    goToAlbum(url) {
			goToPage(url)
	    }
	  }
	};
</script>

<style>
	.container {
	  padding: 20px;
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
	  gap:40px 0px;
	  justify-content: space-between;
	}
	
	.album-item {
	  width: 45%;
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
		height: auto; /* 图片高度自动根据宽度调整 */
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