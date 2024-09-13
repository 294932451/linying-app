<template>
	<div class="article-list-container">
		<div class="header">
			<h1>甜蜜时刻记录</h1>
			<p>分享我们的爱情故事</p>
		</div>
		<ul class="article-list">
			<li v-for="(article, index) in paginatedArticles" :key="index" class="article-item"
				@click="handleClick('/pages/article/detail?id='+ article.id)">
				<div class="article-content">
					<h2>{{ article.title }}</h2>
					<u--text :lines=1 :text="article.content" color="#fff" size="28"></u--text>
					<span class="article-date">{{ article.created_at }}</span>
				</div>
				<div class="article-icon">
					<i class="icon-heart"></i>
				</div>
			</li>
		</ul>
		<!-- 浮动按钮 -->
		<button class="fab-button" @click="handleClick('/pages/article/write')">
			<uni-icons type="plus" size="80" color="#fff"></uni-icons> <!-- 图标可以用 font-awesome 或者其他图标库 -->
		</button>
		<div class="pagination">
			<button @click="prevPage" :disabled="currentPage === 1">上一页</button>
			<span>{{ currentPage }} / {{ totalPages }}</span>
			<button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
		</div>
		<div class="footer">
			<div class="footer-decoration"></div>
			<p>愿你们的每一天都如今天般甜蜜</p>
		</div>
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
				articles: [],
				currentPage: 1,
				articlesPerPage: 5,
			}
		},
		onLoad() {
			this.getData()
		},
		computed: {
			totalPages() {
				return Math.ceil(this.articles.length / this.articlesPerPage);
			},
			paginatedArticles() {
				const start = (this.currentPage - 1) * this.articlesPerPage;
				return this.articles.slice(start, start + this.articlesPerPage);
			},
		},
		methods: {
			getData() {
				request({
					url:'daily_article/list',
				}).then(res=>{
					this.articles = res.data
				}).catch(err=>{
					uni.showToast({
						title:'服务异常',
						icon:'error'
					})
				})
				
			},
			handleClick(url) {
				goToPage(url);
			},
			nextPage() {
				if (this.currentPage < this.totalPages) {
					this.currentPage++;
				}
			},
			prevPage() {
				if (this.currentPage > 1) {
					this.currentPage--;
				}
			},
		}
	}
</script>

<style>
	.article-list-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
		background: #fff;
		border-radius: 10px;
		box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.1);
		font-family: 'Arial', sans-serif;
		position: relative;
		min-height: 100vh;
		/* 确保页面填满整个视口 */
		display: flex;
		flex-direction: column;
	}

	.header {
		text-align: center;
	}

	.header h1 {
		font-size: 28px;
		color: #ff6f91;
	}

	.header p {
		font-size: 16px;
		color: #666;
	}

	.article-list {
		list-style-type: none;
		padding: 0;
		margin: 20px 0;
		flex-grow: 1;
		/* 使列表部分填充剩余空间 */
	}

	.article-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px 20px;
		margin-bottom: 15px;
		border-radius: 10px;
		background: linear-gradient(135deg, #ff9a9e, #fad0c4);
		box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
		color: #fff;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.article-item:hover {
		transform: scale(1.02);
		box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
	}

	.article-content h2 {
		font-size: 20px;
		margin-bottom: 5px;
		color: #fff;
	}


	.article-date {
		font-size: 12px;
		color: #ffe1e6;
		margin-top: 10px;
	}

	.article-icon i {
		font-size: 18px;
		color: #ff6f91;
	}

	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 20px 0;
		height: 30px;
	}

	.pagination button {
		background-color: #ff6f91;
		color: white;
		border: none;
		padding: 10px 20px;
		border-radius: 5px;
		cursor: pointer;
		margin: 0 10px;
		transition: background-color 0.2s;
	}

	.pagination button:hover {
		background-color: #ff4f70;
	}

	.pagination button:disabled {
		background-color: #ffc2c9;
		cursor: not-allowed;
	}

	.footer {
		text-align: center;
		margin-top: auto;
		/* 使footer始终在页面底部 */
		padding-top: 20px;
	}


	.footer p {
		font-size: 14px;
		color: #666;
	}

	.fab-button {
		position: fixed;
		bottom: 110px;
		right: 20px;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background-color: #ff6f91;
		color: white;
		border: none;
		box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
		font-size: 24px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		transition: background-color 0.3s, transform 0.3s;
	}

	.fab-button:hover {
		background-color: #ff4f70;
		transform: scale(1.1);
	}

	.fab-button:active {
		transform: scale(0.9);
	}
</style>