function plans_data(){
	var data = [
		{
			count: "1", 
			totalPages: 1,
		},
		{
			0:{
				bill_no: "A2F0894701 106",
				company_id: 1,
				start_time: "2020-06-08 13:38:21",
				end_time: "2020-06-08 13:38:21",
				id: 3,
				quantity: 2,
				remark: "五",
				source_id: 0,
				source_model: "",
				status: 0,
				subject: "装运订单",
				trashed: "0",
				user_info_id: 1,
			}
		}
	];
	return data;
}
function plans_detail_data(){
	var data = {
		meta :{
			bill_no: "A2F0894701 106",
			company_id: 1,
			start_time: "2020-06-08 13:38:21",
			end_time: "2020-06-08 13:38:21",
			id: 3,
			quantity: 2,
			remark: "五",
			source_id: 0,
			source_model: null,
			status: 0,
			subject: "装运订单",
			trashed: "0",
			user_info_id: 1,
		},
		rows :[
			{
				already_in__after__: "KG",
				attribute_content_ids: [null],
				company_id: 1,
				id: 2,
				measure_unit: "KG",
				plans_id: 3,
				ship_id: 1,
				ship_id__label__: "诺亚方舟",
				product_unique_id: "1",
				quantity1: 1000,
				quantity1__after__: "KG",
				quantity2: 1000,
				quantity2__after__: "KG",
				quantity3: 1000,
				quantity3__after__: "KG",
				remark: null,
				remark__label__: "",
				customer: '王经理',
				customer__label__: '王经理',
				phone: '13456112000',
				phone__label__: '13456112000',
				serial_number: "1",
				trashed: "0",
			}
		]
	}
	return data;
}

function ship_data(){
	var data = [
		{
			count: "1", 
			totalPages: 1,
		},
		{
			0:{
				bar_code: "2324324",
				company_id: 1,
				id: 1,
				ship_brand: "生松工 898",
				carrying_capacity: 10000,
				measure_unit: "KG",
				name: "诺亚方舟",
				ship_category_id: 1,
				ship_category_id__label__: "Ship Category",
				serial_number: "1",
				trashed: "0"
			}
		} 
	];
	return data;
}

function shipAPI_data(){
	var data = [
		{
			bar_code: "2324324",
			company_id: 1,
			id: 1,
			ship_brand: "生松工 898",
			carrying_capacity: 10000,
			measure_unit: "KG",
			name: "诺亚方舟",
			ship_category_id: 1,
			ship_category_id__label__: "Ship Category",
			serial_number: "1",
			trashed: "0"
		}
	];
	return data;
}

