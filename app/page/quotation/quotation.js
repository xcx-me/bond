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
		descriptors: [
			{
				fieldName: 'text1',
				uiType: 't1',
				value: '',
				change: ''
			},
			{
				fieldName: 'text2',
				uiType: 't2',
				value: '',
				change: ''
			},
			{
				fieldName: 'text333',
				uiType: 't333',
				value: '',
				change: ''
			}
		],

		is_modal_Hidden: false,  
		is_modal_Msg: '我是一个自定义组件',

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

	// checkboxChange: function(e) {
	// 	// console.log('checkbox发生change事件，携带value值为：', e.detail.value)
	// 	let checkedValue = e.detail.value
	// 	let checkedItem = []
	// 	checkedValue.forEach((item, index) => {
	// 		checkedItem.push(this.data.items.find((items) => { return items.name === item}).value)
	// 	})
	// 	this.setData({
	// 		itemsCheckedValue: checkedItem.join('、')
	// 	})
	// 	console.log('债券品种：', checkedItem)
	// },

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

	handleShowToast: function () {
		this.toastedit = this.selectComponent('#toastedit')
		this.toastedit.showToast('显示这个哈哈哈哈哈', 2000)
	},
	showDialog() {
		this.dialog = this.selectComponent('#dialog')
		this.dialog.showDialog();
	},
	//取消事件
	_cancelEvent() {
		console.log('你点击了取消');
		this.dialog = this.selectComponent('#dialog')
		this.dialog.hideDialog();
	},
	//确认事件
	_confirmEvent() {
		console.log('你点击了确定');
		this.dialog = this.selectComponent('#dialog')
		this.dialog.hideDialog();
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