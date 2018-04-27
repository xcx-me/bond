module.exports = {
 	getStatus: {
		INIT: 1,
		FRESH: 2,
		UPDATE: 3,
		LOADMORE: 4,
		ENDLOADED: 5
	},

	getType: {
		ADMIN: 1,     // 管理-我的发布
		MYSTORE: 2,   // 我的店铺-所有债券列表
		MYOTHERS: 3,  //我的债券详情-其他债券列表
		OTHERS: 4   // **的店铺/债券详情
	}
}