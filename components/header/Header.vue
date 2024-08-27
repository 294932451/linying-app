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

<style scoped>
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
	background-color: rgba(0, 0, 0, 0.1); /* 使用半透明白色背景 */
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加轻微的阴影 */
	border-bottom: 1px solid rgba(255, 255, 255, 0.3); /* 增加底部边框 */
	color: #333; /* 提升文字颜色的对比度 */
}

.header-wrap .header {
	width: 100%;
	max-width: 1200px; /* 设置最大宽度，使其在大屏幕上居中 */
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: space-between; /* 修改为左右对齐 */
	padding: 0 1rem; /* 增加左右内边距 */
}

.header-wrap .header .logo h1 {
	font-size: 1.75rem; /* 增大字体 */
	font-family: 'Noto Serif SC', serif;
	font-weight: 700;
	margin: 0; /* 去掉默认的 h1 上下外边距 */
	color: #333; /* 保证标题的清晰度 */
}

.header-wrap .header .logo h1 .alogo {
	text-decoration: none; /* 移除下划线 */
	color: inherit; /* 继承父级颜色 */
}

.header-wrap .header .word {
	font-family: 'Noto Serif SC', serif;
	font-weight: 400;
	font-size: 1.2rem; /* 稍微增大字体 */
	text-align: right;
	color: #666; /* 使标语颜色稍淡，与标题形成对比 */
}

.header-wrap .header .word .wenan {
	display: inline-block;
	background: linear-gradient(90deg, #f39c12, #f1c40f); /* 添加渐变背景 */
	-webkit-background-clip: text;
	color: transparent; /* 使用渐变颜色作为文本颜色 */
	padding: 0.2rem 0.5rem;
	border-radius: 5px; /* 使背景的角变圆 */
}
</style>
