import request from './request.js'

// 获取一个仓库的文档列表（仓库id）
const docs = (id, data) => {
	return request({
		url: `/repos/${id}/docs`,
		method: 'GET',
		params: data
	})
}

// 获取单篇文档的详细信息(仓库ID，文章id)
const docsById = (namespace, slug) => {
	return request({
		url: `/repos/${namespace}/docs/${slug}`,
		method: 'GET',
	})
}

const search = (data) => {
	return request({
		url: `/search`,
		method: 'GET',
		params: data
	})
}

export default {
	docs,
	docsById,
	search
}
