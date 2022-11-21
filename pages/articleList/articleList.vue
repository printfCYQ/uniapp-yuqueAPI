<template>
	<view class="article-list">
		<view class="list-item" :style="{background:getBackGround(index)}" v-for="(item,index) in docList"
			:key="item.id" @click="clickItem(item.id)">
			<view v-if="item.cover" class="item-cover">
				<image :src="item.cover" mode=""></image>
			</view>
			<view class="item-info">
				<view class="item-info-title">
					{{item.title}}
				</view>
				<view style="margin-top: 10px;">
					<span style="font-size: 14px;color: azure;"> 最后更新：</span> <span style="font-size: 12px;color: azure;">{{timeFormat(item.updated_at)}}</span>
				</view>
				<view style="margin-top: 5px;">
					<span style="font-size: 14px;color: azure;">字数：</span> <span style="font-size: 12px;color: azure;"> {{item.word_count}}</span>
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
				id: '',
				namespace: '',
				docList: [],
				offset: 0,
				limit: 10,
				pageNum: 1
			}
		},
		async onReachBottom(e) {
			console.log(e);
			this.pageNum++
			this.offset = (this.pageNum - 1) * 10
			await this.getDocList()
		},
		async onLoad(opt) {
			console.log(opt);
			this.id = opt.id // 知识库id
			this.namespace = opt.namespace // 知识库编码
			uni.setNavigationBarTitle({
				title: opt.repoName // 知识库名称
			})
			await this.getDocList()
		},
		methods: {
			async getDocList() {
				try {
					const params = {
						offset: this.offset,
						limit: this.limit,
					}
					uni.showLoading({
						title: 'loading...'
					})
					const list = await docApi.docs(this.id, params)
					console.log(list);
					if (list.data.length === 0) {
						this.offset--
						uni.showToast({
							title: '没有更多了',
							icon: 'none'
						})
					} else {
						this.docList = [...this.docList, ...list.data]
					}
					uni.hideLoading()
				} catch (e) {
					console.log(e);
					//TODO handle the exception
				}
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
			clickItem(id) {
				uni.navigateTo({
					url: `/pages/articleDetail/articleDetail?docId=${id}&namespaceId=${this.id}&namespace=${this.namespace}`
				})
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

	.article-list {
		width: 95%;
		margin: 0 auto;

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
</style>
