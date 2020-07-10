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

function ship_category_data(){
	var data = [
		{
			company_id: "1",
			deep: 0,//指深度，子类比父类的深度加1
			has_child: true,
			id: 1,
			lft: "1",//一个标识，子类的下标应该在父类的范围内
			name: "船",
			prefix: "",
			prefix_name: "船",
			remark: null,
			rgt: "4",
			trashed: "0"
		},
		{
			company_id: "1",
			deep: 1,
			has_child: false,
			id: 2,
			lft: "2",
			name: "小船",
			prefix: "",
			prefix_name: "|---小船",
			remark: null,
			rgt: "3",
			trashed: "0"
		},
	];
	return data;
}

function ship_category_data2(){
	var data = 
	{
		company_id: "1",
		deep: 0,//指深度，子类比父类的深度加1
		has_child: true,
		id: 1,
		lft: "1",//一个标识，子类的下标应该在父类的范围内
		name: "船",
		prefix: "",
		prefix_name: "船",
		remark: null,
		rgt: "4",
		trashed: "0"
	};
	return data;
}

function printer_data(){
	var data=[
		{
			id:1,
			content:`
			<table>
			    <thead>
			    <tr>
			        <th ng-repeat="(key,value) in print_data.rows[0]"
					ng-bind-html="key">			           
			        </th>
			    </tr>
			    </thead>
			    <tbody>
			    <tr ng-repeat="row in print_data.rows">
			        <td ng-repeat="item in row"
						ng-bind-html="item"
						>
			        </td>
			    </tr>
			    </tbody>
			</table>
			`
			,//最后的模板
			config:{
				bill_row_fields: [
				    'product_id'
				    , 'unit_price'
				    , 'quantity'
				    , 'subtotal_amount'
				    ,'remark'
				],
			}
		}
	]
	return data;
}

function order_check(){
	var data = [
		{
			count: "2", 
			totalPages: 1,
		},
		{
			0:{
				bill_no: "A2F0894701 106",
				company_id: 1,
				created: "2020-06-08 13:38:21",
				estimated_time: "2020-06-08 13:38:21",
				id: 3,
				type: '石料',
				ship_id: 1,
				ship_id__label__: '诺亚方舟',
				total_weight: 20,
				customer_id: 1,
				customer_id__label__: "测试客户",
				remark: "备注",
				status: 0,
				subject: "核对订单",
				trashed: "0",
				accounting_method: "",
				ship_status: "未核对",
				workflow_id: 99,
				workflow_id__label__: "工作流a",
				workflow_node_status_label: "未处理",
				user_info_id: 1
			},
			1:{
				bill_no: "A2F0894701 107",
				company_id: 1,
				created: "2020-06-08 13:38:21",
				estimated_time: "2020-06-08 13:38:21",
				id: 4,
				type: '石料',
				ship_id: 1,
				ship_id__label__: '诺亚方舟',
				total_weight: 20,
				customer_id: 1,
				customer_id__label__: "测试客户",
				remark: "备注",
				status: 1,
				//subject: "核对订单",
				trashed: "0",
				accounting_method: "",
				ship_status: "未核对",
				workflow_id: 99,
				workflow_id__label__: "工作流a",
				workflow_node_status_label: "已处理",
				user_info_id: 1
			}
		}
	];
	return data;
}

function order_check_detail(){
	var data = {
		meta :{
			bill_no: "A2F0894701 106",
			company_id: 1,
			created:  new Date("2020-06-08 13:38:21"),
			estimated_time: new Date("2020-06-08 13:38:21"),
			id: 3,
			type: '石料',
			//ship_name: '远程号',
			ship_id: 1,
			ship_id__label__: '诺亚方舟',
			total_weight: 20,
			customer_id: 1,
			customer_id__label__: "测试客户",
			remark: "备注",
			status: 0,
			subject: "核对订单",
			trashed: "0",
			accounting_method: "",
			ship_status: "未核对",
			source_id: 99,//这是工作流实例的id
			source_model: null,//不知道是啥
			workflow_id: 99,//这是工作流类型的id
			workflow_id__label__: "工作流a",
			workflow_node_status_label: "未处理",
			user_info_id: 1
		},
		rows :[
			{
				company_id: "1",
				id: 10,
				measure_unit: "t",
				orders_id: "3",
				product_id: "1",
				product_id__label__: "瓜子",
				product_unique_id: "1",
				quantity: 20,
				quantity__after__: "t",
				already_deliver: 0,
				already_deliver__after__: "t",
				remainder: 20,
				remainder__after__: "t",
				remark: null,
				serial_number: "1",
				subtotal_amount: 2000,
				trashed: "0",
				unit_price: 100,
			}
		]
	}
	return data;
}

