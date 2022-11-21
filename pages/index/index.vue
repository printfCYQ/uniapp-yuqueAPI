<template>
	<view class="index-content">
		<view class="item" :style="{background:getBackGround(index)}" v-for="(item,index) in reopList" :key="item.id"
			@click="clickItem(item)">
			<view class="item-desc">
				<span class="desc-label">知识库：</span> <span class="desc-info">{{item.name}}</span>
			</view>
			<view class="item-desc">
				<span class="desc-label">简介：</span> <span class="desc-info">{{item.description}}</span>
			</view>
			<view class="item-desc">
				<span class="desc-label">最后更新：</span> <span class="desc-info">{{timeFormat(item.updated_at)}}</span>
			</view>
		</view>
	</view>
</template>

<script>
	import repoApi from '@/api/repo.js'
	import userApi from '@/api/user.js'
	import utils from '@/utils/utils.js'
	export default {
		data() {
			return {
				reopList: [] // 知识库列表
			}
		},
		async onShow() {
			await this.getUserInfo()
			await this.getRepoList()
		},
		methods: {
			async getUserInfo() {
				try {
					const info = await userApi.user()
					console.log(info);
					uni.setStorageSync('userInfo', JSON.stringify(info.data))
				} catch (e) {
					console.log(e);
					uni.showModal({
						title: '出错啦',
						content: e,
					})
				}
			},
			async getRepoList() {
				try {
					const params = {}
					const userInfo = uni.getStorageSync('userInfo')
					const info = JSON.parse(userInfo)
					const list = await repoApi.repos(info.id, params)
					console.log(list);
					this.reopList = list.data.filter(item => item.id !== 24571879)
				} catch (e) {
					console.log(e);
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
			clickItem(item) {
				console.log(item);
				uni.navigateTo({
					url: `/pages/articleList/articleList?id=${item.id}&namespace=${item.namespace}&repoName=${item.name}`
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

	.index-content {
		padding: 10px;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 10px;

		.item {
			background: #fff;
			min-height: 50px;
			border-radius: 6px;
			padding: 6px;

			.item-desc {
				// display: flex;

				.desc-label {
					font-size: 14px;
					color: $uni-color-paragraph;
				}

				.desc-info {
					font-size: 15px;
					color: $uni-color-subtitle;
				}
			}
		}
	}
</style>
