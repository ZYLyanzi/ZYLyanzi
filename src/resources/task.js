import ajax from 'axios'
import api from './apis/task.api'

export default {
	queryTaskType(params) {
		return ajax.post(api.queryTaskType, params)
	},
	myReleaseTask(params) {
		return ajax.post(api.myReleaseTask, params)
	},
	addTask(params) {
		return ajax.post(api.addTask, params)
	},
	taskDesc(params) {
		return ajax.post(api.taskDesc, params)
	},
	distributeTask() {
		return ajax.post(api.distributeTask)
	},
	replyDistributeTask(params) {
		return ajax.post(api.replyDistributeTask, params)
	},
	submitDistributeTask(params) {
		return ajax.post(api.submitDistributeTask, params)
	},
	queryDistributeTask(params) {
		return ajax.post(api.queryDistributeTask, params)
	},
	queryMyDistributeTask(params) {
		return ajax.post(api.queryMyDistributeTask, params)
	},
	updateTask(params) {
		return ajax.post(api.updateTask, params)
	},
	comfirmDistributeTask(params) {
		return ajax.post(api.comfirmDistributeTask, params)
	},
	queryScoreCz(params) {
		return ajax.post(api.queryScoreCz, params)
	},
	carousel() {
        return ajax.post(api.carousel)
    },
    appealTask(para) {
        return ajax.post(api.appealTask, para)
    },
	taskOffShelf(para) {
		return ajax.post(api.taskOffShelf, para)
	},



}
