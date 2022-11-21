/**
 * 申请 API
 */

import request from './request.js'

const userUrl = '/user'; // 1.获取单个用户信息(自己)
const userByIdUrl = '/users'; // 2.获取单个用户信息(指定id)

const user = () => {
	return request({
		url: userUrl,
		method: 'GET',
	})
}

const userById = (id) => {
	return request({
		url: `${userByIdUrl}/${id}`,
		method: 'GET',
	})
}

export default {
	user,
	userById
}
