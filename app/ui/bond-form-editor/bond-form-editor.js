
var dateTimePicker = require('../../util/date-time-picker/date-time-picker')

const selectConfig = require('./select-config/select-config')

Component({
	properties: {
		editorFlag: { // 是否是编辑债券的入口
			type: Boolean,
			value: false
		},

	},

	data: {
		formData: {
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
		// 时间
		dateTimeArray: dateTimePicker.dateTimePicker(2000, 2050).dateTimeArray,
		dateTime: dateTimePicker.dateTimePicker(2000, 2050).dateTime,

		// 上市地点 多选框
		listingSpotItems: selectConfig.listingSpot.items, 
		listingSpotValue: '',

		// 企业性质
		enterpriseNature: selectConfig.enterpriseNature.items, 
		enterpriseIndex: -1,

		// 债券品种
		bondType: selectConfig.bondType.items,
		bondTypeValue: '',

		// 发行方式
		issuanceMethodItem: selectConfig.issuanceMethod.items,
		issuanceMethodIndex: -1,

		//  利率方式
		rateWayArray: selectConfig.rateWay.items,
		rateWayIndex: -1,
		rateReply: false,

		// 特殊条款
		specificItems: selectConfig.specificClause.items,
		specificitemsValue: ''
	},

	methods: {

		simpleNameChange: function (e) {
			let formData = this.data.formData
			formData.bond_simple_name = e.detail.value

			console.log(formData.bond_simple_name)

			this.setData({
				formData: formData
			})
			this.triggerEvent('changeValueEvent', formData)
		},

		changeValue (e) { // 改变各input的value
			let formData = this.data.formData
			formData[e.currentTarget.dataset.inputName] = e.detail.value
			this.setData({
				formData: formData
			})
			this.triggerEvent('changeValueEvent', formData)
		},

		// picker,年月日 + 时分
		changeDateTime (e) {
			let formData = this.data.formData
			formData[e.currentTarget.dataset.inputName] = this.data.dateTimeArray[0][e.detail.value[0]] +'-'+ this.data.dateTimeArray[1][e.detail.value[1]] +'-'+ this.data.dateTimeArray[2][e.detail.value[2]] +' '+ this.data.dateTimeArray[3][e.detail.value[3]] +':'+ this.data.dateTimeArray[4][e.detail.value[4]]
			this.setData({
				dateTime: e.detail.value
			});
			this.triggerEvent('changeValueEvent', formData)
			// console.log(this.data.formData.closingTime)
		},

		// 上市地点
		changeListingspot: function (e) {
			let formData = this.data.formData
			formData[e.currentTarget.dataset.listingSpot] = this.saveCheckedValue(e.detail.value, this.data.listingSpotItems).checkedParams.join('|')
			this.setData({
				listingSpotValue: this.saveCheckedValue(e.detail.value, this.data.listingSpotItems).checkedItem.join('、'),
				formData: formData
			})
			this.triggerEvent('changeValueEvent', formData)
		},

		// 企业性质
		changeEnterpriseNature: function (e) {
			// console.log('---enterpriseNature: ', this.data.enterpriseNature[e.detail.value])
			let formData = this.data.formData
			formData[e.currentTarget.dataset.enterpriseNature] = Number(e.detail.value) + 1
			this.setData({
				enterpriseIndex: e.detail.value
			})
			this.triggerEvent('changeValueEvent', formData)
		},

		// 债券品种
		changeBondType: function (e) {
			let formData = this.data.formData
			formData[e.currentTarget.dataset.bondType] = this.saveCheckedValue(e.detail.value, this.data.bondType).checkedParams.join('|')
			this.setData({
				bondTypeValue: this.saveCheckedValue(e.detail.value, this.data.bondType).checkedItem.join('、'),
				formData: formData
			})
			this.triggerEvent('changeValueEvent', formData)
		},

		// 发行方式
		changeIssuancemethod: function (e) {
			let formData = this.data.formData
			formData[e.currentTarget.dataset.issuanceMethod] = Number(e.detail.value) + 1
			this.setData({
				issuanceMethodIndex: e.detail.value,
				formData: formData
			})
			this.triggerEvent('changeValueEvent', formData)
		},

		// 利率方式
		handleDropdownRateWay: function (e) {
			console.log('----checked: ', this.data.rateWayArray[e.detail.value])
			// wx.showToast({
			// 	title: 'this is blank。。。',
			// 	icon: 'success',
			// 	duration: 800
			// })
			if (e.detail.value == 2) {
				this.setData({ rateReply: true })
			} else {
				this.setData({ rateReply: false })
			}
			let formData = this.data.formData
			formData[e.currentTarget.dataset.rateMethod] = Number(e.detail.value) + 1
			this.setData({
				rateWayIndex: e.detail.value,
				formData: formData
			})
			this.triggerEvent('changeValueEvent', formData)
		},

		// 特殊条款
		changeSpecificItems: function (e) {
			let formData = this.data.formData
			formData[e.currentTarget.dataset.specificItems] = this.saveCheckedValue(e.detail.value, this.data.specificItems).checkedParams.join('|')
			this.setData({
				specificitemsValue: this.saveCheckedValue(e.detail.value, this.data.specificItems).checkedItem.join('、'),
				formData: formData
			})
			this.triggerEvent('changeValueEvent', formData)
		},

		saveCheckedValue: function (targetValue, dataArray) {
			let checkedItem = []
			let checkedParams = []
			targetValue.forEach((item, index) => {
				checkedItem.push(dataArray.find((items) => { return items.name === item}).value)
				checkedParams.push(item)
			})

			return {
				checkedItem: checkedItem,
				checkedParams: checkedParams
			}
		},
	}
})