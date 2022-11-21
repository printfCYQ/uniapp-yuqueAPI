import request from './request.js'

// 获取某个用户的知识库列表
const repos = (id, data) => {
	return request({
		url: `/users/${id}/repos`,
		method: 'GET',
		params: data
	})
}


// 获取知识库详情
const reposById = (id) => {
	return request({
		url: `/repos/${id}`,
		method: 'GET',
	})
}

export default {
	repos,
	reposById
}
