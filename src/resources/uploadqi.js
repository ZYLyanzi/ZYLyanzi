// import ajax from 'axios'
import config from '@/config'
import util from '@/common/utils/util'

const url = {
	getUploadToken : config.host+'/api/common/uploadToken',
};

export default {
	getUploadToken() {
		return util.syncRequest(url.getUploadToken+'?bucket=rddimg')
	}
}