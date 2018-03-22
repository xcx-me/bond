// app/page/quotation/quotation.js

const bondType = [
	{name: '101', value: 'NCD'},
	// {name: '102', value: '政金债', checked: 'true'},
	{name: '103', value: '商行债'},
	{name: '104', value: '次级债'},
	{name: '105', value: '其他金融债'},
	{name: '106', value: 'ABS'},
	{name: '107', value: '公司债'},
	{name: '108', value: '小公募'},
	{name: '109', value: 'SCP'},
]

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isOpenMyShop: false,
		items: bondType,
		itemsCheckedValue: '',
		casArray: ['利随本清', '固定利率', '浮动利率', '累积利率'],
		casIndex: -1
	},

	openMyShop: function () {
		this.setData({
			isOpenMyShop: true
		})
	},

	checkboxChange: function(e) {
		// console.log('checkbox发生change事件，携带value值为：', e.detail.value)
		let checkedValue = e.detail.value
		let checkedItem = []
		checkedValue.forEach((item, index) => {
			checkedItem.push(this.data.items.find((items) => { return items.name === item}).value)
		})
		this.setData({
			itemsCheckedValue: checkedItem.join('、')
		})
		console.log('债券品种：', checkedItem)
	},

	bindCasPickerChange: function (e) {
		console.log('----checked: ', this.data.casArray[e.detail.value])
		if (e.detail.value == 2) {
			this.setData({ reply: true })
		} else {
			this.setData({ reply: false })
		}
		this.setData({
			casIndex: e.detail.value
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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