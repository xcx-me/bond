module.exports = {
	listingSpot: {
		label: '上市地点：',
		items: [
			{name: '1', value: '银行间'},
			{name: '2', value: '上交所'},
			{name: '3', value: '深交所'},
			{name: '4', value: '其他'}
		]
	},
	enterpriseNature: {
		label: '企业性质：',
		items: ['中央国企', '地方国企', '公众企业', '民营企业', '三资企业']
		// items: [
		// 	{name: '1', value: '中央国企'},
		// 	{name: '2', value: '地方国企'},
		// 	{name: '3', value: '公众企业'},
		// 	{name: '4', value: '民营企业'},
		// 	{name: '5', value: '三资企业'}
		// ]
	},
	bondType: {
		label: '债券品种：',
		items: [
			{name: '101', value: 'NCD'},
			{name: '102', value: '政金债'},
			{name: '103', value: '商行债'},
			{name: '104', value: '次级债'},
			{name: '105', value: '其他金融债'},
			{name: '106', value: 'ABS'},
			{name: '107', value: '公司债'},
			{name: '108', value: '小公募'},
			{name: '109', value: 'SCP'},
		]
	},
	issuanceMethod: {
		label: '上市地点：',
		items: ['簿记建档', '荷兰式', '混合式']
	},
	rateWay: {
		label: '利率方式：',
		items: ['利随本清', '固定利率', '浮动利率', '累积利率']
	},
	specificClause: {
		label: '特殊条款：',
		items: [
			{name: '1', value: '调整票面'},
			{name: '2', value: '赎回'},
			{name: '3', value: '延期'},
			{name: '4', value: '交叉违约'}
		]
	}
}