function order_check_next(){
	var data = [
		//776，等待核对
		{
			id:777,
			label:"\u6838\u5bf9\u64cd\u4f5c",
			workflow_id:99,
		},
		//中间一个状态叫核对完成
		{
			id:779,
			label:"调度操作",
			workflow_id:99,
		},
	]
	return data;
}

function order_dispatch_next(){
	var data = [
		//776，等待核对
		{
			id:877,
			label:"码头装货",
			workflow_id:199,
		},
		//之后一个状态叫完成发货
	]
	return data;
}

function order_check_redirect(){
	var data = {
		pause: "true",
		type: "redirect",
		url: "/storage/stockIn/confirm/bill/4/node/12"
	}
	return data;
}

function order_dispatch(){
	var data = [
		{
			count: "2", 
			totalPages: 1,
		},
		{
			0:{
				bill_no: "A2F0894701 106",
				company_id: 1,
				dispatch_time: "2020-06-08 13:38:21",
				id: 3,
				order_id: 3,
				type: '石子混料',
				delivery_place:'万南',
				ship_id: 1,
				ship_id__label__: '诺亚方舟',
				total_weight: 20,
				real_weight: 0,
				customer_id: 1,
				customer_id__label__: "测试客户",
				remark: "备注",
				status: 0,
				subject: "发货单",
				trashed: "0",
				ship_status: "未核对",
				workflow_id: 199,
				workflow_id__label__: "工作流b",
				workflow_node_status_label: "未完成",
				user_info_id: 1
			}
		}
	];
	return data;
}

function order_dispatch_detail(){
	var data = {
		meta :{
			bill_no: "A2F0894701 106",
			company_id: 1,
			dispatch_time: new Date("2020-06-08 13:38:21"),
			id: 3,
			order_id: 3,
			type: '石子混料',
			delivery_place:'万南',
			ship_id: 1,
			ship_id__label__: '诺亚方舟',
			total_weight: 20,
			real_weight: 0,
			customer_id: 1,
			customer_id__label__: "测试客户",
			remark: "备注",
			status: 0,
			subject: "发货单",
			trashed: "0",
			ship_status: "未核对",
			workflow_id: 199,
			workflow_id__label__: "工作流b",
			workflow_node_status_label: "未完成",
			user_info_id: 1
		},
		rows :[
			{
				company_id: "1",
				id: 11,
				measure_unit: "t",
				orders_id: 3,
				product_id: "1",
				product_id__label__: "瓜子",
				product_unique_id: "1",
				quantity: 21,
				quantity__after__: "t",
				real_quantity: 0,
				real_quantity__after__: "t",
				remark: null,
				serial_number: "1",
				trashed: "0",
			}
		]
	}
	return data;
}

function transMeter_meter(){
	var data = [
		{
			count: 1, 
			totalPages: 1,
		},
		{
			0:{
				company_id: 1,
				created: "2020-06-08 13:38:21",
				id: 3,
				type: '宕渣',
				ship_id: 1,
				ship_id__label__: '诺亚方舟',
				order_id: 3,
				total_weight: 20,
				already_weight: 0,
				remark: 'hehehe',
				trashed: "0",
			}
		}
	];
	return data;
}
function transMeter_meterLog(){
	var data = [
		{
			count: 1, 
			totalPages: 1,
		},
		{
			0:{
				company_id: 1,
				created: "2020-06-08 13:38:21",
				id: 3,
				type: '宕渣',
				order_id:3,
				ship_id: 1,
				order_id: 3,
				weight: 20,
				remark: 'hehehe',
				trashed: "0",
			}
		}
	];
	return data;
}

function transMeter_meterLog_one(){
	var data = {
			company_id: 1,
			created: new Date(moment().format()),
			id: 3,
			car_id: 100,
			type: '宕渣',
			order_id:3,
			ship_id: 1,
			order_id: 3,
			weight: 0,
			remark: '',
			trashed: "0",
		};
	return data;
}
