<template>
	<view class="search-page">
		<view class="search-bar">
			<input class="input" type="text" v-model="keyword">
			<view class="search-btn" @click="search">搜索</view>
		</view>
		<view class="article-list">
			<view class="list-item" :style="{background:getBackGround(index)}" v-for="(item,index) in docList"
				:key="item.id" @click="clickItem(item)">
				<view v-if="item.target.cover" class="item-cover">
					<image :src="item.target.cover" mode=""></image>
				</view>
				<view class="item-info">
					<view class="item-info-title">
						{{item.title}}
					</view>
					<view style="margin-top: 10px;">
						<span style="font-size: 14px;color: azure;"> 最后更新：</span> <span
							style="font-size: 12px;color: azure;"
							v-if="item.target">{{timeFormat(item.target.updated_at)}}</span>
					</view>
					<view style="margin-top: 5px;">
						<span style="font-size: 14px;color: azure;">字数：</span> <span
							style="font-size: 12px;color: azure;"> {{item.target.word_count}}</span>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import docApi from '@/api/doc.js'
	import utils from '@/utils/utils.js'
	export default {
		data() {
			return {
				keyword: 'vue',
				offset: 1,
				docList: []
			}
		},
		async onReachBottom(e) {
			console.log(e);
			this.offset++
			await this.getList()
		},
		async onLoad() {
			await this.getList()
		},
		methods: {
			async search() {
				this.offset = 1
				this.docList = []
				await this.getList()
			},
			async getList() {
				try {
					const params = {
						q: this.keyword,
						type: 'doc',
						scope: 'caiyongqing',
						offset: this.offset
					}
					const list = await docApi.search(params)
					console.log(list.data);
					if (list.data.length === 0) {
						this.offset--
						uni.showToast({
							title: '没有更多了',
							icon: 'none'
						})
					} else {
						this.docList = [...this.docList, ...list.data]
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			clickItem(item) {
				uni.navigateTo({
					url: `/pages/articleDetail/articleDetail?docId=${item.id}&namespaceId=${item.target.book.id}&namespace=${item.target.book.namespace}`
				})
			},
			getBackGround(val) {
				let index = val % 10
				let color = [
					'linear-gradient(to right, #d1913c, #ffd194)',
					'linear-gradient(to right, #2193b0, #6dd5ed)',
					'linear-gradient(to right, #cb356b, #bd3f32)',
					'linear-gradient(to right, #ee9ca7, #ffdde1)',
					'linear-gradient(to right, #00c6ff, #0072ff)',
					'linear-gradient(to right, #acb6e5, #86fde8)',
					'linear-gradient(to right, #9796f0, #fbc7d4)',
					'linear-gradient(to right, #cc95c0, #dbd4b4, #7aa1d2)',
					'linear-gradient(to right, #3d7eaa, #ffe47a)',
					'linear-gradient(to right, #c9ffbf, #ffafbd)'
				]
				return color[index]
			},
			timeFormat(val) {
				return utils.timeFormat(val)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $uni-bg-color-grey;
	}

	.search-page {
		width: 100%;

		.search-bar {
			display: flex;
			height: 35px;
			width: 100%;
			position: fixed;
			padding: 10px;
			top: 0;
			background: $uni-bg-color-grey;

			.input {
				// border: 1px salmon solid;
				background: #fff;
				width: calc(100% - 90px);
				height: 35px;
			}

			.search-btn {
				width: 60px;
				height: 35px;
				line-height: 35px;
				text-align: center;
				background: #fff;
				margin-left: 10px;
				font-size: 14px;
				cursor: pointer;
			}
		}

		.article-list {
			width: 95%;
			margin: 0 auto;
			margin-top: 60px;

			.list-item {
				margin-top: 20px;
				background: #fff;
				border-radius: 6px;
				min-height: 80px;
				padding: 8px;
				display: flex;

				.item-cover {
					width: 80px;
					height: 80px;
					margin-right: 10px;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.item-info {

					.item-info-title {
						font-size: 15px;
					}
				}
			}
		}

	}
</style>
