module.exports = {
	bondFieldList: [
		{
			name: 'header',
			value: [
				{name: 'bond_simple_name', label:''},
				{name: 'benefit', label: ''},
			]
		},

		{
			name: 'content',
			value: [
				{name: 'rating', label: ''},
				{name: 'deadline', label: ''},
				{name: 'issue_total', label: ''},
				{name: 'bond_type', label: '债券品种：'},
				{name: 'issue_time', label: '发行时间：'},
				{name: 'bid_end', label: '截标时间：'}
			]
		}
	],

	bondInfoFieldList: {
		'sale': [
			{name: 'little_range', label: '小区间(%)'},
			{name: 'early_end', label: '提前截标'},
			{name: 'sale_type', label: '销售方式'}
		],

		'detail': [
			[{name: 'bond_simple_name', label:'债券简称'}],
				[{name: 'benefit', label: '参考收益(%)'},
				{name: 'rating', label: '主/债评级'}],
				[{name: 'deadline', label: '发行期限'},
				{name: 'issue_total', label: '发行量(亿)'}],
				[{name: 'public_place', label: '上市地点'},
				{name: 'issue_time', label: '发行时间'}],
				[{name: 'bid_end', label: '截标时间'},
				{name: 'company_type', label: '企业性质'}],
				[{name: 'bond_type', label: '债券品种'},
				{name: 'issue_way', label: '发行方式'}],
				[{name: 'rate_way', label: '利率方式'},
				{name: 'cal_freq', label: '计息频率'}],
				[{name: 'pay_freq', label: '付息频率'},
				{name: 'repay_way', label: '还本方式'}],
				[{name: 'specific_items', label: '特殊条款'},
				{name: 'credit_guarantee', label: '增信担保'}],
				[{name: 'zhu_cheng', label: '主承'},
				{name: 'bond_full_name', label: '债券全称'}]
		]
	},

	bondInfoFieldList1: [
		{
			name: 'saleInfo',
			value: [
				{name: 'little_range', label: '小区间(%)'},
				{name: 'early_end', label: '提前截标'},
				{name: 'sale_type', label: '销售方式'}
			]
		},
		{
			name: 'detail',
			value: [
				[{name: 'bond_simple_name', label:'债券简称'},
				{name: 'benefit', label: '参考收益(%)'}],
				[{name: 'rating', label: '主/债评级'},
				{name: 'deadline', label: '发行期限'}],
				[{name: 'issue_total', label: '发行量(亿)'},
				{name: 'public_place', label: '上市地点'}],
				[{name: 'issue_time', label: '发行时间'},
				{name: 'bid_end', label: '截标时间'}],
				[{name: 'company_type', label: '企业性质'},
				{name: 'bond_type', label: '债券品种'}],
				[{name: 'issue_way', label: '发行方式'},
				{name: 'rate_way', label: '利率方式'}],
				[{name: 'cal_freq', label: '计息频率'},
				{name: 'pay_freq', label: '付息频率'}],
				[{name: 'repay_way', label: '还本方式'},
				{name: 'specific_items', label: '特殊条款'}],
				[{name: 'credit_guarantee', label: '增信担保'},
				{name: 'zhu_cheng', label: '主承'}],
				[{name: 'bond_full_name', label: '债券全称'}]
			]
		}
	],
}