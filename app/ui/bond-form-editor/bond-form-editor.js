
var dateTimePicker = require('../../util/date-time-picker/date-time-picker')

const selectConfig = require('./select-config/select-config')
const converson = require('../../util/converson/converson')

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

		// 上市地点 多选
		listingOpenFlag: false,
		listingSpotItems: selectConfig.listingSpot.items,
		// listingSelectFlag: converson.parseToObject(converson.saveValueOfArray(selectConfig.listingSpot.items)),
		listingSelectFlag: converson.parseToObject([]),

		// 企业性质
		enterpriseNature: selectConfig.enterpriseNature.items,
		enterpriseIndex: -1,

		// 债券品种
		bondTypeOpenFlag: false,
		bondTypeItems: selectConfig.bondType.items,
		bondTypeSelectFlag: converson.parseToObject([]),

		// 发行方式
		issuanceMethodItem: selectConfig.issuanceMethod.items,
		issuanceMethodIndex: -1,

		//  利率方式
		rateWayArray: selectConfig.rateWay.items,
		rateWayIndex: -1,
		rateReply: false,

		// 特殊条款
		specificOpenFlag: false,
		specificItems: selectConfig.specificClause.items,
		specificSelectFlag: converson.parseToObject([]),
	},

	methods: {
		simpleNameChange: function (e) {
			let formData = this.data.formData
			formData.bond_simple_name = e.detail.value

			this.setData({
				formData: formData
			})
			this.triggerEvent('changeValueEvent', formData)
		},

		changeValue (e) { // 改变各input的value
			let formData = this.data.formData

			if (e.currentTarget.dataset.inputName === 'left_benefit') { // 参考收益 左值
				let val = e.detail.value
				this.benifitValueChange(val, 'left_benefit')
			} else if (e.currentTarget.dataset.inputName === 'right_benefit') { // 参考收益 右值
				let val = e.detail.value
				this.benifitValueChange(val, 'right_benefit')
			} else if (e.currentTarget.dataset.inputName === 'subject_rating' || e.currentTarget.dataset.inputName === 'facility_rating') { // 主债评级
				let val = e.detail.value
				let reg = /^[a-zA-Z]{1,3}[+-]?$/
				if (reg.test(val)) {
					formData[e.currentTarget.dataset.inputName] = val
				}
			}
			// else if (e.currentTarget.dataset.inputName === 'deadline') { // 发行期限
			// 	let val = e.detail.value
			// 	let reg = /(^[1-9]{1}[0-9]{0,4}([.]+[0-9]{1,2})?)([dymDYM]{1}$)|([dymDYM]{1}[+]{1}[a-zA-Z]$)|([dymDYM]{1}[+]{1}[1-9]{1}[0-9]{0,4}([.]+[0-9]{1,2})?[dymDYM]{1}$)/
			// 	if (reg.test(val)) {
			// 		formData[e.currentTarget.dataset.inputName] = val
			// 	}
			// }
			else {
				formData[e.currentTarget.dataset.inputName] = e.detail.value
			}

			this.setData({
				formData: formData
			})

			console.log(this.data.formData)
			this.triggerEvent('changeValueEvent', formData)
		},

		benifitValueChange: function(val, currentDataSet) {
			let formData = this.data.formData
			let reg = /^\d{0,2}(\.\d{0,4})?$/g
			if (reg.test(val)) {
				if (val !== '' && val.substring(0, 1) === '.') {
					val = ''
					formData[currentDataSet] = ''
				}

			 	return	formData[currentDataSet] = val
			}
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
		handleListingSelect: function () {
			this.setData({
				listingOpenFlag: !this.data.listingOpenFlag
			})
		},
		inverseChange: function (e) {
			let formData = this.data.formData
			let falg = this.data.listingSelectFlag
			falg[e.currentTarget.dataset.name] = !falg[e.currentTarget.dataset.name]

			formData[e.currentTarget.dataset.listingSpot] = converson.parseToArray(falg).join('|')
			this.setData({
				listingSelectFlag: falg,
				formData: formData
			})
			// console.log(this.data.listingSelectFlag)
			// console.log(this.data.formData)
		},

		// 企业性质
		changeEnterpriseNature: function (e) {
			let formData = this.data.formData
			formData[e.currentTarget.dataset.enterpriseNature] = Number(e.detail.value) + 1
			this.setData({
				enterpriseIndex: e.detail.value
			})
			this.triggerEvent('changeValueEvent', formData)
		},

		// 债券品种
		handleOpenBondType: function () {
			this.setData({
				bondTypeOpenFlag: !this.data.bondTypeOpenFlag
			})
		},
		bondTypeChange: function (e) {
			let formData = this.data.formData
			let falg = this.data.bondTypeSelectFlag
			falg[e.currentTarget.dataset.name] = !falg[e.currentTarget.dataset.name]

			formData[e.currentTarget.dataset.bondType] = converson.parseToArray(falg).join('|')
			this.setData({
				bondTypeSelectFlag: falg,
				formData: formData
			})
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
		handleOpenSpecific: function () {
			this.setData({
				specificOpenFlag: !this.data.specificOpenFlag
			})
		},
		specificChange: function (e) {
			let formData = this.data.formData
			let falg = this.data.specificSelectFlag
			falg[e.currentTarget.dataset.name] = !falg[e.currentTarget.dataset.name]

			formData[e.currentTarget.dataset.specificItems] = converson.parseToArray(falg).join('|')
			this.setData({
				specificSelectFlag: falg,
				formData: formData
			})
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