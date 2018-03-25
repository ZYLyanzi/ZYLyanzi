import ajax from 'axios'
import api from './apis/task.api'

export default {
	queryTaskType(params) {
		return ajax.post(api.queryTaskType, params)
	},
	addTask(params) {
		return ajax.post(api.addTask, params)
	},
	taskDesc(params) {
    return ajax.post(api.taskDesc, {params: params})
  },
  distributeTask() {
    return ajax.post(api.distributeTask)
  },
  replyDistributeTask(params) {
    return ajax.post(api.replyDistributeTask, {params: params})
  },
  submitDistributeTask(params) {
    return ajax.post(api.replyDistributeTask, {params: params})
  },
  queryDistributeTask(params) {
    return ajax.post(api.queryDistributeTask, {params: params})
  },
	updateTask(params) {
		return ajax.post(api.updateTask, params)
	},

}
