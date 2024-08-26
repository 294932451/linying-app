<template>
	 <!-- 头部导航条 -->
	  <view class="header-wrap">
	    <view class="header">
	      <view class="logo">
	        <h1><a class="alogo" href="#">关于我们</a></h1>
	      </view>
	      <view class="word">
	        <span class="wenan">喜欢这个世界，更喜欢你</span>
	      </view>
	    </view>
	  </view>
</template>

<script>
	export default {
	  name: 'Header'
	}
</script>

<style>
	/* 头部css */
	.header-wrap {
		width: 100%;
		height: 4.5rem;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		backdrop-filter: blur(15px);
		-webkit-backdrop-filter: blur(15px);
		background: #ffffff1f;
		color: #707070;
	}
	
	.header-wrap .header {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
		flex-wrap: nowrap;
	}
	
	.header-wrap .header .logo h1 {
		font-size: 1.5rem;
		font-family: 'Noto Serif SC', serif;
		font-weight: 700;
	}
	
	.header-wrap .header .word {
		font-family: 'Noto Serif SC', serif;
		font-weight: 400;
		font-size: 1.1rem;
		width: 60%;
		text-align: right;
	}
</style>