const {GET, POST} = require('./method')

module.exports = {
	EXAMPLE: {
		getSometing: {
			url: '/qtrade_im/daily_checkin.do',
			method: POST
		}
	},
	AUTHENTICATION: {
		getAppletreeKey: {
			url: '/qtrade_im/daily_checkin.do',
			method: POST
		}
	},
	SYSTEM: {
		noticeList: {
			url: '/appletree/getsystemmsg.do',
			method: POST
		}
	},
	OTHER_SERVICE: {
		
	},
	NEW_BOND: { // 新债
		cardInfo: {
			url: '/appletree/cardinfo.do',
			method: POST
		},
		// 发布报价相关
		sendBond: { // 发布报价
			url: '/qtrade_bond/api/newbond/quotation.do',
			method: POST
		},
		associateBondName: { // 债券简称联想
			url: '/qtrade_bond/api/newbond/associate_bond_name.do',
			method: POST
		},
		associateBond: { // 债券信息联想
			url: '/qtrade_bond/api/newbond/associate.do',
			method: POST
		},
		judgeShopOpen: { // 是否开通店铺
			url: '/qtrade_bond/api/newbond/is_myshop_opened.do',
			method: POST
		},
		openMyShop: { // 去开通点店铺
			url: '/qtrade_bond/api/newbond/open_myshop.do',
			method: POST
		},
		// ==========

		getWorkdaysInfo: { // 发行面板上工作日列表返回
			url: '/qtrade_bond/api/newbond/get_workdays_info.do',
			method: POST
		},
		consultation: { // 询量
			// url: '/appletree/unreadmsglist.do',
			url: '/qtrade_bond/api/newbond/quotation_board.do',
			method: POST
		},
		announcement: { // 公告
			// url: '/appletree/unreadmsglist.do',
			url: '/qtrade_bond/api/newbond/quotation_board.do',
			method: POST
		},
		issue: { // 发行
			// url: '/appletree/unreadmsglist.do',
			url: '/qtrade_bond/api/newbond/quotation_board.do',
			method: POST
		},
		accumulateClick: { // 点击次数累加
			url: '/qtrade_bond/api/newbond/accumulate_click.do',
			method: POST
		},
		isStoreOpened: { // 店铺是否开通接口
			url: '/qtrade_bond/api/newbond/is_myshop_opened.do',
			method: POST
		},
		news: { // 我的店铺--查询最新动态
			url: '/qtrade_bond/api/newbond/get_dynamic_tips.do',
			method: POST
		},
		deleteNews: { // 我的店铺--点击最新动态
			url: '/qtrade_bond/api/newbond/delete_dynamic_tip.do',
			method: POST
		},
		newBondList: { // 债券列表
			url: '/qtrade_bond/api/newbond/get_bond_list.do',
			method: POST
		},
		deleteBond: { // 删除债券
			url: '/qtrade_bond/api/newbond/delete_bond.do',
			method: POST
		},
		storeDetail: { // 店铺详情
			url: '/qtrade_bond/api/newbond/get_shop_detail.do',
			method: POST
		},
		modNewBondDetail: {
			url: '/qtrade_bond/api/newbond/mod_quotation.do',
			method: POST
		},
		newBondDetail: { // 债券详情
			url: '/qtrade_bond/api/newbond/get_bond_detail.do',
			method: POST
		},
		questionQuery: { // 问答区查询
			url: '/qtrade_bond/api/newbond/query_asklist.do',
			method: POST
		},
		askQuestion: { // 问问题
			url: '/qtrade_bond/api/newbond/ask.do',
			method: POST
		},
		answerQuestion: { // 回答问题
			url: '/qtrade_bond/api/newbond/ans.do',
			method: POST
		},
		thumbQuestion: { // 点赞
			url: '/qtrade_bond/api/newbond/thumb.do',
			method: POST
		}
	},
}