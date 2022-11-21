<template>
	<view class="detailwrapper">
		<view class="copytext" @click="copyLink()">语雀原文链接</view>
		<yuque-richtext :richtext="nodes"></yuque-richtext>
		<!-- <rich-text v-if="nodes" :nodes="nodes"></rich-text> -->
	</view>
</template>

<script>
	import YuqueRichtext from '@/components/YuqueRichtext/YuqueRichtext';
	import docApi from '@/api/doc.js'
	export default {
		components: {
			YuqueRichtext
		},
		data() {
			return {
				nodes: ``,
				docId: '',
				namespaceId: '',
				namespace:'',
				slug:''
			};
		},
		onLoad(option) {
			console.log(option);
			this.docId = option.docId
			this.namespaceId = option.namespaceId
			this.namespace = option.namespace
			this.docsById();
		},
		methods: {
			async docsById() {
				try {
					const res = await docApi.docsById(this.namespaceId, this.docId);
					console.log(res);
					this.nodes = res.data.body_html.replace("<!doctype html>", "");
					this.slug = res.data.slug
					uni.setNavigationBarTitle({
						title: res.data.title
					})
				} catch (e) {
					console.log(e);
				}
			},
			copyLink() {
				// let url = `https://www.yuque.com/${this.namespaceId}/${this.docId}`
				let url = `https://www.yuque.com/${this.namespace}/${this.slug}`
				uni.setClipboardData({
					data: url,
					success: function() {
						uni.showToast({
							title: '复制成功',
							icon: 'success'
						})
					}
				});
			}
		},

	};
</script>

<style lang="scss">
	page {
		background: $uni-bg-color-grey;
	}

	.detailwrapper {
		padding: 10upx 20upx;
		font-size: 32rpx;
		margin-bottom: 10upx;
	}

	.copytext {
		color: #0400ff;
		width: 100%;
		text-align: center;
	}
</style>
