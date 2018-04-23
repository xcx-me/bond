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
	},
	bondType: {
		label: '债券品种：',
		items: [
			{name: '101', value: 'NCD'},
			{name: '102', value: '政金债'},
			{name: '103', value: '商行债'},
			{name: '104', value: '次级债'},
			{name: '105', value: '其他金融债'},
			{name: '106', value: '企业债'},
			{name: '107', value: 'ABS'},
			{name: '108', value: '公司债'},
			{name: '109', value: '小公募'},
			{name: '110', value: '私募债'},
			{name: '111', value: 'SCP'},
			{name: '112', value: 'CP'},
			{name: '113', value: 'MTN'},
			{name: '114', value: 'PPN'}
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
	},
	defaultFormData: {
		bond_simple_name: '', // 简称
		left_benefit: '', // 参考收益左值
		right_benefit: '', // 参考收益右值
		subject_rating: '', // 主体评级
		facility_rating: '', // 债项评级
		deadline: '', // 期限
		issue_total: '', // 发行量
		public_place: '', // 上市地点
		issue_time: '', // 发行时间
		bid_end: '', // 截标时间
		company_type: '', // 企业性质
		bond_type: '', // 债券品种
		issue_way: '', // 发行方式
		rate_way: '', // 利率方式
		benchmark: '', // 基准
		cal_freq: '', // 计息频率
		pay_freq: '', // 付息频率
		repay_way: '', // 还本方式
		specific_items: '', // 特殊条款
		credit_guarantee: '', // 增信担保 
		zhu_cheng: '', // 主承
		bond_full_name: '', // 债券全称
		attached_ids: ''
	},
	simpleName: { //test
		name: ['利随本清', '固定利率', '浮动利率', '累积利率', '浮动利率', '累积利率']
	}
}
