<template>
	<view class="about-page">
		<view class="avatar-content">
			<image class="avatar" :src="info.avatar_url" mode=""></image>
		</view>
		<view class="url-content">
			<view class="url-item" v-for="(item,index) in dataList" :key="item" @click="clickItem(item)">
				{{item.name}}
			</view>
		</view>
		<view class="footer-content">
			语雀API+uniapp
		</view>
	</view>
</template>

<script>
	import userApi from '@/api/user.js'
	export default {
		data() {
			return {
				info: {},
				dataList: [{
						name: '语雀API',
						url: 'https://www.yuque.com/yuque/developer'
					},
					{
						name: '本项目地址',
						url: 'xxxx'
					},
					{
						name: '语雀地址',
						url: 'https://www.yuque.com/caiyongqing'
					},
				]
			}
		},
		async onLoad() {
			const userInfo = uni.getStorageSync('userInfo')
			console.log(userInfo);
			if (userInfo) {
				this.info = JSON.parse(userInfo)
			} else {
				await this.getUserInfo()
			}
		},
		methods: {
			async getUserInfo() {
				try {
					const info = await userApi.user()
					uni.setStorageSync('userInfo', JSON.stringify(info.data))
				} catch (e) {
					uni.showModal({
						title: '出错啦',
						content: e,
					})
				}
			},
			clickItem(item) {
				console.log(item.url);
				uni.setClipboardData({
					data: item.url,
					success: function() {
						uni.showToast({
							title: '复制成功',
							icon: 'success'
						})
					}
				});
			}
		},
	}
</script>

<style lang="scss">
	page {
		background: $uni-bg-color-grey;
	}

	.about-page {
		.avatar-content {
			width: 100%;
			margin-top: 30px;
			display: flex;
			justify-content: center;

			.avatar {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
			}
		}

		.url-content {
			margin-top: 30px;
			padding: 0 30px;

			.url-item {
				line-height: 30px;
				font-size: 14px;
				color: $uni-color-primary;
			}

			.url-item:before {
				content: "";
				display: inline-block;
				width: 4px;
				height: 4px;
				border-radius: 4px;
				background-color: #8a8f8d;
				margin-right: 10upx;
				margin-left: 29upx;
			}
		}

		.footer-content {
			position: fixed;
			text-align: center;
			bottom: 30px;
			width: 100%;
			color: $uni-text-color-placeholder;
			font-size: 12px;
		}

	}
</style>
