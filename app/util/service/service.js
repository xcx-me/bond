const { request } = require('../ajax/ajax')
const config = require('../ajax/config')
module.exports = {
	doService: function(configure, data, sucFunc, errFunc) {
		request(configure, data).then((result) => {
			if (String(result.data.ret) === '0') {
				sucFunc && sucFunc(result)
			} else {
				errFunc && errFunc(result)
			}
		}).catch((error) => {
			errFunc && errFunc()
		})
	},

	doThumb: function(answerId, sucFunc, errFunc) {
		this.doService(config.NEW_BOND.thumbQuestion, {answer_id: answerId}, sucFunc, errFunc)
	},

	getQuestionList: function (bondId, sucFunc, errFunc) {
		this.doService(config.NEW_BOND.questionQuery, {bond_id: bondId}, sucFunc, errFunc)
	},

	getQuestionTotal: function (bondId, sucFunc, errFunc) { 
		this.doService(config.NEW_BOND.questionTotalQuery, {bond_id: bondId}, sucFunc, errFunc)
	},

	getStoreDetail: function (uid, sucFunc, errFunc) {
		this.doService(config.NEW_BOND.storeDetail, {user_id: uid}, sucFunc, errFunc)
	},

	getCardInfo: function(sucFunc, errFunc) {
		this.doService(config.NEW_BOND.cardInfo, {}, sucFunc, errFunc)
	},

	isStoreOpened: function(sucFunc, errFunc) {
		this.doService(config.NEW_BOND.isStoreOpened, {}, sucFunc, errFunc)
	},

	getBondList: function (data, sucFunc, errFunc) {
		this.doService(config.NEW_BOND.newBondList, data, sucFunc, errFunc)
	},

	getStoreDynamic: function (sucFunc, errFunc) {
		this.doService(config.NEW_BOND.news, {}, sucFunc, errFunc)
	},

	deleteStoreDynamic: function (bondSimpleName, sucFunc, errFunc) {
		this.doService(config.NEW_BOND.deleteNews, {bond_simple_name: bondSimpleName}, sucFunc, errFunc)
	},

	doShareStore: function(userId, bondSimpleName, sucFunc, errFunc){
		this.doService(config.USER_TRACKING.accumulateShare,{user_id: userId, bond_simple_name: bondSimpleName}, sucFunc, errFunc)
	},

	doOpenStore: function(sucFunc, errFunc) {
		this.doService(config.NEW_BOND.openMyShop, {}, sucFunc, errFunc)
	},

	doAsk: function(bondSimpleName, content, userId, sucFunc, errFunc) {
		this.doService(config.NEW_BOND.askQuestion, {
			bond_simple_name: bondSimpleName,
			content: content,
			shop_user_id: userId
		}, sucFunc, errFunc)
	},

	doAnswer: function (askId, content, sucFunc, errFunc){
		this.doService(config.NEW_BOND.answerQuestion, {ask_id: askId, content: content}, sucFunc, errFunc)
	},

	getSaleInfo: function(bondId, sucFunc, errFunc) {
		this.doService(config.NEW_BOND.getSaleInfo, {bond_id: bondId}, sucFunc, errFunc)
	},

	modNewBondDetail: function(data, sucFunc, errFunc) {
		this.doService(config.NEW_BOND.modNewBondDetail, data, sucFunc, errFunc)
	},

	deleteBond: function (simpleName, sucFunc, errFunc) {
		this.doService(config.NEW_BOND.deleteBond, {bond_simple_name: simpleName}, sucFunc, errFunc)
	},
	// 发布报价
	getBondAssociate: function(simpleName, sucFunc, errFunc) { //债券详情
		this.doService(config.NEW_BOND.associateBond, {bond_simple_name: simpleName}, sucFunc, errFunc)
	},
	getBondSimpleName: function(data, sucFunc, errFunc) { // 债券简称联想
		this.doService(config.NEW_BOND.associateBondName, {bond_msg: data}, sucFunc, errFunc)
	}
}