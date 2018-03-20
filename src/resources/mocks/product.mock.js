import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import api from '../apis/product.api'
let result = {
    code: 1,
    tips: 1,
    msg: "",
    desc: "",
    data:{
    	
    }
}
export default {
    bootstrap() {
	    let mock = new MockAdapter(axios)
	    mock.onGet(api.getList).reply(req => {
	    	let res = [
					{
						product_id:1,
						cover_image:"https://cdn-img.17weima.com/mall2020/201712/1513239397832.jpg",
						index:0,
						name:"微马运动防晒帽-酷炫黑",
						price:3400,
						product_id:9,
						product_property_list:"",
						sale_quantity:673,
						sku_str:"",
						state:1,
						stock_quantity:127,
					},
					{
						product_id:2,
						cover_image:"https://cdn-img.17weima.com/mall2020/201712/1513239397832.jpg",
						index:0,
						name:"微马运动防晒帽-酷炫黑",
						price:3400,
						product_id:9,
						product_property_list:"",
						sale_quantity:673,
						sku_str:"",
						state:1,
						stock_quantity:127,
					}
				] 	
			result.data = res 
	    	return new Promise((resolve, reject) => {
	    		resolve([200,result])
			})
	    });

	    mock.onGet(api.getInfo).reply(req => {
	    	if(req.id = 1) {

	    	}
	    	let res = {
				product_id:2,
				cover_image:"https://cdn-img.17weima.com/mall2020/201712/1513239397832.jpg",
				index:0,
				name:"微马运动防晒帽-酷炫黑",
				price:3400,
				product_id:9,
				product_property_list:"",
				sale_quantity:673,
				sku_str:"",
				state:1,
				stock_quantity:127,
			}
			result.data = res 
			return new Promise((resolve, reject) => {
	    		resolve([200,result])
			})
	    })


	}
}