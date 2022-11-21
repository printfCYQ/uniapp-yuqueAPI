import axios from "axios";
import buildURL from 'axios/lib/helpers/buildURL'
import settle from 'axios/lib/core/settle'

const baseUrl = 'https://www.yuque.com/api/v2'
// const baseUrl = '/yuque'
const XAuthToken = 'f1cWg2FViyFOacoOdQIr5wFvl3EqCla3RQqMXSSd'

axios.defaults.adapter = function(config) {
	return new Promise((resolve, reject) => {
		console.log(config)
		// var settle = require('axios/lib/core/settle');
		// var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};

				settle(resolve, reject, response);
			}
		})
	})
}

let request = axios.create({
	baseURL: baseUrl,
	timeout: 10000, //设置超时时间
})
// `${baseUrl}?accessToken=${uni.getStorageSync("accessToken")}&reflashToken=${uni.getStorageSync("reflashToken")}`
//请求拦截器
//请求拦截
request.interceptors.request.use(
	function(config) {
		// console.log("请求之前的配置项：", config)
		config.headers['X-Auth-Token'] = XAuthToken
		config.headers['Content-Type'] = 'application/json'
		return config;
	},
	function(error) {
		return Promise.reject(error);
	}
)

//响应拦截器
request.interceptors.response.use(
	function(response) {
		// console.log("响应拦截器响应的数据,", response);
		return response.data;
	},
	function(error) {
		return Promise.reject(error);
	}
);
export default request; //把request暴露出去
