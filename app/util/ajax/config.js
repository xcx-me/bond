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
		},
		unreadList: {
			url: '/appletree/unreadmsglist.do',
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

		getWorkdaysInfo: { 
			url: '/qtrade_bond/api/newbond/get_workdays_info.do',
			method: POST
		},
		quotationBoard: { 
			url: '/qtrade_bond/api/newbond/quotation_board.do',
			method: POST
		},
		accumulateClick: {
			url: '/qtrade_bond/api/newbond/accumulate_click.do',
			method: POST
		},
		isStoreOpened: {
			url: '/qtrade_bond/api/newbond/is_myshop_opened.do',
			method: POST
		},
		news: {
			url: '/qtrade_bond/api/newbond/get_dynamic_tips.do',
			method: POST
		},
		deleteNews: {
			url: '/qtrade_bond/api/newbond/delete_dynamic_tip.do',
			method: POST
		},
		newBondList: {
			url: '/qtrade_bond/api/newbond/get_bond_list.do',
			method: POST
		},
		deleteBond: {
			url: '/qtrade_bond/api/newbond/delete_bond.do',
			method: POST
		},
		storeDetail: {
			url: '/qtrade_bond/api/newbond/get_shop_detail.do',
			method: POST
		},
		modNewBondDetail: {
			url: '/qtrade_bond/api/newbond/mod_quotation.do',
			method: POST
		},
		newBondDetail: {
			url: '/qtrade_bond/api/newbond/get_bond_detail.do',
			method: POST
		},
		questionQuery: {
			url: '/qtrade_bond/api/newbond/query_asklist.do',
			method: POST
		},
		questionTotalQuery: {
			url: '/qtrade_bond/api/newbond/query_ask_num.do',
			method: POST
		},
		askQuestion: {
			url: '/qtrade_bond/api/newbond/ask.do',
			method: POST
		},
		answerQuestion: {
			url: '/qtrade_bond/api/newbond/ans.do',
			method: POST
		},
		thumbQuestion: {
			url: '/qtrade_bond/api/newbond/thumb.do',
			method: POST
		}
	},
}