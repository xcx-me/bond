// app/page/quotation/quotation.js

const Toast = require('../../util/toast/toast')
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
		isSubmitting: false,
		submitQuoteBtnEnable: false,
		warningShowText: false,
		warningText: '格式输入错误，请重新输入',
		highlightItem: {
			benefit: '',
			subject_rating: '',
			facility_rating: '',
			deadline: ''
		},
		fixedPage: false
	},

	openMyShop: function () {
		this.setData({
			isOpenMyShop: true
		})
	},

	handleSendQuote () { // 发布报价
		let submitData = this.data.sendQuoteData

		if (JSON.stringify(submitData) !== '{}') {
			this.validate(submitData) && this.sendQuoteRequest(submitData)
		}else {
			Toast.showToast('数据填写有误')
		}
	},

	validate (submitData) {
		let result = true
		if (Number(submitData.left_benefit) > Number(submitData.right_benefit)) { // 参考收益
			this.showWraningText('benefit')
			result = false
		}
		if (!this.checkRatingFormat(submitData.subject_rating)) { // 主体评级
			this.showWraningText('subject_rating')
			result = false
		}
		if (!this.checkRatingFormat(submitData.facility_rating)) { // 债项评级
			this.showWraningText('facility_rating')
			result = false
		}
		if (!this.checkDeadlineFormat(submitData.deadline)) { // 发行期限
			this.showWraningText('deadline')
			result = false
		}

		return result
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

	showWraningText: function (currentHighlight) {
		let highLightFlag = this.data.highlightItem
		highLightFlag[currentHighlight] = true

		this.setData({
			warningShowText: true,
			highlightItem: highLightFlag
		})
	},

	sendQuoteRequest: function (params) {
		this.setData({
			isSubmitting: true
		})

		request(config.NEW_BOND.sendBond, params).then((result) => {
			if (String(result.data.ret) === '0') {
				Toast.showToast('发布成功')
				this.setData({
					isSubmitting: false,
					submitQuoteBtnEnable: false
				})
				setTimeout(()=>{
					wx.navigateBack()
				}, 1500)
			} else {
				Toast.showToast(result.data.retmsg)
				this.setData({
					isSubmitting: false
				})
			}
		}).catch(() => {
			Toast.showToast('请求错误')
		})
	},

	_changeValue: function (e) { // 获取发布报价参数
		let detail = e.detail
		this.setData({
			sendQuoteData: detail,
			submitQuoteBtnEnable: detail.bond_simple_name !=='' && (detail.left_benefit !=='' || detail.right_benefit !=='') && detail.subject_rating !=='' && detail.facility_rating !=='' && detail.deadline !=='' && detail.issue_total !==''
		})
	},

	_changeHighLight: function (e) {
		let curHighlightItem = this.data.highlightItem
		curHighlightItem[e.detail] = false
		this.setData({
			highlightItem: curHighlightItem
		})
	},

	_changePageScrollFixed: function (e) {
		this.setData({
			fixedPage: e.detail
		})
	},

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
		wx.setNavigationBarTitle({
			title: bondSimpleName ? '编辑' : '发布'
		})
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