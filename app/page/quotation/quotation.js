// app/page/quotation/quotation.js

const common = require('../../util/common.js')
const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		bondSimpleName: '', //编辑传送过来的简称
		isOpenMyShop: true, // 是否开店
		isEditEntry: false, // 是否是债券编辑入口
		sendQuoteData: {}, // 发布报价参数
		submitQuoteBtnEnable: false,
		warningShowText: false,
		warningText: '格式输入错误，请重新输入',
		highlightItem: 'none'
	},

	openMyShop: function () {
		this.setData({
			isOpenMyShop: true
		})
	},

	handleSendQuote () { // 发布报价
		let submitData = this.data.sendQuoteData

		console.log(submitData)
		
		if (JSON.stringify(submitData) !== '{}') {
			if (Number(submitData.left_benefit) > Number(submitData.right_benefit)) { // 参考收益

				console.log('quotation form of benifit error: ')
				this.setData({
					highlightItem: 'benifit'
				})

				this.showWraningText()
				return
			}
			if (!this.checkRatingFormat(submitData.subject_rating)) { // 主体评级
				this.showWraningText()
				return
			}
			if (!this.checkRatingFormat(submitData.facility_rating)) { // 债项评级
				this.showWraningText()
				return
			}
			if (!this.checkDeadlineFormat(submitData.deadline)) { // 发行期限
				this.showWraningText()
				return
			}

			this.sendQuoteRequest(submitData)
		}else {
			Toast.showToast('数据填写有误')
		}
	},

	checkRatingFormat: function (value) {
		let reg = /^[a-zA-Z]{1,3}[+-]?$/
		if (reg.test(value)) {
			return true
		} else {
			return false
		}
	},
	 
	checkDeadlineFormat: function (value) {
		let reg = /(^[1-9]{1}[0-9]{0,4}([.]+[0-9]{1,2})?)([dymDYM]{1}$)|([dymDYM]{1}[+]{1}[a-zA-Z]$)|([dymDYM]{1}[+]{1}[1-9]{1}[0-9]{0,4}([.]+[0-9]{1,2})?[dymDYM]{1}$)/
		if (reg.test(value)) {
			return true
		}else {
			return false
		}
	},

	showWraningText: function () {
		this.setData({
			warningShowText: true
		})

		setTimeout(() => {
			this.setData({
				warningShowText: false
			})
		}, 2000)
	},

	sendQuoteRequest: function (params) {
		request(config.NEW_BOND.sendBond, params).then((result) => {
			if (String(result.data.ret) === '0') {
				Toast.showToast('发布报价成功！', 'success')
				wx.navigateBack()
			} else {
				Toast.showToast(result.data.retmsg)
			}
		}).catch(() => {
			Toast.showToast('请求错误')
		})
	},

	// 获取债券详情。。。。。。。。。。
	// associateBondDetails: function () {
	// 	// console.log('bondDetailsName： ', this.data.sendQuoteData.bond_simple_name)
	// 	request(config.NEW_BOND.associateBond, {bond_simple_name: this.data.sendQuoteData.bond_simple_name}).then((result) => {
	// 		if (String(result.data.ret) === '0') {
	// 			console.log(result.data.retdata)
	// 			let resultData = result.data.retdata
	// 			let formData = this.data.sendQuoteData
	// 			formData.left_benefit = resultData.left_benefit
	// 			formData.right_benefit = resultData.right_benefit

	// 			this._setNewQuoteData(formData)
	// 			// console.log(this.data.sendQuoteData)
	// 		} else {
	// 			Toast.showToast(result.data.retmsg, 'none', 2000)
	// 		}
	// 	}).catch(() => {
	// 		Toast.showToast('请求错误', 'none', 2000)
	// 	})
	// },

	_changeValue: function (e) { // 获取发布报价参数
		let detail = e.detail
		this.setData({
			sendQuoteData: detail,
			submitQuoteBtnEnable: detail.bond_simple_name !=='' && (detail.left_benefit !=='' || detail.right_benefit !=='') && detail.subject_rating !=='' && detail.facility_rating !=='' && detail.deadline !=='' && detail.issue_total !==''
		})

		// console.log('isShowBTn: ', this.data.submitQuoteBtnEnable)
		console.log('_changeValue....', detail)
	},

	_changeHighLight: function () {
		this.setData({
			highlightItem: 'none'
		})
	},


	// //取消事件
	// _cancelEvent() {
	// 	console.log('你点击了取消');
	// 	this.dialog = this.selectComponent('#dialog')
	// 	this.dialog.hideDialog();
	// },
	// //确认事件
	// _confirmEvent() {
	// 	console.log('你点击了确定');
	// 	this.dialog = this.selectComponent('#dialog')
	// 	this.dialog.hideDialog();
	// },

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let bondSimpleName = options.bname
		if (bondSimpleName) {
			this.setData({
				bondSimpleName: bondSimpleName,
				isEditEntry: bondSimpleName.length > 0
			})
		}
		// console.log('quotation onLoad....', options.bname)
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},
 
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})