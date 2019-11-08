import request from '../utils/request';

/* ************** AR后台API请求列表 ****************** */

//获取教材信息列表
 export const listTextbook = (query) => {
    return request({url: '/ar-textbook/textbook/listTextbook',method: 'post',data: query})
    // return request({url: '/api/list',method: 'post',data: query})
}

//添加教材
export const addBook = (query) => {
    return request({url: '/api/add',method: 'post',data: query}
    )}