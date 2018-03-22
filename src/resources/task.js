import ajax from 'axios'
import api from './apis/task.api'

export default {
	queryTaskType(params) {
		return ajax.get(api.queryTaskType, {params: params})
	},
	addTask(params) {
		return ajax.post(api.addTask, params)
	},
	taskDesc(params) {
		return ajax.get(api.taskDesc, {params: params})
	},
	updateTask(params) {
		return ajax.post(api.updateTask, params)
	},

}
