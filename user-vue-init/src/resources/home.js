import ajax from 'axios'
export default {
	runhome(params) {
		return ajax.get('/wm-news-web/wmapp/news/luck/runhome', {params: params})

	},
	rundraw(params) {
		return ajax.get('/wm-news-web/wmapp/news/luck/rundraw', {params: params})
	},


}