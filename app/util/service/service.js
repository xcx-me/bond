const { request } = require('../ajax/ajax')
const config = require('../ajax/config')
module.exports = {
	doService: function(configure, data, sucFunc, errFunc) {
		request(configure, data).then((result) => {
			console.log(configure, result)
			if (String(result.data.ret) === '0') {
				sucFunc && sucFunc(result)
			} else {
				console.log('failed', result)
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

	getBondList: function (data, sucFunc, errFunc) {
		this.doService(config.NEW_BOND.newBondList, data, sucFunc, errFunc)
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
	}
}