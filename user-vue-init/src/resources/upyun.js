import upyunCofig from '@/config'
import config from '@/config'
import util from '@/common/utils/util'

const url = {
	/*
	*method : get
	*params : {path:string,save-key:filename}
	*/
	getUploadSign : config.host+'/wm-app-admin/signuptools/getupyunsign',
}
export default {
	getUploadSignUrl: url.getUploadSign,

	getUploadSign(filename, pathIndex) {
		return util.syncRequest(url.getUploadSign+'?path=1&save-key='+filename+'&pathIndex='+pathIndex)
	}
}